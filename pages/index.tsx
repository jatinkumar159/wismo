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
    const toast = useToast();
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
        if (Date.now() > decodedToken.exp) {
            const getBuyerInfo = async (phone: string) => {
                if (!phone || phone.length !== 10) {
                    router.push('/profile');
                    return;
                }

                try {
                    const res = await verifyBuyer(phone);
                    const data = await res.json();

                    if (res.status !== 200) {
                        router.replace('/profile');
                        return;
                    }

                    dispatch(setPhone(phone));
                    if (data.is_guest_user) {
                        dispatch(verifyProfile());
                        // MIGHT HAVE TO ADD CASE FOR BACK BUTTON TO NOT CLOSE MODAL & INSTEAD GO BACK TO PROFILE
                        router.replace('/addresses');
                    }
                    else router.push({
                        pathname: '/profile',
                        query: {
                            OTP_REQUEST_ID: data.otp_request_id,
                        },
                    }, '/profile')
                } catch {
                    showErrorToast(toast, { error_code: '500', message: 'An Internal Server Error Occurred, Please Try Again Later' });
                }
            }
            getBuyerInfo(decodedToken.sub);
            return;
        }

        // TOKEN IS NOT EXPIRED
        dispatch(setPhone(decodedToken.sub));
        dispatch(verifyProfile());
        router.replace('/addresses');
    });

    return <Center h='100vh'><Spinner></Spinner></Center>
}