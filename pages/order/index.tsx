import { Box, Button, Center, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, Flex, HStack, PinInput, PinInputField, Spinner, Text, useDisclosure } from "@chakra-ui/react"
import { useRouter } from "next/router"
import Details from "../../components/Details/Details"
import Status from "../../components/Status/Status"
import styles from "./order.module.scss"
import QueryString from 'query-string'
import { useQuery } from "@tanstack/react-query"
import { fetchTracking } from "../../apis/post"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../components/AuthProvider/AuthProvider"
import LoginPrompt from "../../components/LoginPrompt/LoginPrompt"
import { CloseIcon, ChevronRightIcon, Icon } from "@chakra-ui/icons"
import Ratings from "../../components/Ratings/Ratings"
import { BsHeadphones } from "react-icons/bs"

export default function Order() {
    const router = useRouter();
    const auth = useContext(AuthContext);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const queryParams = QueryString.parse(router.asPath.split(/\?/)[1]);
    const [trackingId, setTrackingId] = useState<any | string>('');
    const { isLoading, isError, data } = useQuery([trackingId], () => fetchTracking(trackingId), {
        enabled: trackingId?.length > 0,
        staleTime: Infinity,
        refetchOnWindowFocus: false
    });

    useEffect(() => {
        if (queryParams && queryParams.id) {
            auth.setTrackingNumber(queryParams.id);
            setTrackingId(queryParams.id);
        }
    }, [queryParams]);

    useEffect(() => {
        if (data?.result?.customer_phone)
            auth.setPhoneNumber(data.result.customer_phone);
    }, [data])

    const resolveProgressStep = (data: any): number => {
        if (!!data.is_delivered) return 4;
        if (!!data.is_out_for_delivery) return 3;
        if (!!data.is_dispatched) return 2;
        if (!!data.is_shipped) return 1;
        else return 0;
    }

    if (isLoading) return <Center h={`100%`}><Spinner /></Center>
    if (isError) return <Center h={`100%`}><Text as="p">Something went wrong, please try again later...</Text></Center>

    const status = {
        statusHeading: data.result.status_heading,
        statusSubheading: data.result.status_sub_heading,
        currentStep: resolveProgressStep(data.result),
        lastUpdated: data.result.last_event_updated,
        trackingUpdates: data.result.tracking_events
    };

    const details = {
        orderNumber: data.result.order_number,
        deliveryAddress: data.result.delivery_address,
        trackingNumber: data.result.tracking_number,
        shippingProvider: data.result.shipping_source_code,
        items: Object.values(data.result.line_items),
        deliveryCity: data.result.delivery_city,
        deliveryStateCode: data.result.delivery_state_code,
        paymentMethod: data.result.payment_method,
        delivered: data.result.is_delivered,
        modalOpener: onOpen
    };

    const ratingsMetaData = {
        phone: data.result.customer_phone,
        trackingNumber: data.result.tracking_number,
        tenant: data.result.tenant_code,
        closeDrawer: onClose
    }

    return (
        <>
            <Flex className={styles.container}>
                <Status {...status} />
                <Details {...details} />
                <Box flexGrow={1}>
                    {
                        auth.isAuthorized ? (<Box justifyContent='space-between'>
                            <HStack bgColor={`white`} py={2} px={4} onClick={onOpen} cursor="pointer">
                                <Icon as={BsHeadphones} fontSize="md" mr={2} color="var(--wismo-colors-text)"></Icon>
                                <Box>
                                    <Text>Rate us</Text>
                                    <Text as="p" fontSize="xs" className={styles.lightText}>Share feedback</Text>
                                </Box>
                                <Box flexGrow={1} textAlign="right">
                                    <ChevronRightIcon w='1.5rem' h='1.5rem' />
                                </Box>
                            </HStack>
                        </Box>)
                            : <LoginPrompt context="submit feedback"/>
                    }
                </Box>
            </Flex>
            <Drawer placement="bottom" onClose={onClose} isOpen={isOpen}>
                <DrawerOverlay />
                <DrawerContent borderRadius="1rem 1rem 0 0">
                    <DrawerHeader marginLeft="auto">
                        <CloseIcon w="1rem" h="1rem" onClick={onClose} />
                    </DrawerHeader>
                    <DrawerBody>
                        <Ratings {...ratingsMetaData} />
                    </DrawerBody>
                </DrawerContent>
            </Drawer>

        </>
    )
}