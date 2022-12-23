import { ArrowForwardIcon, DeleteIcon, EditIcon, SmallAddIcon } from '@chakra-ui/icons';
import { Avatar, AvatarGroup, Box, Button, Flex, IconButton, Text } from '@chakra-ui/react';
import AddressCard from './../../components/AddressCard/AddressCard';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { selectName, selectPhone, unsetPhone, unverifyProfile } from '../../redux/slices/profileSlice';
import styles from './confirmation.module.scss';
import { selectSelectedAddress, selectTurboAddressList, selectUnifillAddressList } from '../../redux/slices/addressSlice';
import Link from 'next/link';
import { selectSelectedCoupon, unsetSelectedCoupon } from '../../redux/slices/confirmationSlice';
import { useRouter } from 'next/router';
import OrderItemsList from '../../components/OrderItemsList/OrderItemsList';
import OrderSummary from '../../components/OrderSummary/OrderSummary';
import { setFirstLoad } from '../../redux/slices/navigationSlice';
import { FaChevronRight } from 'react-icons/fa';
import { BsBagCheckFill } from 'react-icons/bs';
import Image from 'next/image';
import discountImageSrc from "../../images/discounts.svg";
import upiMethodsSrc from "../../images/upiMethods.svg";
import cash from "../../images/cash.svg";
import cards from "../../images/cards.svg";
import upi from "../../images/upi.svg";
import { useState } from 'react';
import { selectCartPayload } from '../../redux/slices/settingsSlice';
import imageLoader from '../../utils/imageLoader';

