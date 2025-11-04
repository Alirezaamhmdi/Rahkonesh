// src/context/programContext.tsx
import React, { createContext, useContext, useState, type ReactNode } from "react";

type Program = any;

type ProgramState = {
    data: Program[];
    count: number;
    time: Date;
};

type ProgramContextType = {
    programs: ProgramState;
    addProgram: (p: Program) => void;
    setProgramsAll: (data: ProgramState) => void;
    editProgram: (id: string, updatedProgram: Partial<Program>) => void;
    removeProgram: (id: string) => void;
};

const ProgramContext = createContext<ProgramContextType | undefined>(undefined);

export const ProgramProvider = ({ children }: { children: ReactNode }) => {
    const [programs, setPrograms] = useState<ProgramState>({ data: [], count: 0, time: new Date() });

    const setProgramsAll = (data: ProgramState) => setPrograms(data);

    const addProgram = (p: Program) => {
        setPrograms(prev => {
            const newData = [...prev.data, { ...p }];
            return { data: newData, count: prev.count + 1, time: new Date() };
        });
    };

    const editProgram = (id: string, updatedProgram: Partial<Program>) => {
        setPrograms(prev => {
            const newData = prev.data.map(u => (u.id === +id ? { ...u, ...updatedProgram } : u));
            return { data: newData, count: newData.length, time: new Date() };
        });
    };

    const removeProgram = (id: string) => {
        setPrograms(prev => {
            const newData = prev.data.filter(u => u.id !== +id);
            return { data: newData, count: newData.length, time: new Date() };
        });
    };

    return (
        <ProgramContext.Provider value={{ programs, addProgram, setProgramsAll, editProgram, removeProgram }}>
            {children}
        </ProgramContext.Provider>
    );
};

export const usePrograms = () => {
    const ctx = useContext(ProgramContext);
    if (!ctx) throw new Error("usePrograms must be used within a ProgramProvider");
    return ctx;
};
