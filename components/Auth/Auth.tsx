import { ChevronRightIcon, CloseIcon } from "@chakra-ui/icons";
import { Box, Button, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, Flex, HStack, PinInput, PinInputField, Text, useDisclosure } from "@chakra-ui/react"
import { useState } from "react";
import styles from "./Auth.module.scss"

export default function Auth() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [pin, setPin] = useState<string>("");

    return (
        <>
            <Box className={styles.container}>
                <Text>
                    You don&apos;t have access to take any action on
                    this page. <Text color="var(--wismo-colors-link)" as="span" cursor="pointer" onClick={onOpen}>Login</Text> to see
                    order details or share feedback
                </Text>
            </Box>
            <Drawer placement="bottom" onClose={onClose} isOpen={isOpen}>
                <DrawerOverlay />
                <DrawerContent borderRadius="1rem 1rem 0 0">
                    <DrawerHeader marginLeft="auto">
                        <CloseIcon w="1rem" h="1rem" onClick={onClose} />
                    </DrawerHeader>
                    <DrawerBody>
                        <Flex flexDir="column" gap="1rem" pb="3rem" paddingInline="1rem" align="center">
                            <Text>Enter OTP received on 817*****70</Text>
                            <HStack>
                                <PinInput otp onChange={val => setPin(val)} placeholder="">
                                    <PinInputField/>
                                    <PinInputField/>
                                    <PinInputField/>
                                    <PinInputField/>
                                </PinInput>
                            </HStack>
                            <Text>Resend OTP in 25 seconds</Text>
                            <Button fontSize="sm" bg="black" color="white" _hover={{ background: "black" }} onClick={onClose}>Login&nbsp;<ChevronRightIcon /></Button>
                        </Flex>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    )
}