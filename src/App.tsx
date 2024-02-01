import React from "react";

import { ethers } from "ethers";

import { contractAddress, contractABI } from "./constants/contract";
import NavBar from "./components/NavBar"
import Home from "./components/Home"

interface IAddressContext {
  address: string;
  updateAddress?: (address: string) => void;
}

declare const window: any;

const defaultAddressContext: IAddressContext = {
  address: '',
}

export const AddressContext = React.createContext<IAddressContext>(defaultAddressContext);

function App() {
  const [address, setAddress] = React.useState<string>('');

  let provider = new ethers.BrowserProvider(window.ethereum);
  let readContract = new ethers.Contract(
      contractAddress,
      contractABI,
      provider,
  );

  const updateAddress = async (address: string) => {
    setAddress(address);
  }

  return <AddressContext.Provider value={{
    address,
    updateAddress,
  }}>
      <NavBar />
      <Home contract={readContract} />
  </AddressContext.Provider>;
}

export default App
