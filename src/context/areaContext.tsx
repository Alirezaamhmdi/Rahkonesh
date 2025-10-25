import React, { createContext, useContext, useState, type ReactNode, } from "react";

type Area = any;

type AreaState = {
    data: Area[];
    count: number;
    time: Date;
};

type AreaContextType = {
    area: AreaState;
    addArea: (user: Area) => void;
    setAreasAll: (data: AreaState) => void;
    editArea: (id: string, updatedArea: Partial<Area>) => void;
    removeArea: (id: string) => void;
};

const AreaContext = createContext<AreaContextType | undefined>(undefined);

export const AreaProvider = ({ children }: { children: ReactNode }) => {
    const [area, setAreas] = useState<AreaState>({ data: [], count: 0, time: new Date() });

    const setAreasAll = (data: AreaState) => {
        setAreas(data);
    };

    const addArea = (user: Area) => {
        setAreas((prev) => {
            const newArea = { ...user };
            const newData = [...prev.data, newArea];
            return { data: newData, count: prev.count + 1, time: new Date() };
        });

    };

    const editArea = (id: string, updatedArea: Partial<Area>) => {
        setAreas((prev) => {
            const newData = prev.data.map((u) =>
                u.id === +id ? { ...u, ...updatedArea } : u
            );
            return { data: newData, count: newData.length, time: new Date() };
        });

    };

    const removeArea = (id: string) => {
        setAreas((prev) => {
            const newData = prev.data.filter((u) => u.id !== +id);
            return { data: newData, count: newData.length, time: new Date() };
        });
    };

    return (
        <AreaContext.Provider value={{ area, addArea, setAreasAll, editArea, removeArea }}>
            {children}
        </AreaContext.Provider>
    );
};

export const useAreas = () => {
    const context = useContext(AreaContext);
    if (!context) throw new Error("useAreas must be used within a AreaProvider");
    return context;
};
