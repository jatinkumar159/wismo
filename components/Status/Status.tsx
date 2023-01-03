import { Box, Text } from "@chakra-ui/react"
import { Step, Steps, useSteps } from "chakra-ui-steps"
import styles from "./Status.module.scss"
import OrderSteps from "./OrderSteps"

export default function Status() {
    const stepData = useSteps({
        initialStep: 1,
    })

    return (
        <Box className={styles.container}>
            <Text fontSize='2xl'>Arriving Today!</Text>
            <Text>Package will arrive at <Text as='span'>6 PM - 8 PM</Text></Text>
            <OrderSteps {...stepData} />
        </Box>
    )
}