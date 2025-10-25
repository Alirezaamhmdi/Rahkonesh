import React, { createContext, useContext, useState, type ReactNode, } from "react";

type User = any;

type UserState = {
    data: User[];
    count: number;
};

type UserContextType = {
    users: UserState;
    addUser: (user: User) => void;
    setUsesAll: (data: UserState) => void;
    editUser: (id: string, updatedUser: Partial<User>) => void;
    removeUser: (id: string) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [users, setUsers] = useState<UserState>({ data: [], count: 0 });

    const setUsesAll = (data: UserState) => {
        setUsers(data);
    };

    const addUser = (user: User) => {
        setUsers((prev) => {
            const newUser = { ...user };
            const newData = [...prev.data, newUser];
            return { data: newData, count: prev.count + 1 };
        });
    };

    const editUser = (id: string, updatedUser: Partial<User>) => {
        setUsers((prev) => {
            const newData = prev.data.map((u) =>
                u.id === id ? { ...u, ...updatedUser } : u
            );
            return { data: newData, count: newData.length };
        });
    };

    const removeUser = (id: string) => {
        setUsers((prev) => {
            const newData = prev.data.filter((u) => u.id !== id);
            return { data: newData, count: newData.length };
        });
    };

    return (
        <UserContext.Provider value={{ users, addUser, setUsesAll, editUser, removeUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUsers = () => {
    const context = useContext(UserContext);
    if (!context) throw new Error("useUsers must be used within a UserProvider");
    return context;
};
