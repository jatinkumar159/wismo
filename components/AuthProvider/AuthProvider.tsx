import React, { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import { Auth } from "../../interfaces";

export const AuthContext = React.createContext<Auth>({
    isAuthorized: undefined,
    setAuthorization: () => { },
    phoneNumber: undefined,
    setPhoneNumber: () => { },
});

export default function AuthProvider({ children }: { children: JSX.Element }) {
    const [auth, setAuth] = useState<boolean>(false);
    const [phoneNumber, setPhoneNumber] = useState<string>("");

    return (
        <AuthContext.Provider
            value={{
                isAuthorized: auth,
                setAuthorization: setAuth,
                phoneNumber: phoneNumber,
                setPhoneNumber: setPhoneNumber
            }}
        >{children}</AuthContext.Provider>
    )
}
