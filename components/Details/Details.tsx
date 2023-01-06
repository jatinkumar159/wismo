import { ChevronRightIcon, CloseIcon, CopyIcon } from "@chakra-ui/icons"
import { Avatar, AvatarGroup, Box, Button, Divider, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, Flex, HStack, Icon, PinInput, PinInputField, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverFooter, PopoverHeader, PopoverTrigger, Portal, Text, useDisclosure } from "@chakra-ui/react"
import styles from "./Details.module.scss"
import { MdLocationPin } from 'react-icons/md'
import { FaTruckMoving } from 'react-icons/fa'
import { BsBagCheckFill, BsHeadphones } from 'react-icons/bs'
import { motion } from "framer-motion"
import ItemList from "../ItemList/ItemList"

interface OrderDetailProps {
    orderNumber: string;
    deliveryAddress: string;
    trackingNumber: string;
    shippingProvider: string;
    items: any[];
    deliveryCity: string;
    deliveryStateCode: string;
}
export default function Details(props: OrderDetailProps) {
    const modal = useDisclosure();
    const popover = useDisclosure();
    
    const handleOnCopy = (text: string) => {
        setTimeout(() => {
            return popover.onClose()
        }, 1500);
        return navigator.clipboard.writeText(text);
    }

    return (
        <>
            <Flex className={styles.container} flexDir='column' gap='0.5rem' mb={4} p={4}>
                <Text as="h3" fontSize="lg">Order Details</Text>
                <Flex justifyContent='space-between' alignItems='center'>
                <Box>
                    <Text fontSize="sm" className={styles.lightText}>Order number:&nbsp;<Text as="span" className={styles.darkText}>{props.orderNumber}</Text></Text>
                </Box>
                <Box display="inline-flex" alignItems="center" onClick={modal.onOpen}>
                    <Box>
                        <AvatarGroup size='sm' max={2} spacing="-0.375rem">
                            <Avatar icon={<BsBagCheckFill fontSize={`14px`} />}></Avatar>
                            <Avatar icon={<BsBagCheckFill fontSize={`14px`} />}></Avatar>
                            <Avatar icon={<BsBagCheckFill fontSize={`14px`} />}></Avatar>
                            <Avatar icon={<BsBagCheckFill fontSize={`14px`} />}></Avatar>
                        </AvatarGroup>
                    </Box>
                    <Box>
                        <ChevronRightIcon w='1.5rem' h='1.5rem' />
                    </Box>
                </Box>
                </Flex>
                <Box>
                    <HStack>
                        <Icon as={MdLocationPin} fontSize="md" mr={2} color="var(--wismo-colors-text)"/>
                            <Text as='span'>{`${props.deliveryCity}, ${props.deliveryStateCode}`}</Text>
                        {/* <Box>
                            <Text as="p" className={styles.lightText} fontSize="sm">&nbsp;</Text>
                        </Box> */}
                    </HStack>
                </Box>
                <Divider my={1}/>
                <Box>
                    <HStack>
                    <Icon as={FaTruckMoving} fontSize="md" mr={2} color="var(--wismo-colors-text)"></Icon>
                    <Box>
                        <Text>{props.shippingProvider}</Text>
                        <HStack>
                            <Text as="p" className={styles.lightText} fontSize="xs">Tracking ID: <Text as="span" className={styles.darkText}>{props.trackingNumber}</Text></Text>  
                            <Popover variant="responsive" isOpen={popover.isOpen} onOpen={popover.onOpen} onClose={popover.onClose}>
                            <PopoverTrigger>
                                <CopyIcon fontSize="xs" onClick={() => handleOnCopy(props.trackingNumber)}/>
                            </PopoverTrigger>
                            <Portal>
                                <PopoverContent>
                                    <PopoverArrow />
                                    <PopoverBody>
                                        <Text as="p" fontSize="xs">Copied!</Text>
                                    </PopoverBody>
                                </PopoverContent>
                            </Portal>
                            </Popover>
                        </HStack>
                    </Box>
                    </HStack>
                </Box>
                <Divider my={1} />
                <Box justifyContent='space-between'>
                    <HStack>
                        <Icon as={BsHeadphones} fontSize="md" mr={2} color="var(--wismo-colors-text)"></Icon>
                        <Box>
                            <Text>Need Help?</Text>
                            <Text as="p" fontSize="xs" className={styles.lightText}>Raise a ticket</Text>
                        </Box>
                        <Box flexGrow={1} textAlign="right">
                            <ChevronRightIcon w='1.5rem' h='1.5rem' />
                        </Box>
                    </HStack>
                </Box>
            </Flex>
            <Drawer placement="bottom" onClose={modal.onClose} isOpen={modal.isOpen}>
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
                > */}
                    <DrawerContent borderRadius="1rem 1rem 0 0">
                        <DrawerHeader pl={4} pt={4} pr={4} pb={2}>
                        <HStack>
                            <Icon as={MdLocationPin} />
                            <Text as="p" fontSize="sm" fontWeight={`normal`} pr={6}>{props.deliveryAddress}</Text>
                        </HStack>
                            <CloseIcon w="0.75rem" h="0.75rem" onClick={modal.onClose} position="absolute" top="1.25rem" right="1.25rem"/>
                        </DrawerHeader>
                        <DrawerBody>
                            <ItemList items={props.items}/>
                        </DrawerBody>
                    </DrawerContent>
                {/* </motion.div> */}
            </Drawer>
        </>
    )
}