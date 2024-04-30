use anchor_lang::prelude::*;
use anchor_lang::solana_program::system_program;
use anchor_spl::token::{self, Mint, TokenAccount, Transfer};
use solana_program::entrypoint::ProgramResult;

declare_id!("BbFNLYE2m9T6mxwmUQvmbraa5RjjUqETgXEjHwAkEkMV");

#[program]
mod staking {
    use super::*;

    #[error]
    pub enum ErrorCode {
        #[msg("Invalid amount")]
        InvalidAmount,
        #[msg("Insufficient balance")]
        InsufficientBalance,
    }

    #[event]
    pub struct RewardsDistributed {
        pub total_rewards: u64,
    }

    #[derive(Accounts)]
    pub struct Initialize<'info> {
        #[account(signer)]
        pub authority: AccountInfo<'info>,
        #[account(mut)]
        pub treasury: Account<'info, TokenAccount>,
        #[account(mut)]
        pub token_mint: Account<'info, Mint>,
        #[account(init, payer = authority, space = 256)]
        pub staking_account: Account<'info, StakingAccount>,
        #[account(mut, "&token_account.owner == authority.key")]
        pub token_account: Account<'info, TokenAccount>,
        #[account(mut)]
        pub system_program: AccountInfo<'info>,
    }

    #[account]
    pub struct StakingAccount {
        pub authority: Pubkey,
        pub treasury: Pubkey,
        pub token_mint: Pubkey,
        pub token_contract: Pubkey,
        pub total_staked: u64,
        pub total_rewards: u64,
        pub last_reward_distribution: i64,
        pub last_rewards_amount: u64,
        pub next_reward_amount: u64,
        pub next_yield_amount: u64,
        pub roi_7_day_rate: f64,
        pub referrer: Option<Pubkey>,
        pub cap_apy: u64,
        pub referral_code: Option<String>,
    }

    #[derive(Accounts)]
    pub struct Stake<'info> {
        #[account(signer)]
        pub authority: AccountInfo<'info>,
        #[account(mut)]
        pub staking_account: Account<'info, StakingAccount>,
        #[account(mut, "&staking_account.treasury == treasury.key")]
        pub treasury: Account<'info, TokenAccount>,
        #[account(mut, "&staking_account.token_mint == token_mint.key")]
        pub token_mint: Account<'info, Mint>,
        #[account(mut)]
        pub staker_token_account: Account<'info, TokenAccount>,
        #[account(mut)]
        pub system_program: AccountInfo<'info>,
        #[account(mut)]
        pub token_program: AccountInfo<'info>,
    }

    #[derive(Accounts)]
    pub struct Withdraw<'info> {
        #[account(signer)]
        pub authority: AccountInfo<'info>,
        #[account(mut)]
        pub staking_account: Account<'info, StakingAccount>,
        #[account(mut, "&staking_account.treasury == treasury.key")]
        pub treasury: Account<'info, TokenAccount>,
        #[account(mut, "&staking_account.token_mint == token_mint.key")]
        pub token_mint: Account<'info, Mint>,
        #[account(mut)]
        pub staker_token_account: Account<'info, TokenAccount>,
        #[account(mut)]
        pub system_program: AccountInfo<'info>,
        #[account(mut)]
        pub token_program: AccountInfo<'info>,
    }

    #[derive(Accounts)]
    pub struct DistributeRewards<'info> {
        #[account(signer)]
        pub authority: AccountInfo<'info>,
        #[account(mut)]
        pub staking_account: Account<'info, StakingAccount>,
        #[account(mut, "&staking_account.treasury == treasury.key")]
        pub treasury: Account<'info, TokenAccount>,
        #[account(mut, "&staking_account.token_mint == token_mint.key")]
        pub token_mint: Account<'info, Mint>,
        #[account(mut)]
        pub token_program: AccountInfo<'info>,
    }

    #[derive(Accounts)]
    pub struct UpdateRewardParams<'info> {
        #[account(signer)]
        pub authority: AccountInfo<'info>,
        #[account(mut)]
        pub staking_account: Account<'info, StakingAccount>,
    }

    impl<'info> Initialize<'info> {
        pub fn initialize(&mut self, total_supply: u64, decimals: u8) -> ProgramResult {
            // Transfer initial token supply to treasury.
            token::mint_to(
                self.accounts.token_program.clone(),
                self.accounts.system_program.clone(),
                self.accounts.staking_account.to_account_info().clone(),
                self.accounts.treasury.clone(),
                &[],
                total_supply,
                decimals,
            )?;

            // Initialize staking account.
            self.accounts.staking_account.authority = *self.accounts.authority.key;
            self.accounts.staking_account.treasury = *self.accounts.treasury.key;
            self.accounts.staking_account.token_mint = *self.accounts.token_mint.key;
            self.accounts.staking_account.token_contract = *self.accounts.token_account.key;
            self.accounts.staking_account.total_staked = 0;
            self.accounts.staking_account.total_rewards = 0;
            self.accounts.staking_account.last_reward_distribution = 0;
            self.accounts.staking_account.last_rewards_amount = 0;
            self.accounts.staking_account.next_reward_amount = 0;
            self.accounts.staking_account.next_yield_amount = 0;
            self.accounts.staking_account.roi_7_day_rate = 0.0;
            self.accounts.staking_account.referrer = None;
            self.accounts.staking_account.cap_apy = 100;
            self.accounts.staking_account.referral_code = None;

            Ok(())
        }
    }

    impl<'info> Stake<'info> {
        pub fn stake(&mut self, amount: u64, referral_code: Option<String>) -> ProgramResult {
            // Validate amount
            if amount == 0 {
                return Err(ErrorCode::InvalidAmount.into());
            }

            // Check user balance
            let staker_token_balance = self.staker_token_account.amount;
            if staker_token_balance < amount {
                return Err(ErrorCode::InsufficientBalance.into());
            }

            let transfer_amount = (amount as f64 * 0.95) as u64;

            // Apply referral rebate if a valid referral code is provided
            if let Some(code) = &referral_code {
                if let Some(stored_code) = &self.staking_account.referral_code {
                    if code == stored_code {
                        let rebate_amount = (transfer_amount as f64 * 0.15) as u64;
                        self.staking_account.total_rewards += rebate_amount;
                    }
                }
            }

            // Transfer tokens from staker's account to staking account.
            token::transfer(
                self.accounts.token_program.clone(),
                self.accounts.staker_token_account.to_account_info().clone(),
                self.accounts.staking_account.to_account_info().clone(),
                self.accounts.authority.clone(),
                &[],
                transfer_amount,
            )?;

            // Update staking account state.
            self.staking_account.total_staked += transfer_amount;

            Ok(())
        }
    }

    impl<'info> Withdraw<'info> {
        pub fn withdraw(&mut self, amount: u64) -> ProgramResult {
            // Validate amount
            if amount == 0 {
                return Err(ErrorCode::InvalidAmount.into());
            }

            let transfer_amount = (amount as f64 * 0.95) as u64;

            // Transfer tokens from staking account to staker's account.
            token::transfer(
                self.accounts.token_program.clone(),
                self.accounts.staking_account.to_account_info().clone(),
                self.accounts.treasury.clone(),
                self.accounts.authority.clone(),
                &[],
                transfer_amount,
            )?;

            // Update staking account state.
            self.staking_account.total_staked -= transfer_amount;

            Ok(())
        }
    }

    impl<'info> DistributeRewards<'info> {
        pub fn distribute_rewards(&mut self) -> ProgramResult {
            let total_rewards_available = self.staking_account.total_rewards;
            let stakers = self.get_stakers()?;
            let total_staked = self.staking_account.total_staked;

            // Calculate rewards distribution for each staker and distribute
            for staker in stakers.iter() {
                let staker_account = TokenAccount::load(&staker, self.accounts.token_program.clone())?;
                let staker_staked_amount = staker_account.amount;
                let staker_rewards = (staker_staked_amount as f64 / total_staked as f64 * total_rewards_available as f64) as u64;

                // Transfer rewards to staker
                token::transfer(
                    self.accounts.token_program.clone(),
                    self.accounts.treasury.clone(),
                    staker.clone(),
                    self.accounts.authority.clone(),
                    &[],
                    staker_rewards,
                )?;
            }

            // Reset total rewards
            self.staking_account.total_rewards = 0;

            // Emit event
            emit!(RewardsDistributed {
                total_rewards: total_rewards_available,
            });

            Ok(())
        }

        fn get_stakers(&self) -> ProgramResult<Vec<Pubkey>> {
            let staker_accounts = StakingAccount::find(
                self.staking_account.treasury,
                self.accounts.token_program.clone(),
            )?;
            Ok(staker_accounts)
        }
    }

    impl<'info> UpdateRewardParams<'info> {
        pub fn update_reward_params(&mut self, next_reward_amount: u64, next_yield_amount: u64, roi_7_day_rate: f64) -> ProgramResult {
            self.staking_account.next_reward_amount = next_reward_amount;
            self.staking_account.next_yield_amount = next_yield_amount;
            self.staking_account.roi_7_day_rate = roi_7_day_rate;

            Ok(())
        }
    }
}
