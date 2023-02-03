import React, { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import { Auth } from "../../interfaces";

export const AuthContext = React.createContext<Auth>({
    isAuthorized: undefined,
    checkAuthorization: () => { },
    phoneNumber: undefined,
    setPhoneNumber: () => { },
    trackingNumber: undefined,
    setTrackingNumber: () => { },
});

export default function AuthProvider({ children }: { children: JSX.Element }) {
    const [auth, setAuth] = useState<boolean>(false);
    const [phoneNumber, setPhoneNumber] = useState<string>("");
    const [trackingNumber, setTrackingNumber] = useState<string>("");

    const checkAuthorization = () => {
        const token = localStorage.getItem('tr');
        if (token && decodeURIComponent(window.atob(token)) === phoneNumber) setAuth(true);
        else setAuth(false);
    }

    useEffect(() => {
        checkAuthorization();
    }, [trackingNumber, phoneNumber])

    return (
        <AuthContext.Provider
            value={{
                isAuthorized: auth,
                checkAuthorization: checkAuthorization,
                phoneNumber: phoneNumber,
                setPhoneNumber: setPhoneNumber,
                trackingNumber: trackingNumber,
                setTrackingNumber: setTrackingNumber,
            }}
        >{children}</AuthContext.Provider>
    )
}
