import { createContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";

import { auth } from '../services/firebase'

export const AuthContext = createContext()

export function AuthProvider({ children }) {
    const [curUser, setCurUser] = useState({})

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, user => {
            setCurUser(user)
        })

        return () => {
            unsub()
        }
    }, [])

    return (
        <AuthContext.Provider value={{ curUser }}>{children}</AuthContext.Provider>
    )
}