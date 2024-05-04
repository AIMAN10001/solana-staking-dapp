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
import { FaCircleDollarToSlot } from "react-icons/fa6";
import { SiMarketo } from "react-icons/si";
import { FaCloudsmith } from "react-icons/fa";
import { FaPiggyBank } from "react-icons/fa";
import { SiCrowdsource } from "react-icons/si";

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
          </div>
          <div className={styles.logotext}>
            <img src="img/logo.png" alt="logo"></img>
          </div>
          {/* <div className={styles.close} id="close-btn">
            <AiOutlineClose className={styles.closeIcon} />
          </div> */}
        </div>

        <div className={styles.sidebar}>
          <a href="/dashboard" className={styles.active}>
            <TbLayoutDashboard className={styles.icon} />
            <h2>Dashboard</h2>
          </a>
          <a href="/">
            <FaStackExchange className={styles.icon} />
            <h2>Stake</h2>
          </a>

          <a href="/affiliate">
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
          <h1>Dashboard</h1>
          <div className={styles.buttons}>
            <button
              className={styles.buyButton}
              //   onClick={() =>
              //     window.open(
              //       "https://app.uniswap.org/swap/?outputCurrency=0xa41d2f8Ee4F47D3B860A149765A7dF8c3287b7F0",
              //       "_blank"
              //     )
              //   }
            >
              <MdToken className={styles.icon5} /> BUY $SYNC
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

      <section className={styles.bigSectiond}>
        {/* First Section */}

        <div className={styles.sectiond}>
          <div className={styles.sectiond1}>
            <div className={styles.stakingIcon}>
              <FaCircleDollarToSlot className={styles.icon2} />
            </div>
            <div className={styles.stakedAmount}>
              <h6>SYNC Price</h6>
              <div className={styles.amountBox}>
                <span>$1000</span>
              </div>
            </div>
          </div>
          <div className={styles.sectiond2}>
            <div className={styles.stakingIcon}>
              <SiMarketo className={styles.icon2} />
            </div>
            <div className={styles.stakedAmount}>
              <h6>Market Cap</h6>
              <div className={styles.amountBox}>
                <span>$1000</span>
              </div>
            </div>
          </div>

          <div className={styles.sectiond3}>
            <div className={styles.stakingIcon}>
              <SiHiveBlockchain className={styles.icon2} />
            </div>
            <div className={styles.stakedAmount}>
              <h6>Staked SYNC</h6>
              <div className={styles.amountBox}>
                <span>$1000</span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.sectiondb}>
          <div className={styles.sectiond1}>
            <div className={styles.stakingIcon}>
              <FaCloudsmith className={styles.icon2} />
            </div>
            <div className={styles.stakedAmount}>
              <h6>APY</h6>
              <div className={styles.amountBox}>
                <span>$1000</span>
              </div>
            </div>
          </div>
          <div className={styles.sectiond2}>
            <div className={styles.stakingIcon}>
              <FaPiggyBank className={styles.icon2} />
            </div>
            <div className={styles.stakedAmount}>
              <h6>Treasury Balance</h6>
              <div className={styles.amountBox}>
                <span>$1000</span>
              </div>
            </div>
          </div>

          <div className={styles.sectiond3}>
            <div className={styles.stakingIcon}>
              <SiCrowdsource className={styles.icon2} />
            </div>
            <div className={styles.stakedAmount}>
              <h6>Daily Revenue</h6>
              <div className={styles.amountBox}>
                <span>$1000</span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.section22d}>
          {/* Second Section */}
          <section className={styles.section2d}>
            <div className={styles.sectiondd3}>
              <div className={styles.stakedAmountd}>
                <h6>Revenue (7 days)</h6>
                <div className={styles.amountBoxd}>
                  <span></span>
                </div>
              </div>
            </div>
          </section>

          {/* Third Section */}
          <div className={styles.section3d}>
            <div className={styles.sectiondd3}>
              <div className={styles.stakedAmountd}>
                <h6>Market Value of Treasury Assets</h6>
                <div className={styles.amountBoxd}>
                  <span></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
