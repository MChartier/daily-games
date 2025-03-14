import React, { createContext, useContext, useState, ReactNode } from 'react';

interface HelpContextType {
    showHelp: boolean;
    setShowHelp: (show: boolean) => void;
}

const HelpContext = createContext<HelpContextType | undefined>(undefined);

export const useHelp = () => {
    const context = useContext(HelpContext);
    if (context === undefined) {
        throw new Error('useHelp must be used within a HelpProvider');
    }
    return context;
};

interface HelpProviderProps {
    children: ReactNode;
}

export const HelpProvider: React.FC<HelpProviderProps> = ({ children }) => {
    const [showHelp, setShowHelp] = useState(false);

    return (
        <HelpContext.Provider value={{ showHelp, setShowHelp }}>
            {children}
        </HelpContext.Provider>
    );
}; 