import { createContext, useState } from "react";

const CurUserContext = createContext()

function CurUserProvider({ children }) {
    const [user, setUser] = useState({})

    const val = {
        user,
        setUser
    }

    return (
        <CurUserContext.Provider value={val}>
            {children}
        </CurUserContext.Provider>
    )
}

export { CurUserContext, CurUserProvider }