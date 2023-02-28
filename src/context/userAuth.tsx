import React, { createContext, useContext, useState } from 'react'
import { supabase }from '../services/supabase'
import { toast } from "react-toastify";

interface IUser{
    name: string | null
    username: string | null
    email: string   | null
    mobile: string | null
    address: string | null
}

interface IAuthContext{
    user: IUser
    signed: boolean
    setSigned: any
    setUser: any
    recoveryEmail: string | null
    setRecoveryEmail: any
    updateUser: () => void
    resetUser: () => void
}

interface IProps{
    children: React.ReactNode
}

export const AuthContext = createContext<IAuthContext>({} as IAuthContext)

export const AuthContextProvider = ({children}:IProps) => {
    const [user, setUser] = useState<IUser>({
                                                name: null,
                                                username: null,
                                                email: null,
                                                mobile: null,
                                                address: null
                                            })
    const [recoveryEmail, setRecoveryEmail] = useState(null)
    const [signed, setSigned] = useState(false)

    const resetUser = () => {
        setUser({
            name: null,
            username: null,
            email: null,
            mobile: null,
            address: null
        })
    }
                                            
    const updateUser = async () => {
        try{
            let response = await supabase.auth.getSession()
            if(response.error){
                toast.error(response.error.message, { position: toast.POSITION.TOP_CENTER })
            }else if(response.data.session !== null){
                const userData = response.data.session.user
                try{
                    let responseDb = await supabase
                        .from('profiles')
                        .select('full_name, username, address, mobile')
                        .eq('id', userData.id)
                    if(responseDb.error){
                        toast.error(responseDb.error.message, { position: toast.POSITION.TOP_CENTER })
                    }else{
                        let db = responseDb.data[0]
                        setUser({
                            name: db.full_name,
                            username: db.username,
                            email: userData.email,
                            mobile: db.mobile,
                            address: db.address
                        })
                    }
                }catch(error:any){
                    alert(error.message)
                }
            }
        }catch(error:any){
            alert(error.message)
        }
    }

    return (
        <AuthContext.Provider value={{user, setUser, recoveryEmail, setRecoveryEmail, signed, setSigned, updateUser, resetUser}}>
            {children}
        </AuthContext.Provider>
    )
}


/* Costum Hook */

export const useAuth = () => {
    return useContext(AuthContext)
}