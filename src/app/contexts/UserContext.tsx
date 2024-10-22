"use client";
import { createContext, useContext, useState, ReactNode } from 'react';

// Define the type for the UserContext
interface UserContextType {
    userId: string | null;
    userData: any; // Adjust the type according to your user data structure
    setUserId: (id: string | null) => void;
    setUserData: (data: any) => void;
}

// Create the context with an undefined initial value
const UserContext = createContext<UserContextType | undefined>(undefined);

// UserProvider component that will provide the context value
export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [userId, setUserId] = useState<string | null>(null);
    const [userData, setUserData] = useState<any>(null);

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