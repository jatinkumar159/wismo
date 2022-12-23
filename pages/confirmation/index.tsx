import { ArrowForwardIcon, DeleteIcon, EditIcon, SmallAddIcon } from '@chakra-ui/icons';
import { Box, Button, Flex, IconButton, Text } from '@chakra-ui/react';
import AddressCard from './../../components/AddressCard/AddressCard';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { selectName, selectPhone, unsetPhone, unverifyProfile } from '../../redux/slices/profileSlice';
import styles from './confirmation.module.scss';
import { selectSelectedAddress, selectTurboAddressList, selectUnifillAddressList } from '../../redux/slices/addressSlice';
import Link from 'next/link';
import { selectSelectedCoupon, unsetSelectedCoupon } from '../../redux/slices/confirmationSlice';
import { useRouter } from 'next/router';
import OrderItem from '../../components/OrderItem/OrderItem';
import OrderSummary from '../../components/OrderSummary/OrderSummary';
import { setFirstLoad } from '../../redux/slices/navigationSlice';
import { FaChevronRight } from 'react-icons/fa';
import { CiDiscount1 } from 'react-icons/ci';
import Image from 'next/image';
import discountImageSrc from "../../public/discounts.png";

export default function Confirmation() {
    const phone = useAppSelector(selectPhone);
    const name = useAppSelector(selectName);
    const coupon = useAppSelector(selectSelectedCoupon);
    const dispatch = useAppDispatch();
    const selectedAddress = useAppSelector(selectSelectedAddress);
    const turboAddressList = useAppSelector(selectTurboAddressList);
    const unifillAddressList = useAppSelector(selectUnifillAddressList);
    const router = useRouter();

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

    return (
        <Flex className={`${styles.container} confirmation`} flexDir="column" height={`100%`}>
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
                            <Text>{selectedAddress?.address_line1}</Text>
                            <Text>{selectedAddress?.address_line2}</Text>
                            {selectedAddress?.mobile ? <Text mt={2}>Mobile: +91 {selectedAddress?.mobile}</Text> : null}
                        </Box>
                        <Box>
                            <Link href="/addresses">
                                <Text as="span" fontSize="xs" fontWeight="bold" color="pink.400" cursor={`pointer`}>Change</Text>
                            </Link>
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

            <Box className={styles.section} mt={2}>
                {
                    !coupon && <Box className={styles.section} pt={3} pb={3} pl={4} pr={4}>
                        <Link href='/discounts'>
                            <Flex flexDir="row" className={`${styles.sectionContent} coupon-section`} justifyContent="space-between" alignItems={'center'}>
                                <Box flexGrow={1}>
                                    <Text w="100%" alignItems="center" lineHeight="1">
                                        <Flex flexDir="row" align="center">
                                                <Image className={styles.discountIcon} src={discountImageSrc} alt={'discount'} />
                                                <Text as="span" fontWeight="bold" ms={2}>Apply Coupon</Text>
                                        </Flex>
                                    </Text>
                                </Box>

                                <Box>
                                    <Text><FaChevronRight /></Text>
                                </Box>
                            </Flex>

                        </Link>
                    </Box>
                }

                {coupon ? (
                    <Box className={styles.section} pt={3} pb={3} pl={4} pr={4}>
                        <Flex className={`${styles.sectionContent} coupon-section`} justifyContent="space-between" alignItems={'center'}>
                            <Flex flexDir="column" justifyContent="space-between" >
                                <Text as="span" fontWeight="bold" color={`gray.500`} fontSize="sm">{coupon.code}</Text>
                                <Text as="span" fontWeight="bold" color={"green.400"} fontSize="xs" >₹{coupon.discountAmount}</Text>
                            </Flex>
                            <IconButton size="sm" icon={<DeleteIcon />} bg={'black'} _hover={{ bg: 'black' }} color="white" aria-label={'Close'} onClick={() => dispatch(unsetSelectedCoupon())} />
                        </Flex>
                    </Box>
                ) : null}
            </Box>

            <Box className={styles.section} mt={2}>
                <Flex className={styles.sectionTitle} flexDir="row" alignItems="center" justifyContent="space-between" p={4}>
                    <Text as="span" fontWeight="bold">Price Details</Text>
                </Flex>
            </Box>

            <Box className={`${styles.section} ${styles.orderSummaryContainer}`} mt={2}>
                <Box className={`${styles.sectionContent} order-summary`} mb={4}>
                    <Text as="p" mt={2} mb={4}>Order Summary</Text>


                    <OrderItem />
                    <OrderSummary mode={'md'} />
                </Box>
            </Box>

            <Box>
                <Box className={styles.section}>
                    <Box className={`${styles.sectionContent} mobile-section`} mt={2} mb={2}>
                        <Text>Pay via</Text>
                    </Box>
                </Box>
                <Flex borderBottom={`1px solid var(--chakra-colors-gray-200)`} ps={4} pe={4} pt={2} pb={2} className={`${styles.sectionContent} coupon-section`} justifyContent="space-between" alignItems={'center'}>
                    <Flex flexDir="column" justifyContent="space-between" >
                        <Text as="span" fontWeight="bold" color={`gray.500`} fontSize="sm">Cash on Delivery</Text>
                    </Flex>
                    <IconButton size="sm" icon={<ArrowForwardIcon />} bg={'black'} _hover={{ bg: 'black' }} color="white" aria-label={'Close'} />
                </Flex>

                <Flex borderBottom={`1px solid var(--chakra-colors-gray-200)`} ps={4} pe={4} pt={2} pb={2} className={`${styles.sectionContent} coupon-section`} justifyContent="space-between" alignItems={'center'}>
                    <Flex flexDir="column" justifyContent="space-between" >
                        <Text fontWeight="bold" color={`gray.500`} fontSize="sm">UPI</Text>
                        <Text as="span" fontWeight="bold" color={`green.400`} fontSize="xs">5% off using UPI</Text>
                    </Flex>
                    <IconButton size="sm" icon={<ArrowForwardIcon />} bg={'black'} _hover={{ bg: 'black' }} color="white" aria-label={'Close'} />
                </Flex>

                <Flex ps={4} pe={4} pt={2} pb={2} className={`${styles.sectionContent} coupon-section`} justifyContent="space-between" alignItems={'center'}>
                    <Flex flexDir="column" justifyContent="space-between" >
                        <Text fontWeight="bold" color={`gray.500`} fontSize="sm">Prepaid</Text>
                        <Text as="span" fontWeight="bold" color={`gray.500`} fontSize="xs">Net Banking, Credit/Debit Card</Text>
                    </Flex>
                    <IconButton size="sm" icon={<ArrowForwardIcon />} bg={'black'} _hover={{ bg: 'black' }} color="white" aria-label={'Close'} />
                </Flex>

            </Box>
        </Flex>
    )
}