export default function Confirmation() {
    const phone = useAppSelector(selectPhone);
    const name = useAppSelector(selectName);
    const coupon = useAppSelector(selectSelectedCoupon);
    const dispatch = useAppDispatch();
    const selectedAddress = useAppSelector(selectSelectedAddress);
    const turboAddressList = useAppSelector(selectTurboAddressList);
    const unifillAddressList = useAppSelector(selectUnifillAddressList);
    const router = useRouter();
    const [showItemDetails, setShowItemDetails] = useState(false);
    const cartPayload = useAppSelector(selectCartPayload);

    const handleChangeMobile = () => {
        dispatch(unsetPhone());
        dispatch(unverifyProfile());
        router.push('/new-address');
    }

    const redirectToAddresses = () => {
        dispatch(setFirstLoad('addresses'));
        router.push('/addresses');
    }

    const handleChangeNumber = () => {
        dispatch(unsetPhone());
        router.push("/profile");
    }

    const handleToggleItemDetails = () => {
        setShowItemDetails(!showItemDetails);
    }

    return (
        <Flex className={`${styles.container} confirmation`} flexDir="column">
            <Box onClick={handleChangeNumber}>
                <Flex className={styles.section} ps={4} pe={4} pt={2} pb={2} align={`center`}>
                    <Box className={`${styles.sectionContent}`} flexGrow={1}>
                        <Text fontWeight={`normal`}>Your number <Text as="span" ms={4} fontWeight={`bold`}>{phone}</Text></Text>
                    </Box>
                    <Box>
                        <Text><FaChevronRight /></Text>
                    </Box>
                </Flex>
            </Box>

            <Box className={styles.section} mt={2}>
                <Box className={`${styles.sectionContent} delivery-section`} mb={2} p={4}>
                    <Flex flexDir="row" w="100%" align="flex-start">
                        <Box flexGrow={1}>
                            <Text>Deliver to <Text as="span" fontWeight="bold">{selectedAddress?.name}, {selectedAddress?.pincode || ''}</Text></Text>
                            <Text mt={2} fontSize="xs">{selectedAddress?.address_line1}</Text>
                            <Text fontSize="xs" >{selectedAddress?.address_line2}</Text>
                            {selectedAddress?.mobile ? <Text mt={2} fontSize="xs">Mobile: +91 {selectedAddress?.mobile}</Text> : null}
                        </Box>
                        <Box>
                            <Text onClick={redirectToAddresses} as="span" fontSize="xs" fontWeight="bold" color="pink.400" cursor={`pointer`}>Change</Text>
                        </Box>
                    </Flex>
                </Box>

                {/* <Text mb={2} className={styles.moreAddresses} onClick={redirectToAddresses} cursor='pointer'>
                    <SmallAddIcon /> {(turboAddressList?.length || 0) + (unifillAddressList?.length || 0) - (selectedAddress ? 1 : 0)} more addresses found
                    {/* <Link href="/addresses"><SmallAddIcon /> </Link> 
                </Text>
                <Text mb={2} className={styles.newAddress}>
                    <Link href="/new-address"> <SmallAddIcon /> Add new delivery address</Link>
                    {/* <Button size="xs" color="white" background="black" _hover={{bg:'black'}}> <SmallAddIcon />Add new delivery address</Button> 
                </Text> */}
            </Box>

            {!coupon ? <Box className={styles.section} mt={2} p={4}>
                <Link href='/discounts'>
                    <Flex flexDir="row" className={`${styles.sectionContent} coupon-section`} justifyContent="space-between" alignItems={'center'}>
                        <Box flexGrow={1}>
                            <Flex flexDir="row" alignItems="center">
                                <Text w="100%" alignItems="center" lineHeight="1">
                                    <Image loader={imageLoader} className={styles.discountIcon} src={discountImageSrc} alt={'discount'} />
                                    <Text as="span" fontWeight="bold" ms={2}>Apply Coupon</Text>
                                </Text>
                            </Flex>
                        </Box>

                        <Box>
                            <Text><FaChevronRight /></Text>
                        </Box>
                    </Flex>
                </Link>
            </Box> : null
            }

            {coupon ? <Box className={styles.section} mt={2} p={4}>
                <Flex className={`${styles.sectionContent} coupon-section`} justifyContent="space-between" alignItems={'center'}>
                    <Flex flexDir="column" justifyContent="space-between" >
                        <Text as="span" fontWeight="bold" color={`gray.500`} fontSize="sm">{coupon.code}</Text>
                        <Text as="span" fontWeight="bold" color={"green.400"} fontSize="xs" >₹{coupon.discountAmount}</Text>
                    </Flex>
                    <IconButton size="sm" icon={<DeleteIcon />} bg={'black'} _hover={{ bg: 'black' }} color="white" aria-label={'Close'} onClick={() => dispatch(unsetSelectedCoupon())} />
                </Flex>
            </Box> : null
            }

            <Box className={styles.section} mt={2}>
                <Flex className={styles.sectionTitle} flexDir="row" alignItems="center" justifyContent="space-between" p={4}>
                    <Box flexGrow={1}>
                        <Text as="span" fontWeight="bold">Price Details</Text>
                    </Box>
                    <Box onClick={handleToggleItemDetails} textAlign={`right`}>
                        {/* <Box className={styles.itemAvatarGroups}> */}
                        <AvatarGroup size="sm" max={2}>
                            {
                                cartPayload.items.map((avatar: any, avatarIdx: any) => {
                                    return <Avatar icon={<BsBagCheckFill fontSize={`14px`}/>} fontSize='1.5rem' key={`avatar-${avatarIdx}`} src={avatar.image || null} />
                                })
                            }
                        </AvatarGroup>
                    </Box>
                    <Box ms={2} onClick={handleToggleItemDetails} >
                        <Text as="span" fontWeight="700" fontSize="xs" color="pink.400">{showItemDetails ? 'Hide Items' : 'View Items'}</Text>
                    </Box>
                </Flex>
                <Box className={styles.sectionBody}>
                    { showItemDetails ? <OrderItemsList /> : null}
                </Box>
                <Box className={styles.sectionBody}>
                    <OrderSummary mode={'sm'} />
                </Box>
            </Box>

            {/* <Box className={`${styles.section} ${styles.orderSummaryContainer}`} mt={2}>
                <Box className={`${styles.sectionContent} order-summary`} mb={4}>
                    <OrderItem />
                    <OrderSummary mode={'md'} />
                </Box>
            </Box> */}

            <Flex className={styles.pageTitle} mt={2} ps={4} pe={4}>
                <Text fontWeight={`700`}>Pay via</Text>
            </Flex>

            <Box className={styles.section} mt={2}>
                <Box px={4} py={2}>
                    <Flex flexDir="row" align="center">
                        <Box flexGrow={1}>
                            <Text as="span" fontSize={`sm`} className={styles.paymentMethod}><Image loader={imageLoader} className={styles.paymentMethod} src={upi} alt="upi"/>UPI</Text>
                            <Text mt={1} fontSize={`xs`} color={`green.400`}>Additional 10% off</Text>
                        </Box>
                        <Box>
                            <Image loader={imageLoader} className={styles.upiMethods} src={upiMethodsSrc} alt={'upi methods'} />
                        </Box>
                    </Flex>
                </Box>
            </Box>

            <Box className={styles.section} mt={2}>
                <Box px={4} py={2}>
                    <Flex flexDir="row" align="center">
                        <Box flexGrow={1}>
                            <Text as="span" fontSize={`sm`} className={styles.paymentMethod}><Image loader={imageLoader} className={styles.paymentMethod} src={cards} alt="cards"/>Cards/Net Banking/Wallets/Pay Later</Text>
                            <Text mt={1} fontSize={`xs`} color={`green.400`}>Additional 10% off</Text>
                        </Box>
                        {/* <Box>
                            <Image loader={imageLoader} className={styles.upiMethods} src={upiMethodsSrc} alt={'upi methods'} />
                        </Box> */}
                    </Flex>
                </Box>
            </Box>

            <Box className={styles.section} mt={2}>
                <Box px={4} py={2}>
                    <Flex flexDir="row" align="center">
                        <Box flexGrow={1}>
                            <Text as="span" fontSize={`sm`} className={styles.paymentMethod}><Image loader={imageLoader} className={styles.paymentMethod} src={cash} alt="cash"/>Cash on Delivery</Text>
                            <Text mt={1} fontSize={`xs`} color={`gray.800`}>Extra charge ₹20</Text>
                        </Box>
                        {/* <Box>
                            <Image loader={imageLoader} className={styles.upiMethods} src={upiMethodsSrc} alt={'upi methods'} />
                        </Box> */}
                    </Flex>
                </Box>
            </Box>
            <Box flexGrow={1}></Box>
            <Box className={styles.pageFooter} mt={2}>
                <Text p={2} fontSize={`sm`} textAlign={`center`}>Powered by <Link href={`https://unicommerce.com`}><Text as="span" color={`blue.300`}>TURBO</Text></Link></Text>
            </Box>
        </Flex>
    )
}