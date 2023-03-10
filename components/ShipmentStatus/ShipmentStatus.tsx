import { ChevronRightIcon, CloseIcon } from "@chakra-ui/icons";
import { Box, Button, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, Flex, HStack, PinInput, PinInputField, useDisclosure } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { Step, Steps, useSteps } from "chakra-ui-steps";
import { motion } from "framer-motion";
import styles from "./Shipment.module.scss";

const steps = [
    // { label: 'Shipment arrived at hub', description: 'NBM/GHN, Manesar, HR\nNov 27, 2022, 10:06 AM' },
    // { label: 'Shipment arrived at hub', description: 'NBM/GHN, Manesar, HR\nNov 27, 2022, 10:06 AM' },
    // { label: 'Shipment arrived at hub', description: 'NBM/GHN, Manesar, HR\nNov 27, 2022, 10:06 AM' }
]

export interface TrackEvent {
    tracking_datetime: string;
    tracking_location: string;
    tracking_status: string;
}
interface ShipmentStatusProps {
    trackingUpdates: TrackEvent[]
}

export default function ShipmentStatus(props: ShipmentStatusProps) {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <Box className={styles.container}>
                {/* <Text color="var(--wismo-colors-link)" fontSize="xs" onClick={onOpen} cursor="pointer">Track journey&nbsp;<ChevronRightIcon w='0.75rem' h='0.75rem' /></Text> */}
                <Button bgColor="pink.100" _hover={{ bgColor: 'pink.200' }}fontSize="xs" onClick={onOpen} cursor="pointer" size="xs">Track journey&nbsp;<ChevronRightIcon w='1rem' h='1rem' /></Button>
            </Box>
            <Drawer placement="bottom" onClose={onClose} isOpen={isOpen}>
                <DrawerOverlay />
                {/* <motion.div
                    style={{
                        width: "100%",
                        // height: 150,
                        borderRadius: 30,
                        backgroundColor: "blue",
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
                    dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
                    dragElastic={0.5}
                //   whileTap={{ cursor: "grabbing" }}
                >  */}
                <DrawerContent borderRadius="1rem 1rem 0 0" pt="2rem" maxHeight={`45%`}>
                    <DrawerHeader>
                        <CloseIcon w="0.75rem" h="0.75rem" onClick={onClose} position="absolute" top="1.25rem" right="1.25rem" />
                    </DrawerHeader>
                    <DrawerBody>
                        <Steps orientation="vertical" activeStep={props.trackingUpdates.length} size='sm'>
                            {props.trackingUpdates.map((trackEvent, index) => (
                                <Step label={trackEvent.tracking_location} key={index} description={`${trackEvent.tracking_status}\n${trackEvent.tracking_datetime.trim()}`}></Step>
                            ))}
                        </Steps>
                    </DrawerBody>
                </DrawerContent>
                {/* </motion.div> */}
            </Drawer>

        </>
    )
}