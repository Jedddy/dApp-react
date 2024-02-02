import { BrowserProvider } from 'ethers';
import React from 'react';

interface GlobalContext {
    address: string;
    provider?: BrowserProvider
    updateAddress?: (address: string) => void;
}

const defaultGlobalContext: GlobalContext = {
    address: '',
}

export const AddressContext = React.createContext<GlobalContext>(defaultGlobalContext);
