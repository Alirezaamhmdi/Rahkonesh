import {createContext} from "react"

interface EnvContextType {
    DOMAIN_URL: string;
    BACE_URL: string;
    CLUDE_URL: string;
}

const EnvContext = createContext<EnvContextType | undefined>(undefined);

export default EnvContext;
