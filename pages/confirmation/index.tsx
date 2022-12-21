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

    return (
        <Box className={`${styles.container} confirmation`}>
            <Box className={styles.section}>
                <div className={`mobile-section`}>
                    <p>Creating an order with <span className={styles.mobileNumber}>{name ? name + ' - ' : ''}{phone}</span>
                        <IconButton icon={<EditIcon />} aria-label={'Edit mobile'} background={'transparent'} _hover={{ bg: 'transparent' }} onClick={handleChangeMobile} /></p>
                </div>
            </Box>

            <Box className={styles.section}>
                <Box className={`${styles.sectionContent} delivery-section`} mb={4}>
                    <p>Delivery Address</p>
                </Box>
                <Box className={styles.card} mb={4}>
                    <AddressCard address={selectedAddress} isInForm={false} />
                </Box>

                <Text mb={2} className={styles.moreAddresses} onClick={redirectToAddresses} cursor='pointer'>
                    <SmallAddIcon /> {(turboAddressList?.length || 0) + (unifillAddressList?.length || 0) - (selectedAddress ? 1 : 0)} more addresses found
                    {/* <Link href="/addresses"><SmallAddIcon /> </Link> */}
                </Text>
                <Text mb={2} className={styles.newAddress}>
                    <Link href="/new-address"> <SmallAddIcon /> Add new delivery address</Link>
                    {/* <Button size="xs" color="white" background="black" _hover={{bg:'black'}}> <SmallAddIcon />Add new delivery address</Button> */}
                </Text>
            </Box>

            {
                !coupon && <Box className={styles.section} pt={3} pb={3} pl={4} pr={4}>
                    <Flex className={`${styles.sectionContent} coupon-section`} justifyContent="space-between" alignItems={'center'}>
                        <Text lineHeight={2} alignItems="center">Have a coupon?</Text>
                        <Link href='/discounts'>
                            <Button borderRadius={4} size='sm' color="white" background="black" _hover={{ bg: 'black' }}>Apply</Button>
                        </Link>
                    </Flex>
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

            <Box className={`${styles.section} ${styles.orderSummaryContainer}`}>
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
        </Box>
    )
}