import { Box, Button, Flex, HStack, Skeleton, SkeletonCircle, Text } from "@chakra-ui/react"
import { Step, Steps, useSteps } from "chakra-ui-steps"
import styles from "./Status.module.scss"
import OrderSteps from "./OrderSteps"
import Link from "next/link"
import Image from "next/image"
import { ChevronRightIcon, TimeIcon } from "@chakra-ui/icons"
import ShipmentStatus from "../ShipmentStatus/ShipmentStatus"
import imageLoader from "../../utils/imageLoader"
import brandLogo from '../../images/brandlogo.png'

interface Step {
    label: string;
}

type TrackingStatusProps = 
    | { 
        isLoading: true 
    } 
    | { 
        isLoading: false
        statusHeading: string
        statusSubheading: string | any
        brandLogo: string
        currentStep: number
        lastUpdated: string
        trackingUpdates: any[]
        steps: Step[]
        activeStep?: number
    }

export default function Status(props: TrackingStatusProps) {
    // const stepData = useSteps({
    //     steps: props.steps,
    //     initialStep: props.currentStep,
    // })

    if(props.isLoading) {
        return (
            <Box className={styles.container} p={4}>
            <Flex p={4} alignItems="center" justify={`center`}>
                <div style={{maxWidth: `100px`, maxHeight: `100px`}}>
                    <SkeletonCircle size='10' />
                    {/* <Image priority={false} loader={imageLoader} sizes="100px" src={props.brandLogo} alt="brand logo" /> */}
                </div>
            </Flex>
            <Flex flexDir={"column"} justify={"center"} align={"center"}>
                <Skeleton width={"100px"} height={"30px"} mb={2}></Skeleton>
                <Skeleton width={"400px"} height={"20px"}></Skeleton>
            </Flex>
            <Box overflow="auto" pb={3}>
                <Steps activeStep={0} orientation='horizontal' labelOrientation="vertical" responsive={false} mt='1rem' size='sm'>
                        <Step label={<Skeleton mt={1} width={"60px"} height={"10px"}></Skeleton>}></Step>
                        <Step label={<Skeleton mt={1} width={"60px"} height={"10px"}></Skeleton>}></Step>
                        <Step label={<Skeleton mt={1} width={"60px"} height={"10px"}></Skeleton>}></Step>
                        <Step label={<Skeleton mt={1} width={"60px"} height={"10px"}></Skeleton>}></Step>
                </Steps>
            </Box>
            <Flex justifyContent="space-between" w="100%" pt={1}>
                <HStack className={styles.lightText}>
                    <TimeIcon verticalAlign="middle" fontSize={`xs`}/>
                    <Skeleton width={"170px"} height={"18px"}></Skeleton>
                </HStack>
                <Button bgColor="pink.100" _hover={{ bgColor: 'pink.200' }}fontSize="xs" cursor="pointer" size="xs">Track journey&nbsp;<ChevronRightIcon w='1rem' h='1rem' /></Button>
            </Flex>
        </Box>
        )
    }
    
    return (
        <Box className={styles.container} p={4}>
            <Flex p={4} alignItems="center" justify={`center`}>
                <div style={{maxWidth: `100px`, maxHeight: `100px`}}>
                    { props.brandLogo ? <Image priority={false} width={"60"} height={"40"} loader={imageLoader} sizes="100px" src={props.brandLogo} alt="brand logo" /> : <></>}
                    {/* <Image priority={false} loader={imageLoader} sizes="100px" src={props.brandLogo} alt="brand logo" /> */}
                </div>
            </Flex>
            <Box textAlign="center">
                <Text as="h1" fontSize="xl" dangerouslySetInnerHTML={{__html: props.statusHeading}}></Text>
                <Text as="p" fontSize="sm" className={styles.lightText} dangerouslySetInnerHTML={{__html: props.statusSubheading}}></Text>
            </Box>
            {/* <OrderSteps {...stepData} /> */}
            <OrderSteps steps={props.steps} activeStep={props.currentStep}/>
            <Flex justifyContent="space-between" w="100%" pt={1}>
                <HStack className={styles.lightText}>
                    <TimeIcon verticalAlign="middle" fontSize={`xs`}/>
                    <Text as="span" fontSize="xs">{`${new Date(props.lastUpdated).toLocaleDateString('en-us', { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' })} at ${new Date(props.lastUpdated).toLocaleTimeString('en-us', {hour: '2-digit', minute:'2-digit'})}`}</Text>
                </HStack>
                <ShipmentStatus trackingUpdates={props.trackingUpdates} />
            </Flex>
        </Box>
    )
}