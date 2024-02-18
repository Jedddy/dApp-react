import React, { useEffect, useState } from 'react';

import { ethers } from 'ethers';

import ConnectMetamask from './ConnectMetamask';
import { AddressContext } from '../context/globalContext';

declare const window: any;

const NavBar = ({ contract }: { contract: ethers.Contract | null }): React.ReactNode => {
    const [loggedIn, setLoggedIn] = useState<boolean>(false);
    const { address, updateAddress } = React.useContext(AddressContext);

    useEffect(() => {
        if (address || (window.ethereum && window.ethereum.selectedAddress)) {
            setLoggedIn(true);
            updateAddress!(window.ethereum.selectedAddress);
        }
    }, [contract, address])

    return <nav className="w-full fixed flex h-16 bg-cyan-300 items-center top-0">
        <h1 className="text-2xl mr-8 ml-4">SG</h1>
        {
            !loggedIn
            ? <ConnectMetamask />
            : <div className="flex">
                <p>Logged in as: {address}</p>
              </div>
        }
    </nav>
}

export default NavBar;
