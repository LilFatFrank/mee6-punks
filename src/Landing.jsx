import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react";
import "./Landing.scss";
import { injectors } from "./wallet/connectors";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "./redux/data/dataActions";
import CONFIG from "./config/config.json";
import { connect } from "./redux/blockchain/blockchainActions";
import { useSnackbar } from "notistack";

const Landing = () => {
  const dispatch = useDispatch();
  const blockchain = useSelector((state) => state.blockchain);
  const data = useSelector((state) => state.data);
  const [claimingNft, setClaimingNft] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [mintAmount, setMintAmount] = useState(1);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    dispatch(connect());
    if (window.ethereum) {
      window.ethereum.on("chainChanged", (val) => {
        window.location.reload();
      });
      window.ethereum.on("accountsChanged", (val) => {
        window.location.reload();
      });
    }
  }, []);

  useEffect(() => {
    if (data.errorMsg) enqueueSnackbar(data.errorMsg);
  }, [data.errorMsg]);

  useEffect(() => {
    if (feedback) setFeedback(feedback);
  }, [feedback]);

  useEffect(() => {
    getData();
  }, [blockchain.account]);

  const getData = () => {
    if (blockchain.account !== "" && blockchain.smartContract !== null) {
      dispatch(fetchData(blockchain.account));
    }
  };

  const gifs = () => {
    const images = [];
    for (let i = 1; i <= 8; i++) {
      images.push(
        <img src="Punk-Gif.gif" alt="punk-gif" width={45} height={45} key={i} />
      );
    }

    return (
      <div
        style={{
          width: "204px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          rowGap: "5px",
          position: "absolute",
          top: "55%",
          right: "18.5%"
        }}
        className={"supply"}
      >
        {images}
      </div>
    );
  };

  const claimNFTs = () => {
    let cost = CONFIG.WEI_COST;
    let gasLimit = CONFIG.GAS_LIMIT;
    let totalCostWei = String(cost * mintAmount);
    let totalGasLimit = String(gasLimit * mintAmount);
    console.log("Cost: ", totalCostWei);
    console.log("Gas limit: ", totalGasLimit);
    setFeedback(`Minting your ${CONFIG.NFT_NAME}...`);
    setClaimingNft(true);
    blockchain.smartContract.methods
      .mint(mintAmount)
      .send({
        gasLimit: String(totalGasLimit),
        to: CONFIG.CONTRACT_ADDRESS,
        from: blockchain.account,
        value: totalCostWei
      })
      .once("error", (err) => {
        console.log(err);
        setFeedback("Sorry, something went wrong please try again later.");
        setClaimingNft(false);
      })
      .then((receipt) => {
        console.log(receipt);
        setFeedback(
          `WOW, the ${CONFIG.NFT_NAME} is yours! go visit Opensea.io to view it.`
        );
        setClaimingNft(false);
        dispatch(fetchData(blockchain.account));
      });
  };

  const decrementMintAmount = () => {
    let newMintAmount = mintAmount - 1;
    if (newMintAmount < 1) {
      newMintAmount = 1;
    }
    setMintAmount(newMintAmount);
  };

  const incrementMintAmount = () => {
    let newMintAmount = mintAmount + 1;
    if (newMintAmount > 10) {
      newMintAmount = 10;
    }
    setMintAmount(newMintAmount);
  };

  return (
    <div className="landing">
      <img src="Landing.png" alt="landing" />
      <span className="punk-1">
        <img src={"Punk-1.png"} alt={"punk-1"} width={80} height={80} />
      </span>
      <span className="punk-2">
        <img src={"Punk-2.png"} alt={"punk-2"} width={80} height={80} />
      </span>
      <span className="punk-3">
        <img src={"Punk-3.png"} alt={"punk-3"} width={80} height={80} />
      </span>
      <a
        href="https://mee6.xyz/nft"
        target={"_blank"}
        rel="noreferrer noopener"
        className="anchor"
      >
        &nbsp;
      </a>
      <div className="icons">
        <a
          href="https://twitter.com/MeePunksNFT"
          target={"_blank"}
          rel={"noreferrer noopener"}
        >
          <img src="Twitter.png" alt="twitter" width={64} height={64} />
        </a>
        <a
          href="https://etherscan.io/address/0xCDaf00ba4C818b998E7bf061a986a37cEBc925a9"
          target={"_blank"}
          rel={"noreferrer noopener"}
        >
          <img src="Etherscan.png" alt="etherscan" width={64} height={64} />
        </a>
        <a
          href="https://discord.gg/9rJPqMnbBm"
          target={"_blank"}
          rel={"noreferrer noopener"}
        >
          <img src="Discord.png" alt="discord" width={64} height={64} />
        </a>
        <a
          href="https://opensea.io/collection/meepunksnft"
          target={"_blank"}
          rel={"noreferrer noopener"}
        >
          <img src="Opensea.png" alt="opensea" width={64} height={64} />
        </a>
      </div>
      <>
        <span
          style={{
            position: "absolute",
            color: "#70C0ED",
            right: "29%",
            top: "36.8%"
          }}
          className={"supply"}
        >
          {!blockchain?.account || blockchain?.account === null
            ? CONFIG?.MAX_SUPPLY
            : data.totalSupply}
        </span>
        {!blockchain?.account || blockchain?.account === null ? (
          gifs()
        ) : (
          <div className="mint-details">
            <div className="count">
              <img
                src="Down.png"
                alt="down"
                width={24}
                height={24}
                onClick={decrementMintAmount}
              />
              <div>{mintAmount}</div>
              <img
                src="Up.png"
                alt="up"
                width={24}
                height={24}
                onClick={incrementMintAmount}
              />
            </div>
            <div style={{ position: "relative", left: "4px" }}>
              {CONFIG.DISPLAY_COST}
            </div>
            <div style={{ position: "relative", left: "4px" }}>Max 10</div>
          </div>
        )}
        {!blockchain?.account || blockchain?.account === null ? (
          <span
            className="connect"
            onClick={() => {
              dispatch(connect());
            }}
          >
            <img src="Connect.png" alt="connect" width={180} height={60} />
          </span>
        ) : (
          <span className="connect" onClick={claimNFTs}>
            <img src="Mint.png" alt="mint" width={180} height={60} />
          </span>
        )}
      </>
      )
    </div>
  );
};

export default Landing;
