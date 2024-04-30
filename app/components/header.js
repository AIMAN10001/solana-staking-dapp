import { useState } from "react";
import styles from "../styles/Home.module.css";

export default function Header() {
  const [isConnected, setIsConnected] = useState(false);

  const handleConnectDisconnect = () => {
    setIsConnected((prevIsConnected) => !prevIsConnected);
  };

  return (
    <header className={styles.header}>
      <section className={styles.header_logoSection}>
        <h1>Stake</h1>
      </section>
      <section className={styles.header_nav}>
        <button className={styles.buyButton}>
          <a
            href="https://app.uniswap.org/swap/?outputCurrency=0xa41d2f8Ee4F47D3B860A149765A7dF8c3287b7F0"
            target="_blank"
            rel="noopener noreferrer"
          >
            Buy SINC on Uniswap
          </a>
        </button>
        <button
          className={styles.walletButton}
          onClick={handleConnectDisconnect}
        >
          {isConnected ? "Disconnect Wallet" : "Connect Wallet"}
        </button>
      </section>
      <hr className={styles.header_line} />
    </header>
  );
}
