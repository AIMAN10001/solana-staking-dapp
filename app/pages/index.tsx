import { useState } from "react";
import { Keypair } from "@solana/web3.js";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import useIsMounted from "./api/utils/useIsMounted";
import createMessage from "./api/createMessage";
import updateMessage from "./api/updateMessage";
import { AiOutlineClose } from "react-icons/ai";
import { TbLayoutDashboard } from "react-icons/tb";
import { FaStackExchange } from "react-icons/fa";
import { FaHandHoldingDollar } from "react-icons/fa6";
import { AiFillNotification } from "react-icons/ai";
import { FaBookReader } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaRedditAlien } from "react-icons/fa";
import { FaDiscord } from "react-icons/fa6";
import { FaTelegramPlane } from "react-icons/fa";
import { MdToken } from "react-icons/md";
import { MdAccountBalanceWallet } from "react-icons/md";
import { SiHiveBlockchain } from "react-icons/si";

import styles from "../styles/Home.module.css";

export default function Home() {
  const [messageAccount, _] = useState(Keypair.generate());
  const [message, setMessage] = useState("");
  const [messageAuthor, setMessageAuthor] = useState("");
  const [messageTime, setMessageTime] = useState(0);
  const [inputtedMessage, setInputtedMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  const [previousAction, setPreviousAction] = useState(null);

  const handleStakeButtonClick = () => {
    setPreviousAction("stake");
    // Add logic for stake action
  };

  const handleUnstakeButtonClick = () => {
    setPreviousAction("unstake");
    // Add logic for unstake action
  };

  const wallet = useAnchorWallet();
  const mounted = useIsMounted();

  const handleConnectDisconnect = () => {
    setIsConnected((prevIsConnected) => !prevIsConnected);
  };

  return (
    // <div className={styles.container}>
    //   <div className={styles.navbar}>{mounted && <WalletMultiButton />}</div>
    // </div>
    <div className={styles.container}>
      <aside>
        <div className={styles.top}>
          <div className={styles.logo}>
            <img src="img/logio.png" alt="logo"></img>
            <h1>Syncus</h1>
          </div>
          <div className={styles.close} id="close-btn">
            <AiOutlineClose className={styles.closeIcon} />
          </div>
        </div>

        <div className={styles.sidebar}>
          <a href="#">
            <TbLayoutDashboard className={styles.icon} />
            <h2>Dashboard</h2>
          </a>
          <a href="#" className={styles.active}>
            <FaStackExchange className={styles.icon} />
            <h2>Stake</h2>
          </a>
          <a href="#">
            <FaHandHoldingDollar className={styles.icon} />
            <h2>Lending</h2>
          </a>
          <a href="#">
            <AiFillNotification className={styles.icon} />
            <h2>Affiliate</h2>
          </a>
          <a href="#">
            <FaBookReader className={styles.icon} />
            <h2>Documents</h2>
          </a>
        </div>
        <div className={styles.footer_social}>
          <a href="#">
            <FaXTwitter />
          </a>
          <a href="#">
            <FaRedditAlien />
          </a>
          <a href="#">
            <FaDiscord />
          </a>
          <a href="#">
            <FaTelegramPlane />
          </a>
        </div>
      </aside>
      {/* ------------------END OF ASIDE------------------- */}

      <main>
        <section className={styles.topitem}>
          <h1>Stake</h1>
          <div className={styles.buttons}>
            <button
              className={styles.buyButton}
              onClick={() =>
                window.open(
                  "https://app.uniswap.org/swap/?outputCurrency=0xa41d2f8Ee4F47D3B860A149765A7dF8c3287b7F0",
                  "_blank"
                )
              }
            >
              <MdToken className={styles.icon5} /> Buy SYNC on Uniswap
            </button>
            <button
              className={styles.walletButton}
              onClick={handleConnectDisconnect}
            >
              <MdAccountBalanceWallet className={styles.icon4} />
              <span>{isConnected ? "Disconnect " : "Connect"}</span>
            </button>
          </div>
        </section>
      </main>
      {/* -----------end of heading------------ */}

      <section className={styles.bigSection}>
        {/* First Section */}

        <div className={styles.section1}>
          <div className={styles.stakingIcon}>
            <SiHiveBlockchain className={styles.icon2} />
          </div>
          <div className={styles.stakedAmount}>
            <h6>Total Staked</h6>
            <div className={styles.amountBox}>
              <span>$1000</span>
            </div>
          </div>
        </div>

        <div className={styles.section22}>
          {/* Second Section */}
          <section className={styles.section2}>
            <div className={styles.header}>
              <div className={styles.stakingIcon}>
                <SiHiveBlockchain className={styles.icon3} />
              </div>
              <div className={styles.stakedAmount2}>
                <h4>SYNC Staking</h4>
              </div>
            </div>
            <div className={styles.content2}>
              {/* APY Rate and Current Index Rate */}
              <div className={styles.amountBoxContainer}>
                <div className={styles.amountBox1}>
                  <p>APY</p>
                  <span>100%</span>
                </div>
                <div className={styles.amountBox1}>
                  <p>Current Index Rate</p>
                  <span>1.4873</span>
                </div>
              </div>

              {/* Stake and Unstake buttons */}
              <div className={styles.buttonContainer}>
                <button
                  className={styles.stakeButton}
                  onClick={handleStakeButtonClick}
                >
                  Stake
                </button>
                <button
                  className={styles.unstakeButton}
                  onClick={handleUnstakeButtonClick}
                >
                  Unstake
                </button>
              </div>

              <div className={styles.placeholderContainer}>
                <input
                  type="text"
                  className={styles.placeholder}
                  placeholder="Enter amount"
                />
                <button className={styles.maxButton}>Max</button>
              </div>
              <button className={styles.stakeUnstakeButton}>
                {previousAction === "stake" ? "Unstake" : "Stake SYNC"}
              </button>
            </div>
          </section>

          {/* Third Section */}
          <div className={styles.section3}>
            {/* First Section */}
            <div className={styles.balanceSection}>
              <div className={styles.headerA}>
                <h5>Balance</h5>
              </div>
              <div className={styles.contentA}>
                <div className={styles.row}>
                  <p>Your Balance:</p>
                  {/* Display your balance */}
                  <span>0.00</span>
                </div>
                <div className={styles.row}>
                  <p>Your Staked Balance:</p>
                  <span>0.00</span>
                </div>
              </div>
            </div>

            {/* Second Section */}
            <div className={styles.balanceSectionB}>
              <div className={styles.headerA}>
                <h5>Balance</h5>
              </div>
              <div className={styles.contentA}>
                <div className={styles.row}>
                  <p>Next Reward Amount:</p>
                  <span>$200</span>
                </div>
                <div className={styles.row}>
                  <p>Next Reward Yield:</p>
                  <span>5%</span>
                </div>
              </div>
            </div>

            {/* Third Section */}
            <div className={styles.balanceSectionC}>
              <div className={styles.headerA}>
                <h6>ROI (7-Day Rate)</h6>
              </div>
              <div className={styles.row}>
                <span>1.7534</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
