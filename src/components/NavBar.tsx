import React from 'react';

import ConnectMetamask from './ConnectMetamask';
import { AddressContext } from '../App';

const NavBar = (): React.ReactNode => {
    const { address } = React.useContext(AddressContext);

    return <nav className="w-full fixed flex h-16 bg-cyan-300 items-center top-0">
        <h1 className="text-2xl mr-8 ml-4">SG</h1>
        {
            address === ''
            ? <ConnectMetamask />
            : <div className="flex">
                <p>Logged in as: {address}</p>
              </div>
        }
    </nav>
}

export default NavBar;
