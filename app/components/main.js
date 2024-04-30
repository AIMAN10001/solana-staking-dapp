import styles from "../styles/Home.module.css";
// import backgroundImage from "../img/bg.png";

import Staking from "./staking.js";
import StakingData from "./stakingData.js";

export default function Main() {
  return (
    <section className={styles.container}>
      <Staking />
      <StakingData />
    </section>
  );
}
