import { ArrowForwardIcon, DeleteIcon, EditIcon, SmallAddIcon } from '@chakra-ui/icons';
import { Box, Button, Flex, IconButton, Link, Text } from '@chakra-ui/react';
import AddressCard from './../../components/AddressCard/AddressCard';
import { useAppSelector } from '../../redux/hooks';
import { selectPhone, unsetPhone, unverifyProfile } from '../../redux/slices/profileSlice';
import styles from './confirmation.module.scss';
import { selectSelectedAddress } from '../../redux/slices/addressSlice';
import Router, { useRouter } from "next/router";
import { useAppDispatch } from './../../redux/hooks';
import OrderItem from '../../components/OrderItem/OrderItem';
import OrderSummary from '../../components/OrderSummary/OrderSummary';

export default function Confirmation() {
    const phone = useAppSelector(selectPhone);
    const selectedAddress = useAppSelector(selectSelectedAddress);
    const router = useRouter();
    const dispatch = useAppDispatch();

    const handleChangeMobile = () => {
        dispatch(unsetPhone());
        dispatch(unverifyProfile());
        router.push('/new-address')
    }

    return (
        <Box className={`${styles.container} confirmation`}>
            <Box className={styles.section}>
                <div className={`mobile-section`}>
                    <p>Creating an order with <span className={styles.mobileNumber}>{phone}</span>
                        <IconButton icon={<EditIcon />} aria-label={'Edit mobile'} background={'transparent'} _hover={{ bg: 'transparent' }} onClick={handleChangeMobile}/></p>
                </div>
            </Box>

            <Box className={styles.section}>
                <Box className={`${styles.sectionContent} delivery-section`} mb={4}>
                    <p>Delivery Address</p>
                </Box>
                <Box mb={4}>
                    <AddressCard address={selectedAddress} />
                </Box>

                <Text mb={2} className={styles.moreAddresses}>
                    <Link href="/addresses"><SmallAddIcon /> 2 more addresses</Link>
                </Text>
                <Text mb={2} className={styles.newAddress}>
                    <Link href="/new-address"> <SmallAddIcon />Add new delivery address</Link>
                    {/* <Button size="xs" color="white" background="black" _hover={{bg:'black'}}> <SmallAddIcon />Add new delivery address</Button> */}
                </Text>
            </Box>

            <Box className={styles.section} pt={3} pb={3} pl={4} pr={4}>
                <Flex className={`${styles.sectionContent} coupon-section`} justifyContent="space-between" alignItems={'center'}>
                    <Text lineHeight={2} alignItems="center">Have a coupon?</Text>
                    <Button borderRadius={4} size='sm' color="white" background="black" _hover={{ bg: 'black' }}>Apply</Button>
                </Flex>
            </Box>

            <Box className={styles.section} pt={3} pb={3} pl={4} pr={4}>
                <Flex className={`${styles.sectionContent} coupon-section`} justifyContent="space-between" alignItems={'center'}>
                    <Flex flexDir="column" justifyContent="space-between" >
                        <Text as="span" fontWeight="bold" color={`gray.500`} fontSize="xs">WORLDCUP2022</Text>
                        <Text as="span" fontWeight="bold" color={"green.400"} fontSize="xs" >₹500 off</Text>
                    </Flex>
                    <IconButton size="sm" icon={<DeleteIcon />} bg={'black'} _hover={{ bg: 'black' }} color="white" aria-label={'Close'} />
                </Flex>
            </Box>

            <Box className={`${ styles.section } ${ styles.orderSummaryContainer}`}>
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
                        <Text as="span" fontWeight="bold" color={`gray.500`} fontSize="xs">Cash on Delivery</Text>
                    </Flex>
                    <IconButton size="sm" icon={<ArrowForwardIcon />} bg={'black'} _hover={{ bg: 'black' }} color="white" aria-label={'Close'} />
                </Flex>

                <Flex ps={4} pe={4} pt={2} pb={2} className={`${styles.sectionContent} coupon-section`} justifyContent="space-between" alignItems={'center'}>
                    <Flex flexDir="column" justifyContent="space-between" >
                        <Text as="span" fontWeight="bold" color={`gray.500`} fontSize="xs">Credit / Debit Card</Text>
                    </Flex>
                    <IconButton size="sm" icon={<ArrowForwardIcon />} bg={'black'} _hover={{ bg: 'black' }} color="white" aria-label={'Close'} />
                </Flex>

            </Box>
        </Box>
    )
}