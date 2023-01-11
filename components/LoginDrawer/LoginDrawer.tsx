import { CloseIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Text, Drawer, DrawerOverlay, DrawerContent, DrawerHeader, DrawerBody, Flex, HStack, PinInput, PinInputField, Button } from "@chakra-ui/react";
import { useState } from "react";

interface Props {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

export default function LoginDrawer({ isOpen, onOpen, onClose }: Props) {
    const [pin, setPin] = useState<string>("");

    return (
        <Drawer placement="bottom" onClose={onClose} isOpen={isOpen}>
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
                    <CloseIcon w="1rem" h="1rem" onClick={onClose} />
                </DrawerHeader>
                <DrawerBody>
                    <Flex flexDir="column" gap="1rem" pb="3rem" paddingInline="1rem" align="center">
                        <Text>Enter OTP received on 817*****70</Text>
                        <HStack>
                            <PinInput otp onChange={val => setPin(val)} placeholder="">
                                <PinInputField />
                                <PinInputField />
                                <PinInputField />
                                <PinInputField />
                            </PinInput>
                        </HStack>
                        <Text>Resend OTP in 25 seconds</Text>
                        <Button fontSize="sm" bg="black" color="white" _hover={{ background: "black" }} onClick={onClose}>Login&nbsp;<ChevronRightIcon /></Button>
                    </Flex>
                </DrawerBody>
            </DrawerContent>
            {/* </motion.div> */}
        </Drawer>

    )
}