import React, { createContext, useContext, useState, useEffect, ReactNode, Dispatch, SetStateAction } from "react";
import { getCurrentUser } from "../lib/appwrite";

interface LoggedInUser {
    username: string
    email: string
    avatar: string
    accountId: string
}

interface GlobalContextType {
    isLoggedIn: boolean
    setIsLoggedIn: Dispatch<SetStateAction<boolean>>
    user: any
    setUser: any
    isLoading: boolean
}

type ContextProviderProps = {
    children?: ReactNode
}

const GlobalContext = createContext<GlobalContextType>(null as any);

export const useGlobalContext = () => useContext(GlobalContext);


export const GlobalProvider = ({children}:ContextProviderProps) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [user, setUser] = useState<any>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        getCurrentUser()
            .then((res) => {
                if (res){
                    setIsLoggedIn(true);
                    setUser(res);
                }
                else{
                    setIsLoggedIn(false)
                    setUser(null)
                }
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(()=>{
                setIsLoading(false)
            })
    },[]);
    
    return (
        <GlobalContext.Provider
            value= {{
                isLoggedIn,
                setIsLoggedIn,
                user,
                setUser,
                isLoading,
            }}
        >
            {children}
        </GlobalContext.Provider>
    
    )
}
