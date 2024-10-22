"use client";
import { createContext, useContext, useState, ReactNode } from 'react';

// Define the type for the UserContext

interface UserData {
    id: number;
    name?: string;
    email: string;
    // Add any other properties that are part of your user data
}

interface UserContextType {
    userId: string | null;
    userData: UserData | null; // Use the UserData interface
    setUserId: (id: string | null) => void;
    setUserData: (data: UserData | null) => void; // Use UserData type here
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [userId, setUserId] = useState<string | null>(null);
    const [userData, setUserData] = useState<UserData | null>(null); // Use UserData type here

    return (
        <UserContext.Provider value={{ userId, setUserId, userData, setUserData }}>
            {children}
        </UserContext.Provider>
    );
};

// Export the UserContext for usage in other components
export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};

// Export UserContext if you need to reference it directly
export { UserContext };