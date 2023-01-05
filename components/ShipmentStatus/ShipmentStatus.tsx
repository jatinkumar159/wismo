import { CloseIcon } from "@chakra-ui/icons";
import { Box, Button, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, Flex, HStack, PinInput, PinInputField, useDisclosure } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { Step, Steps, useSteps } from "chakra-ui-steps";
import styles from "./Shipment.module.scss";

const steps = [
    { label: 'Shipment Arrived at Hub', description: 'NBM/GHN, Manesar, HR\nNov 27, 2022, 10:06 AM' },
    { label: 'Shipment Arrived at Hub', description: 'NBM/GHN, Navi Mumbai, MH\nNov 26, 2022, 06:12 PM' },
    { label: 'Shipment Arrived at Hub', description: 'NBM/GHN, Thane, MH\nNov 26, 2022, 09:08 AM' }
]

export default function ShipmentStatus() {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const { activeStep } = useSteps({
        initialStep: 3,
    })

    return (
        <>
            <Box className={styles.container}>
                <Text color="var(--wismo-colors-link)" cursor="pointer" onClick={onOpen}>Shipment Status</Text>
            </Box>
            <Drawer placement="bottom" onClose={onClose} isOpen={isOpen}>
                <DrawerOverlay />
                <DrawerContent borderRadius="1rem 1rem 0 0" pt="2rem">
                    <DrawerBody>
                        <Steps orientation="vertical" activeStep={activeStep} size='sm'>
                            {steps.map(({ label, description }, index) => (
                                <Step label={label} key={index} description={description}></Step>
                            ))}
                        </Steps>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>

        </>
    )
}