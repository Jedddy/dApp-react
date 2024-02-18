import React from "react";

import { ethers } from "ethers";

import NavBar from "./components/NavBar"
import Home from "./components/Home"
import { AddressContext } from "./context/globalContext";
import { contractAddress, contractABI } from "./constants/contract";


declare const window: any;

function App() {
    const [address, setAddress] = React.useState<string>('');
    const [contract, setContract] = React.useState<ethers.Contract | null>(null);

    let provider = new ethers.BrowserProvider(window.ethereum, {chainId: 421614, name: 'arbsep'});

    if (window.ethereum && window.ethereum.selectedAddress) {
        provider
            .getSigner()
            .then((signer: ethers.Signer) => {
                signer.getAddress().then((address: string) => {
                        setAddress(address);
                    }
                );

                setContract(
                    new ethers.Contract(
                        contractAddress,
                        contractABI,
                        signer, // Pass the signer object to the contract instantiation
                    )
                );
            })

        window.ethereum.on('accountsChanged', (accounts: string[]) => {
            setAddress(accounts[0]);
            window.location.reload();
        });
    }

    const updateAddress = async (address: string) => {
        setAddress(address);
    }

    return <AddressContext.Provider value={{
        address,
        updateAddress,
        provider,
    }}>
        <NavBar contract={contract}/>
        <Home contract={contract} />
    </AddressContext.Provider>;
}

export default App;
