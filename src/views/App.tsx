import React from "react";
import { Web3ReactProvider } from "@web3-react/core";

import { MetaMaskProvider } from "../hooks/metaMask";

import Routes from "../routes";

function App() {
  function getLibrary(provider: any) {
    return provider;
  }

  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <MetaMaskProvider>
        <Routes />
      </MetaMaskProvider>
    </Web3ReactProvider>
  );
}

export default App;
