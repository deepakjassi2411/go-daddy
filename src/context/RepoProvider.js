import { createContext, useState } from "react";

const RepoContext = createContext();

function RepoProvider({ children }) {
    
    const [repos,setRepos] = useState([]);

    const contextValue = {
        repos,
        setRepos
    }

    return (
        <RepoContext.Provider value={contextValue}>
            {children}
        </RepoContext.Provider>
    )
    
}

export { RepoContext,RepoProvider};