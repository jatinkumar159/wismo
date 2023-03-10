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
import BrandRating from "../../components/Ratings/Brand/BrandRating"
import ShippingRating from "../../components/Ratings/Shipping/ShippingRating"
import LoginDrawer from "../../components/LoginDrawer/LoginDrawer"
import { logTrackingPageVisit } from "../../firebase"
import FullSkeleton from "../../components/Skeleton/Skeleton"

const resolveSteps = (shippingType: string, includeRefundFlow: boolean, isRtoReturned: boolean) => {
    let forwardJourneySteps = [{ label: "Confirmed" }, { label: "Shipped" }, { label: "Out for Delivery" }, { label: isRtoReturned ? "Returned" : "Delivered" }];
    let reverseJourneySteps = [];
    if(includeRefundFlow) {
        reverseJourneySteps = [{ label: "Return Created" }, { label: "Return Picked Up" }, { label: "Refund Initiated" }, { label: "Refund Complete" }, { label: "Return Completed" }];
    } else {
        reverseJourneySteps = [{ label: "Return Created" }, { label: "Return Picked Up" }, { label: "Return Completed" }];
    }

    return String(shippingType).toLowerCase().indexOf("reverse") !== -1 ? reverseJourneySteps : forwardJourneySteps
}

export default function Order() {
    const router = useRouter();
    const auth = useContext(AuthContext);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const loginDrawer = useDisclosure();
    const queryParams = QueryString.parse(router.asPath.split(/\?/)[1]);
    const [trackingId, setTrackingId] = useState<any | string>('');
    const [lastRating, setLastRating] = useState<{ brand: number, shipping: number }>({ brand: 0, shipping: 0 });
    const [data, setData] = useState<any>();
    const { isLoading, isError, data: init_data } = useQuery(['orderData', trackingId], () => fetchTracking(trackingId), {
        enabled: trackingId?.length > 0,
        staleTime: Infinity,
        refetchOnWindowFocus: false
    });

    const { data: refreshed_data } = useQuery(['refreshedTrackingData', init_data], () => fetchTracking(trackingId, init_data?.result), {
        enabled: !!(init_data?.result?.refresh_required),
        staleTime: Infinity,
        refetchOnWindowFocus: false,
    });

    useEffect(() => {
        if (queryParams && queryParams.id) {
            auth.setTrackingNumber(queryParams.id);
            setTrackingId(queryParams.id);
        }
    }, [queryParams])

    useEffect(() => {
        if (data?.result?.customer_phone) {
            auth.setPhoneNumber(data.result.customer_phone);
            logTrackingPageVisit(data.result.tenant_code, data.result.order_number, data.result.customer_phone, data.result.tracking_number);
        }
    }, [data])

    useEffect(() => {
        if (refreshed_data) setData(refreshed_data);
        else setData(init_data);
    }, [init_data, refreshed_data])

    const resolveProgressStep = (data: any, shippingType: string, includeRefundFlow: boolean): number => {
        if(String(shippingType).toLowerCase().indexOf('reverse') !== -1) {
            if(!!includeRefundFlow) {
                if(data.return_complete) return 5;
                if(data.refund_complete) return 4;
                if(data.refund_initiated) return 3;
                if(data.return_picked_up) return 2;
                if(data.return_created) return 1;
            } else {
                if(data.return_complete) return 3;
                if(data.return_picked_up) return 2;
                if(data.return_created) return 1;
            }
        } else {
            if (!!data.is_delivered) return 4;
            if (!!data.is_out_for_delivery) return 3;
            if (!!data.is_dispatched) return 2;
            if (!!data.is_shipped) return 1;
            else return 0;
        }
        return 0;
    }

    if (isLoading) return <FullSkeleton />
    if (isError) return <Center h={`calc(100vh - 40px)`}><Text as="p">Something went wrong, please try again later...</Text></Center>
    if (!data) return <Center h={`calc(100vh - 40px)`}><Spinner /></Center>

    const status = {
        statusHeading: data.result.status_heading,
        statusSubheading: data.result.status_sub_heading,
        brandLogo: data.result.brand_logo,
        currentStep: resolveProgressStep(data.result, data.result.shipment_tracking_type, data.result.include_refund_flow),
        lastUpdated: data.result.last_event_updated,
        trackingUpdates: data.result.tracking_events,
        steps: resolveSteps(data.result.shipment_tracking_type, data.result.include_refund_flow, data.result.is_rto_returned)
    };

    const details = {
        orderNumber: data.result.order_number,
        isReverseJourney: String(data.result.shipment_tracking_type).toLowerCase().indexOf('reverse') === -1 ? false : true,
        reversePickupCode: data.result.reverse_pickup_code,
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

    const banners = data.result.marketing?.banners; //[{alt: "Alt Brand Text1", src: "https://sellon.kraftly.com/srcdnm/tr:f-auto,w-360,h-240,c-maintain_ratio,pr-true/kr-shipmultichannel-mum/1538615/po_banners/fc5fa122-436d-4096-a65f-734769d763ad.jpg"}, 
    //{alt: "Alt Brand Text 2", src: "https://sellon.kraftly.com/srcdnm/tr:f-auto,w-360,h-240,c-maintain_ratio,pr-true/kr-shipmultichannel-mum/1538615/po_banners/fc5fa122-436d-4096-a65f-734769d763ad.jpg"}, 
    //{alt: "Alt Brand Text 3", src: "https://sellon.kraftly.com/srcdnm/tr:f-auto,w-360,h-240,c-maintain_ratio,pr-true/kr-shipmultichannel-mum/1538615/po_banners/fc5fa122-436d-4096-a65f-734769d763ad.jpg"}, ]

    const handleOpenRating = () => {
        if (auth.isAuthorized) onOpen();
        else loginDrawer.onOpen();
    }

    const handleLoginDrawerClose = (isAuth?: boolean | undefined) => {
        loginDrawer.onClose();
        if (isAuth) onOpen();
    }

    return (
        <>
            <Flex className={styles.container}>
                <Status isLoading={false} {...status} />
                {(!!details.delivered) ? <Flex className={styles.containerRatings} flexDir='column' gap='0.5rem' mb={4} p={4}>
                    <Text as="h3" fontSize="lg" mb={1}>How did we do?</Text>
                    <Box>
                        <BrandRating rating={lastRating.brand} setRating={handleOpenRating} alignLeft={true} />
                        <ShippingRating rating={lastRating.shipping} setRating={handleOpenRating} alignLeft={true} />
                    </Box>
                </Flex> : null}
                <Details {...details} />
                {
                    banners?.length ? <Flex align="center" pb={4} gap={4} px={4} className={styles.bannerContainer}>
                        {banners.map((el: any, i: number) => <Box key={i} className={styles.banner}><img width="100%" height="100%" src={el.src} alt={el.alt} /></Box>)}
                    </Flex> : <></>
                }
                
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
                            : <LoginPrompt context="submit feedback" />
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
                        <Ratings {...ratingsMetaData} setLastRating={setLastRating} />
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
            <LoginDrawer context="To share feedback, " isOpen={loginDrawer.isOpen} onOpen={onOpen} onClose={handleLoginDrawerClose} />
        </>
    )
}