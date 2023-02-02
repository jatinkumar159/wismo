import { ChevronRightIcon, CloseIcon } from "@chakra-ui/icons";
import { Box, Button, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, Flex, HStack, PinInput, PinInputField, Text, useDisclosure } from "@chakra-ui/react"
import { useState } from "react";
import LoginDrawer from "../LoginDrawer/LoginDrawer";
import styles from "./LoginPrompt.module.scss";

interface LoginPromptProps {
    context: string | null
}

export default function LoginPrompt({ context }: LoginPromptProps) {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <Box className={styles.container} p={4}>
                <Text as="p" fontSize="sm">
                    You don&apos;t have access to take any action on
                    this page. Please <Text color="var(--wismo-colors-link)" as="span" cursor="pointer" onClick={onOpen}>Login</Text> to {context}.
                </Text>
                <LoginDrawer context="To share feedback, " isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
            </Box>
        </>
    )
}