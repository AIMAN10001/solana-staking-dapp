import { useState } from "react";
import styles from "../styles/Home.module.css";

export default function Staking() {
  const [stakingTab, setStakingTab] = useState(true);
  const [amount, setAmount] = useState(0);

  const switchToStake = () => {
    setStakingTab(true);
  };

  const switchToUnstake = () => {
    setStakingTab(false);
  };

  return (
    <section className={styles.stakingContainer}>
      <section>
        <section className={styles.stakeUnstakeTab}>
          <section
            className={`${stakingTab ? styles.stakingType : ""}`}
            id="stake"
            onClick={switchToStake}
          >
            Stake
          </section>
          <section
            className={`${!stakingTab ? styles.stakingType : ""}`}
            id="unstake"
            onClick={switchToUnstake}
          >
            Unstake
          </section>
        </section>
        <section className={styles.stakingSection}>
          {stakingTab ? (
            <section className={styles.stakingBox}>
              <h2>Stake</h2>
              <input
                className={styles.inputField}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                type="number"
                id="inputField"
                maxLength="120"
                placeholder="Enter Amount"
                required
              />
              <button className={styles.stakeBtn}>STAKE</button>
            </section>
          ) : (
            <section className={styles.stakingBox}>
              <h2>Unstake</h2>
              <input
                className={styles.inputField}
                type="number"
                id="inputField"
                maxLength="120"
                placeholder="Enter Amount"
                required
              />
              <button className={styles.stakeBtn}>UNSTAKE</button>
            </section>
          )}
        </section>
      </section>
      <section>
        <section className={styles.stakingInfoSection}>
          <section className={styles.stakingInfo}>
            <h2>Locked Staking</h2>
            <section className={styles.lockedStaking}>
              <span>Locked 30 days</span>
              <span className={styles.lockedStakingAPY}>8% API</span>
              <input
                className={styles.inputField}
                type="number"
                id="inputField"
                maxLength="120"
                placeholder="Enter Amount"
                required
              />
            </section>
            <section className={styles.lockedStaking}>
              <span>Locked 60 days</span>
              <span className={styles.lockedStakingAPY}>9% API</span>
              <input
                className={styles.inputField}
                type="number"
                id="inputField"
                maxLength="120"
                placeholder="Enter Amount"
                required
              />
            </section>
            <section className={styles.lockedStaking}>
              <span>Locked 90 days</span>
              <span className={styles.lockedStakingAPY}>12% API</span>
              <input
                className={styles.inputField}
                type="number"
                id="inputField"
                maxLength="120"
                placeholder="Enter Amount"
                required
              />
            </section>
          </section>
          <button className={styles.stakeBtn}>STAKE</button>
        </section>
      </section>
    </section>
  );
}
