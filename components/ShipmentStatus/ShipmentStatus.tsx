import { CloseIcon } from "@chakra-ui/icons";
import { Box, Button, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, Flex, HStack, PinInput, PinInputField, useDisclosure } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { Step, Steps, useSteps } from "chakra-ui-steps";
import { motion } from "framer-motion";
import styles from "./Shipment.module.scss";

const steps = [
    { label: 'Shipment arrived at hub', description: 'NBM/GHN, Manesar, HR\nNov 27, 2022, 10:06 AM' },
    { label: 'Shipment arrived at hub', description: 'NBM/GHN, Manesar, HR\nNov 27, 2022, 10:06 AM' },
    { label: 'Shipment arrived at hub', description: 'NBM/GHN, Manesar, HR\nNov 27, 2022, 10:06 AM' }
]

export default function ShipmentStatus() {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const { activeStep } = useSteps({
        initialStep: 3,
    })

    return (
        <>
            <Box className={styles.container}>
                <Text color="var(--wismo-colors-link)" fontSize="xs" onClick={onOpen}>View more</Text>
            </Box>
            <Drawer placement="bottom" onClose={onClose} isOpen={isOpen}>
                <DrawerOverlay />
                <motion.div
                    style={{
                        width: "100%",
                        // height: 150,
                        borderRadius: 30,
                        backgroundColor: "blue",
                        zIndex: 120,
                    }}
                    drag="y"
                    onDragEnd={(e) => {
                        console.log(e);
                        onClose();
                    }}
                    dragConstraints={{
                        top: 0,
                        bottom: 200,
                    }}
                    dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
                    dragElastic={0.5}
                //   whileTap={{ cursor: "grabbing" }}
                > 
                <DrawerContent borderRadius="1rem 1rem 0 0" pt="2rem">
                    <DrawerBody>
                        <Steps orientation="vertical" activeStep={activeStep} size='sm'>
                            {steps.map(({ label, description }, index) => (
                                <Step label={label} key={index} description={description}></Step>
                            ))}
                        </Steps>
                    </DrawerBody>
                </DrawerContent>
                </motion.div>
            </Drawer>

        </>
    )
}