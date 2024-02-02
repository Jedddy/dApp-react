import React from "react";

import { ethers } from 'ethers';

import { AddressContext } from '../context/globalContext';

declare const window: any;

const ConnectMetamask = (): React.ReactNode => {
    const { updateAddress } = React.useContext(AddressContext);
    const provider = new ethers.BrowserProvider(window.ethereum);

    const handleOnClick = async () => {
        if (!window.ethereum) {
            alert('Metamask not installed!');
            return;
        }

        const signer = await provider.getSigner();
        const address = await signer.getAddress();

        updateAddress!(address);
    }

    return <button className="bg-gray-200 rounded p-2" onClick={handleOnClick}>Connect Wallet</button>
}

export default ConnectMetamask;