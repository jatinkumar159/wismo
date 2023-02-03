import { ChevronRightIcon, CloseIcon, CopyIcon } from "@chakra-ui/icons"
import { Avatar, AvatarGroup, Box, Button, Divider, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, Flex, HStack, Icon, PinInput, PinInputField, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverFooter, PopoverHeader, PopoverTrigger, Portal, Text, useDisclosure } from "@chakra-ui/react"
import styles from "./Details.module.scss"
import { MdLocationPin } from 'react-icons/md'
import { FaRupeeSign, FaTruckMoving, FaTshirt } from 'react-icons/fa'
import { BsBagCheckFill, BsBagDashFill, BsBagFill, BsHeadphones } from 'react-icons/bs'
import { motion } from "framer-motion"
import ItemList from "../ItemList/ItemList"
import { useContext, useEffect } from "react"
import { AuthContext } from "../AuthProvider/AuthProvider"
import LoginDrawer from "../LoginDrawer/LoginDrawer"
import BrandRating from "../Ratings/Brand/BrandRating"
import ShippingRating from "../Ratings/Shipping/ShippingRating"
import LoginPrompt from "../LoginPrompt/LoginPrompt"

interface OrderDetailProps {
    orderNumber: string;
    deliveryAddress: string;
    trackingNumber: string;
    shippingProvider: string;
    items: any[];
    deliveryCity: string;
    deliveryStateCode: string;
    paymentMethod: string;
    delivered: boolean;
    modalOpener: Function;
}
export default function Details(props: OrderDetailProps) {
    const modal = useDisclosure();
    const login = useDisclosure();
    const popover = useDisclosure();
    const auth = useContext(AuthContext);

    const handleOnCopy = (text: string) => {
        setTimeout(() => {
            return popover.onClose()
        }, 1500);
        return navigator.clipboard.writeText(text);
    }

    const handleLoginClose = (isAuth?: boolean) => {
        login.onClose();
        if (isAuth) modal.onOpen();
    }

    return (
        <>
            <Flex className={styles.container} flexDir='column' gap='0.5rem' mb={4} p={4}>
                <Text as="h3" fontSize="lg" mb={1}>Order Details</Text>
                <Box>
                    <HStack>
                        <Icon as={BsBagFill} fontSize="md" mr={2} color="var(--wismo-colors-text)"></Icon>
                        <Box>
                            <Text>Order number</Text>
                            <HStack>
                                <Text as="p" fontSize="sm" className={styles.lightText}>{props.orderNumber}</Text>
                            </HStack>
                        </Box>
                    </HStack>
                </Box>
                <Divider my={1} />
                <Flex justifyContent='space-between' alignItems='center' onClick={auth.isAuthorized ? modal.onOpen : login.onOpen}>
                    <HStack>
                        <Icon as={FaTshirt} fontSize="md" mr={2} color="var(--wismo-colors-text)" />
                        <Text fontSize="sm">Order Items</Text>
                    </HStack>
                    <Box display="inline-flex" alignItems="center" onClick={auth.isAuthorized ? modal.onOpen : login.onOpen}>
                        <Flex align={`center`}>
                            <Flex align={`center`}>
                                {
                                    auth.isAuthorized ? <AvatarGroup size='sm' max={2} spacing="-0.375rem">
                                        {props.items.map((el, i) => {
                                            return <Avatar key={i} icon={<BsBagCheckFill fontSize={`14px`} />}></Avatar>
                                        })}

                                        {/* <Avatar icon={<BsBagCheckFill fontSize={`14px`} />}></Avatar>
                                    <Avatar icon={<BsBagCheckFill fontSize={`14px`} />}></Avatar>
                                    <Avatar icon={<BsBagCheckFill fontSize={`14px`} />}></Avatar> */}
                                    </AvatarGroup>
                                        : null}
                            </Flex>
                            <ChevronRightIcon w='1.5rem' h='1.5rem' />
                        </Flex>
                    </Box>
                </Flex>
                <Divider my={1} />
                <Flex flexDir={`row`} justify={`space-between`} align="center">
                    <Box>
                        <HStack>
                            <Icon as={FaRupeeSign} fontSize="md" mr={2} color="var(--wismo-colors-text)"></Icon>
                            <Flex flexDir="column" alignItems="flex-start">
                                <Text>Payment Method</Text>
                                <HStack>
                                    <Text as="p" fontSize="sm" className={styles.lightText}>{props.paymentMethod}</Text>
                                </HStack>
                            </Flex>
                        </HStack>
                    </Box>
                    <Flex>
                        {auth.isAuthorized ? <Text as="span" mr={2}>₹ {(props.items.reduce((a, b) => a + parseInt(b.total_price, 10), 0)).toFixed(2)}</Text> : <ChevronRightIcon w='1.5rem' h='1.5rem' />}
                    </Flex>
                </Flex>
            </Flex>
            <Flex className={styles.container} flexDir='column' gap='0.5rem' mb={4} p={4}>
                <Text as="h3" fontSize="lg" mb={1}>Courier Details</Text>
                <Flex flexDir="column" alignItems="flex-start">
                    <HStack>
                        <Icon as={MdLocationPin} fontSize="md" mr={2} color="var(--wismo-colors-text)" />
                        <Text as='span'>{`${props.deliveryCity}, ${props.deliveryStateCode}`}</Text>
                        {/* <Box>
                            <Text as="p" className={styles.lightText} fontSize="sm">&nbsp;</Text>
                        </Box> */}
                    </HStack>
                </Flex>
                <Divider my={1} />
                <Box>
                    <HStack>
                        <Icon as={FaTruckMoving} fontSize="md" mr={2} color="var(--wismo-colors-text)"></Icon>
                        <Flex flexDir="column" alignItems="flex-start">
                            <Text>{props.shippingProvider}</Text>
                            <HStack>
                                <Text as="p" className={styles.lightText} fontSize="xs">Tracking ID: <Text as="span" className={styles.darkText}>{props.trackingNumber}</Text></Text>
                                <Popover variant="responsive" isOpen={popover.isOpen} onOpen={popover.onOpen} onClose={popover.onClose}>
                                    <PopoverTrigger>
                                        <CopyIcon cursor="pointer" fontSize="xs" onClick={() => handleOnCopy(props.trackingNumber)} />
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
                        </Flex>
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
                    {auth.isAuthorized ? <DrawerHeader pl={4} pt={4} pr={4} pb={2}>
                        <HStack>
                            <Icon as={MdLocationPin} />
                            <Text as="p" fontSize="sm" fontWeight={`normal`} pr={6}>{props.deliveryAddress}</Text>
                        </HStack>
                        <CloseIcon w="0.75rem" h="0.75rem" onClick={modal.onClose} position="absolute" top="1.25rem" right="1.25rem" />
                    </DrawerHeader> : null}
                    <DrawerBody>
                        {auth.isAuthorized ? <ItemList items={props.items} /> : <LoginPrompt context={"test"} />}
                    </DrawerBody>
                </DrawerContent>
                {/* </motion.div> */}
            </Drawer>
            <LoginDrawer context="To view order items, " onOpen={login.onOpen} isOpen={login.isOpen} onClose={handleLoginClose} />
        </>
    )
}