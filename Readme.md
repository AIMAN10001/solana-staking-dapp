![logo](https://github.com/AIMAN10001/AIMAN10001/blob/main/Firefox_Screenshot_2024-04-30T09-20-33.714Z.png).

# Solana Token Staking DApp

## Overview

The Solana Token Staking DApp is a decentralized application (DApp) built on the Solana blockchain. It allows $SYNCS token holders to stake their tokens and earn rewards through a staking mechanism. This README provides an overview of the project, including its features, setup instructions, and usage guidelines.

## Features

- **Staking Platform**: Users can connect their wallets and stake $SYNCS tokens.
- **Integration with Token Contract**: The DApp integrates with the client's existing $SYNCS token contract.
- **Transfer Fee Mechanism**: A 5% transfer fee is applied to staking and unstaking transactions, with fees collected in a treasury wallet.
- **Reward Distribution**: Rewards are distributed weekly to stakers.
- **Referral System**: Users can benefit from a 15% rebate through a referral program.
- **APY Cap**: The APY is capped at 100% to ensure sustainable growth.
- **Frontend**: A user-friendly interface displays staking information and allows for easy interaction.
- **Error Handling and Logging**: Proper error handling, input validation, and event logging ensure the reliability and security of the DApp.

## Technologies Used

- Rust
- Anchor
- Solana CLI
- Alchemy RPC URL for building and deploying
- Solana Playground for initial testing and development

## Setup Instructions

1. Clone the repository to your local machine.
2. Install Rust and Solana CLI if not already installed.
3. Run `anchor build` to build the project.
4. Deploy the smart contract using Solana CLI.
5. Set up the frontend by installing necessary dependencies and configuring the connection to the deployed smart contract.
6. Launch the frontend application.

## Usage

1. Connect your wallet to the DApp.
2. Stake $SYNCS tokens using the provided interface.
3. Monitor staking performance and rewards earned.
4. Refer others to the platform to earn additional rewards.
5. Withdraw staked tokens and rewards as needed.

## License

This project is licensed under the [MIT License](LICENSE).

## References

- [Solana Documentation](https://docs.solana.com/)
- [Anchor Documentation](https://project-serum.github.io/anchor/)
- [Rust Programming Language](https://www.rust-lang.org/)
- [Solana Labs](https://solana.com/)
