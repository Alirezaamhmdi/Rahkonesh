import React, { createContext, useContext, useState, type ReactNode } from "react";

type Program = any;

type ProgramState = {
    data: Program[];
    count: number;
    time: Date;
};

type ProgramContextType = {
    program: ProgramState;
    addProgram: (program: Program) => void;
    setProgramsAll: (data: ProgramState) => void;
    editProgram: (id: string, updatedProgram: Partial<Program>) => void;
    removeProgram: (id: string) => void;
};

const ProgramContext = createContext<ProgramContextType | undefined>(undefined);

export const ProgramProvider = ({ children }: { children: ReactNode }) => {
    const [program, setPrograms] = useState<ProgramState>({ data: [], count: 0, time: new Date() });

    const setProgramsAll = (data: ProgramState) => {
        setPrograms(data)
    };

    const addProgram = (user: Program) => {
        setPrograms(prev => {
            const newProgram = { ...user }
            const newData = [...prev.data, newProgram];
            return { data: newData, count: prev.count + 1, time: new Date() };
        });
    };

    const editProgram = (id: string, updatedProgram: Partial<Program>) => {
        setPrograms(prev => {
            const newData = prev.data.map(u =>
                (u.id === +id ? { ...u, ...updatedProgram } : u)
            );
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
        <ProgramContext.Provider value={{ program, addProgram, setProgramsAll, editProgram, removeProgram }}>
            {children}
        </ProgramContext.Provider>
    );
};

export const usePrograms = () => {
    const context = useContext(ProgramContext);
    if (!context) throw new Error("usePrograms must be used within a ProgramProvider");
    return context;
};
