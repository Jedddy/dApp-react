import { useEffect, useState } from "react";

import { ethers } from "ethers";

import NavBar from "./components/NavBar"
import Home from "./components/Home"
import { AddressContext } from "./context/globalContext";
import { contractAddress, contractABI } from "./constants/contract";

declare const window: any;

function App() {
    const [address, setAddress] = useState<string>('');
    const [contract, setContract] = useState<ethers.Contract | null>(null);

    let provider = new ethers.BrowserProvider(window.ethereum, {chainId: 421614, name: 'arbsep'});

    useEffect(() => {
        const signerPromise = provider.getSigner();

        signerPromise
            .then((signer: ethers.Signer) => {
                signer.getAddress().then((address: string) => {
                    setAddress(address);
                });

                setContract(
                    new ethers.Contract(
                        contractAddress,
                        contractABI,
                        signer, // Pass the signer object to the contract instantiation
                    )
                );
            })
            .catch((error) => {
                console.error("Failed to get signer:", error);
            });

        const accountsChangedHandler = (accounts: string[]) => {
            setAddress(accounts[0]);
            window.location.reload();
        };

        window.ethereum.on('accountsChanged', accountsChangedHandler);

        // Clean up event listener on component unmount
        return () => {
            window.ethereum.off('accountsChanged', accountsChangedHandler);
        };
    }, [provider]);

    const updateAddress = async (address: string) => {
        setAddress(address);
    }

    return (
        <AddressContext.Provider value={{
            address,
            updateAddress,
            provider,
        }}>
            <NavBar contract={contract}/>
            <Home contract={contract} />
        </AddressContext.Provider>
    );
}

export default App;