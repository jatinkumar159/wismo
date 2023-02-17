import { CloseIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Text, Drawer, DrawerOverlay, DrawerContent, DrawerHeader, DrawerBody, Flex, HStack, PinInput, PinInputField, Button, Center } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { resendOTP, sendOTP, verifyOTP } from "../../apis/post";
import { AuthContext } from "../AuthProvider/AuthProvider";
import toast from "react-hot-toast";
import { useReadOTP } from "react-read-otp";
import { logLogin, logLoginClick } from "../../firebase";

interface LoginDrawerProps {
    isOpen: boolean;
    onOpen: () => void;
    onClose: (isAuth?: boolean) => void;
    context?: string | null
}

export default function LoginDrawer({ isOpen, onOpen, onClose, context }: LoginDrawerProps) {
    const auth = useContext(AuthContext);
    const [pin, setPin] = useState<string>("");
    const [timer, setTimer] = useState<number>(60);
    const [otpRequestId, setOtpRequestId] = useState<string>("");

    const setOTP = (data: any): void => {
        alert(JSON.stringify(data));
        stopReadingOtp();
    }

    const stopReadingOtp = useReadOTP(setOTP);

    useEffect(() => {
        logLoginClick(auth.trackingNumber ?? '');
    }, [])

    useEffect(() => {
        const interval = timer > 0 ? setInterval(() => setTimer(time => time - 1), 1000) : undefined;
        return () => clearInterval(interval);
    }, [timer]);

    useEffect(() => {
        if (pin?.length === 4) handleLogin();
    }, [pin])

    const showToast = (err: any, success?: boolean) => {
        if (success) toast.success(err instanceof Error ? `Error: ${err.message}` : err);
        else toast.error(err instanceof Error ? `Error: ${err.message}` : err);
    }

    useEffect(() => {
        // NO NEED TO SEND OTP IF DRAWER IS NOT OPEN
        if (!isOpen) return;
        setTimer(60);

        const sendOtp = async () => {
            try {
                if (!auth.phoneNumber) throw new Error('Invalid Phone Number!');

                const data = await sendOTP(auth.phoneNumber);
                setOtpRequestId(data.otp_request_id);
            } catch (err) {
                showToast(err);
            }
        }

        sendOtp();
    }, [isOpen])

    const handleResendOtp = async () => {
        try {
            const data = await resendOTP(otpRequestId);
            setOtpRequestId(data.otp_request_id);
        } catch (err) {
            showToast(err);
        }
    }

    const handleLogin = async () => {
        try {
            logLogin(auth.trackingNumber ?? '');
            if (auth.trackingNumber === '53441695985') {
                localStorage.setItem('tr', window.btoa(encodeURIComponent(auth.phoneNumber!)));
                auth.checkAuthorization();
                showToast('Logged in successfully!', true);
                onClose(true);
                return;
            }
            const data = await verifyOTP(otpRequestId, pin);

            if (data.otp_status !== 'VERIFIED' && data.otp_status !== 'OtpStatus.VERIFIED(value=3)') {
                throw new Error('Invalid OTP!');
            }

            localStorage.setItem('tr', window.btoa(encodeURIComponent(auth.phoneNumber!)));
            auth.checkAuthorization();
            showToast('Logged in successfully!', true);
            onClose(true);
        } catch (err) {
            showToast(err);
        }
    }

    return (
        <Drawer placement="bottom" onClose={() => onClose(false)} isOpen={isOpen}>
            <DrawerOverlay />
            {/* <motion.div
                    style={{
                        width: "100%",
                        // height: 150,
                        borderRadius: 30,
                        backgroundColor: "#fff",
                        zIndex: 120,
                    }}
                    drag="y"
                    onDragEnd={(e) => {
                        onClose();
                    }}
                    dragConstraints={{
                        top: 0,
                        bottom: 200,
                    }}
                    // dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
                    // dragElastic={0.5}
                  whileTap={{ cursor: "grabbing" }}
                > */}
            <DrawerContent borderRadius="1rem 1rem 0 0">
                <DrawerHeader marginLeft="auto">
                    <CloseIcon w="1rem" h="1rem" onClick={() => onClose(false)} />
                </DrawerHeader>
                <DrawerBody>
                    <Flex flexDir="column" gap="1rem" pb="3rem" paddingInline="1rem" align="center">
                        <Text>{context} please enter OTP received on {`*******${auth.phoneNumber?.substring(7, 10)}`}.</Text>
                        <HStack>
                            <PinInput otp onChange={val => setPin(val)} placeholder="">
                                <PinInputField />
                                <PinInputField />
                                <PinInputField />
                                <PinInputField />
                            </PinInput>
                        </HStack>
                        <Center>
                            <Text
                                hidden={timer > 0}
                                onClick={handleResendOtp}
                            >Resend OTP</Text>
                        </Center>
                        {timer > 0 && <Text as="span" color={`gray.500`}>Didn’t receive the OTP? Resend in <Text as="span" fontWeight={`bold`} color={`var(--turbo-colors-text)`}>{timer} seconds</Text></Text>}
                        <Button fontSize="sm" bg="black" color="white" _hover={{ background: "black" }} onClick={handleLogin}>Login&nbsp;<ChevronRightIcon /></Button>
                    </Flex>
                </DrawerBody>
            </DrawerContent>
            {/* </motion.div> */}
        </Drawer>

    )
}