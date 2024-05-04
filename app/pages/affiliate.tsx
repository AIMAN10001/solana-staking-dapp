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
import { MdOutlineDoneAll } from "react-icons/md";
import { IoCopyOutline } from "react-icons/io5";
import { BiSolidPurchaseTagAlt } from "react-icons/bi";
import { FaPiggyBank } from "react-icons/fa";
import { FaVolleyballBall } from "react-icons/fa";
import { FaExclamationTriangle } from "react-icons/fa";
import { IoDiamondSharp } from "react-icons/io5";
import { FaMedium } from "react-icons/fa6";

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
            <img src="img/2.png" alt="logo"></img>
          </div>
          <div className={styles.logotext}>
            <img src="img/3.png" alt="logo"></img>
          </div>
          {/* <div className={styles.close} id="close-btn">
            <AiOutlineClose className={styles.closeIcon} />
          </div> */}
        </div>

        <div className={styles.sidebar}>
          <a href="/dashboard">
            <TbLayoutDashboard className={styles.icon} />
            <h2>Dashboard</h2>
          </a>
          <a href="/">
            <FaStackExchange className={styles.icon} />
            <h2>Stake</h2>
          </a>

          <a href="/affiliate" className={styles.active}>
            <AiFillNotification className={styles.icon} />
            <h2>Affiliate</h2>
          </a>
          <a href="#">
            <FaBookReader className={styles.icon} />
            <h2>Documents</h2>
          </a>
        </div>
        <div className={styles.footer_social}>
          <a href="https://bit.ly/4dfkHSD?r=Ip">
            <FaXTwitter />
          </a>
          <a href="https://bit.ly/4b9xBQ0?r=Ip">
            <FaMedium />
          </a>
          <a href="https://t.me/SyncusSolCommunity">
            <FaTelegramPlane />
          </a>
        </div>
      </aside>
      {/* ------------------END OF ASIDE------------------- */}

      <main>
        <section className={styles.topitem}>
          <h1>Affiliate</h1>
          <div className={styles.buttons}>
            <button
              className={styles.buyButton}
              // onClick={() =>
              //   window.open(
              //     "https://app.uniswap.org/swap/?outputCurrency=0xa41d2f8Ee4F47D3B860A149765A7dF8c3287b7F0",
              //     "_blank"
              //   )
              // }
            >
              <MdToken className={styles.icon5} /> BUY $SYNCS
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

      <section className={styles.bigSectionc}>
        {/* First Section */}
        <div className={styles.chead}>
          <div className={styles.ctext}>
            <h4>Statistics</h4>
          </div>
          <div className={styles.ctext}>
            <FaExclamationTriangle className={styles.iconc} />
            <span>How it works?</span>
          </div>
        </div>
        <div className={styles.sectionc}>
          <div className={styles.sectionc2}>
            <div className={styles.stakingIcon}>
              <FaVolleyballBall className={styles.icon2} />
            </div>
            <div className={styles.stakedAmountc}>
              <h6>All Reference</h6>
              <div className={styles.amountBoxc}>
                <span>0</span>
              </div>
            </div>
          </div>

          <div className={styles.sectionc3}>
            <div className={styles.stakingIcon}>
              <BiSolidPurchaseTagAlt className={styles.icon2} />
            </div>
            <div className={styles.stakedAmountc}>
              <h6>Total Purchased</h6>
              <div className={styles.amountBoxc}>
                <span>$0</span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.sectioncb}>
          <div className={styles.sectioncb3}>
            <div className={styles.stakingIcon}>
              <FaPiggyBank className={styles.icon2} />
            </div>
            <div className={styles.stakedAmountc}>
              <h6>Available Earnings</h6>
              <div className={styles.amountBoxc}>
                <span>$0</span>
              </div>
            </div>
            <div className={styles.amountBoxc1}>
              <span>Claim Earnings</span>
            </div>
          </div>
        </div>

        <div className={styles.sectionc22}>
          {/* Second Section */}
          <section className={styles.sectioncc2}>
            <div className={styles.headercc}>
              <h5>Referral Settings</h5>
            </div>
            <div className={styles.content2}>
              <div className={styles.contentcc2}>
                <span>Your Referral Code</span>
              </div>
              <div className={styles.placeholderContainerc}>
                <input
                  type="text"
                  className={styles.placeholderc}
                  placeholder="Enter a code"
                />
                <MdOutlineDoneAll className={styles.iconc2} />
              </div>
            </div>
            <div className={styles.content2}>
              <div className={styles.contentcc2}>
                <span>Affiliate Link</span>
              </div>
              <div className={styles.placeholderContainerc}>
                <input
                  type="text"
                  className={styles.placeholderc2}
                  placeholder="https://syncussol/stake"
                />
                <IoCopyOutline className={styles.iconc2} />
              </div>
            </div>
          </section>

          {/* Third Section */}
          <div className={styles.sectioncc3}>
            <div className={styles.sectioncc21}>
              <div className={styles.stakingIcon}>
                <IoDiamondSharp className={styles.iconcc2} />
              </div>
              <div className={styles.stakedAmountcc2}>
                <h6>Tier 1</h6>
                <div className={styles.amountBoxcc2}>
                  <span>9% Commision</span>
                </div>
              </div>
            </div>
            {/* Second Section */}
            <div className={styles.balanceSectionBC2}>
              <div className={styles.contentccA}>
                <div className={styles.rowcc}>
                  <p>Active refferels to claim</p>
                  <span>0/1</span>
                </div>
                <div className={styles.rowcc2}>
                  <p>Total Purchased</p>
                  <span>0%</span>
                </div>
              </div>
            </div>
            <div className={styles.balanceSectionBC}>
              <div className={styles.contentccAC}>
                <div className={styles.rowcc22}>
                  <div className={styles.A}>
                    <IoDiamondSharp className={styles.Aicon} />
                    <p>Tier 1</p>
                  </div>
                  <div>
                    <span>$0/$1000</span>
                  </div>
                </div>
                <div className={styles.rowccc2}></div>
                <button className={styles.tiersButton}>View Tiers</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
