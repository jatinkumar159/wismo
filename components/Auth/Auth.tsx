import { Box, Text } from "@chakra-ui/react"
import styles from "./Auth.module.scss"

export default function Auth() {
    return (
        <Box className={styles.container}>
            <Text>
                You don&apos;t have access to take any action on
                this page. <Text color='blue' as='span'>Login</Text> to see
                order details or share feedback
            </Text>
        </Box>
    )
}