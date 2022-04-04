import { Web3ReactProvider } from "@web3-react/core";
import { SnackbarProvider } from "notistack";
import Web3 from "web3";
import "./App.css";
import Faq from "./Faq";
import Landing from "./Landing";
import Math from "./Math";
import Roadmap from "./Roadmap";
import Why from "./Why";

function App() {
  function getLibrary(provider) {
    return new Web3(provider);
  }

  return (
    <SnackbarProvider maxSnack={3}>
      <Web3ReactProvider getLibrary={getLibrary}>
        <div className="app">
          <Landing />
          <Math />
          <Roadmap />
          <Why />
          <Faq />
        </div>
      </Web3ReactProvider>
    </SnackbarProvider>
  );
}

export default App;
