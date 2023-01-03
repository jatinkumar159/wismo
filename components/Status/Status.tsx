import { Box, Flex, Text } from "@chakra-ui/react"
import { Step, Steps, useSteps } from "chakra-ui-steps"
import styles from "./Status.module.scss"
import OrderSteps from "./OrderSteps"
import Link from "next/link"

export default function Status() {
    const stepData = useSteps({
        initialStep: 1,
    })

    return (
        <Box className={styles.container}>
            <Text fontSize='2xl'>Arriving Today!</Text>
            <Text>Package will arrive at <Text as='span'>6 PM - 8 PM</Text></Text>
            <OrderSteps {...stepData} />
            <Flex justifyContent='space-between' w='100%'>
                <Text>Dec 1st, 2022, 9:30 AM</Text>
                <Text color='blue' textTransform='capitalize'>View More</Text>
            </Flex>
        </Box>
    )
}