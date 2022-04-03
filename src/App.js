import "./App.css";

function App() {
  return (
    <div className="app">
      <img src="Home.png" alt="Home" />
      <div className="icons">
        <a>
          <img src="Twitter.png" alt="twitter" width={64} height={64} />
        </a>
        <a>
          <img src="Etherscan.png" alt="etherscan" width={64} height={64} />
        </a>
        <a>
          <img src="Discord.png" alt="discord" width={64} height={64} />
        </a>
        <a>
          <img src="Opensea.png" alt="opensea" width={64} height={64} />
        </a>
      </div>
      <span className="connect">
        <img src="Connect.png" alt="connect" width={180} height={60} />
      </span>
    </div>
  );
}

export default App;
