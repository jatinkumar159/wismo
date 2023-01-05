import { Box, Flex, HStack, Text } from "@chakra-ui/react"
import { Step, Steps, useSteps } from "chakra-ui-steps"
import styles from "./Status.module.scss"
import OrderSteps from "./OrderSteps"
import Link from "next/link"
import { TimeIcon } from "@chakra-ui/icons"

export default function Status() {
    const stepData = useSteps({
        initialStep: 2,
    })

    return (
        <Box className={styles.container} p={4}>
            <Box textAlign="center">
                <Text as="h1" fontSize="xl">Arriving Today!</Text>
                <Text as="p" fontSize="sm" className={styles.lightText}>Package will arrive between <Text as="span" className={styles.darkText}>6pm and 8pm</Text></Text>
            </Box>
            <OrderSteps {...stepData} />
            <Flex justifyContent="space-between" w="100%" pt={4}>
                <HStack className={styles.lightText}>
                    <TimeIcon verticalAlign="middle" fontSize={`xs`}/>
                    <Text as="span" fontSize="xs">Dec 1st, 2022, 9:30 AM</Text>
                </HStack>
                <Text color="var(--wismo-colors-link)" fontSize="xs">View more</Text>
            </Flex>
        </Box>
    )
}