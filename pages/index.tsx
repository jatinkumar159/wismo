import { useRouter } from "next/router"
import { useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useAppDispatch } from "../redux/hooks";
import { setPhone, verifyProfile } from "../redux/slices/profileSlice";
import { verifyBuyer } from "../apis/post";
import { Center, Spinner, useToast } from "@chakra-ui/react";
import { showErrorToast } from "../utils/toasts";

interface Token {
    is_guest_user: boolean;
    iat: number;
    exp: number;
    sub: string;
}

export default function Home() {
    const dispatch = useAppDispatch();
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('turbo');

        // TOKEN DOES NOT EXIST
        if (!token) {
            router.replace('/profile');
            return;
        }

        // TOKEN EXISTS
        const decodedToken: Token = jwt_decode(token);
        console.log(decodedToken);

        // TOKEN IS EXPIRED
        if (Date.now() > (decodedToken.exp * 1000)) {
            const phone = decodedToken.sub;
            router.replace({
                pathname: '/profile',
                query: {
                    PHONE: phone
                },
            }, 'profile');
            return;
        }

        // TOKEN IS NOT EXPIRED
        dispatch(setPhone(decodedToken.sub));
        dispatch(verifyProfile());
        router.replace('/addresses');
    });

    return <Center h='100vh'><Spinner></Spinner></Center>
}