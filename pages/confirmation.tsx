import { EditIcon, SmallAddIcon } from '@chakra-ui/icons';
import { Box, Button, Flex, IconButton, Link, Text } from '@chakra-ui/react';
import AddressCard from './components/AddressCard/AddressCard';
import styles from './confirmation/confirmation.module.scss';

export default function Confirmation() {
    return (
        <Box className={`${styles.container} confirmation`}>
            <Box className={styles.section}>
                <div className={`${styles.sectionContent} mobile-section`}>
                    <p>Creating an order with <span className={styles.mobileNumber}>+91 9654723413</span>
                    <IconButton icon={<EditIcon/>} aria-label={'Edit mobile'} background={'transparent'} _hover={{ bg: 'transparent'}}/></p>
                </div>
            </Box>

            <Box className={styles.section}>
                <Box className={`${styles.sectionContent} delivery-section`} mb={4}>
                    <p>Delivery Address</p>
                </Box>
                <Box mb={4}>
                    <AddressCard/>
                </Box>
                
                <Text mb={2} className={styles.moreAddresses}>
                    <Link href="/addresses"><SmallAddIcon/> 2 more addresses</Link>
                </Text>
                <Text mb={2} className={styles.newAddress}>
                    <Link href="/new-address"> <SmallAddIcon />Add new delivery address</Link>
                    {/* <Button size="xs" color="white" background="black" _hover={{bg:'black'}}> <SmallAddIcon />Add new delivery address</Button> */}
                </Text>
            </Box>

             <Box className={styles.section} pt={3} pb={3} pl={4} pr={4}>
                <Flex className={`${styles.sectionContent} coupon-section`} justifyContent="space-between" alignItems={'center'}>
                    <Text lineHeight={2} alignItems="center">Have a coupon?</Text>
                    <Button borderRadius={4} size='sm' color="white" background="black" _hover={{bg:'black'}}>Apply</Button>
                </Flex>
            </Box>

            <Box className={styles.section}>
                <Box className={`${styles.sectionContent} order-summary`} mb={4}>
                    <Text as="p" mt={2} mb={4}>Order Summary</Text>

                    <Box justifyContent="space-between" flexDir="column">
                        <Flex justifyContent='space-between' flexDir="row" mb={2}>
                            <Text as="strong" className="key">Rs. 3,298</Text>
                            <Text as="span" className={`value ${styles.viewToggle}`} justifyContent={'flex-end'}> <SmallAddIcon/> View More</Text>
                        </Flex>
                    </Box>

                    <Flex mt={4} mb={4} flexDir="row">
                        <img src="https://m.media-amazon.com/images/I/81cB0YABm3L._SL1500_.jpg" width="25%"></img>
                        <Flex grow="1" flexDir={"column"} alignItems={"flex-start"} justifyContent={'center'} pl={4}>
                            <Text fontSize="lg" color="gray-800">Baggit Yellow - XL</Text>
                            <Text>Quantity: 1</Text>
                            <Text>MRP: Rs. 3,298</Text>
                        </Flex>
                    </Flex>

                    <Box justifyContent="space-between" flexDir="column">
                        
                        <Flex justifyContent='space-between' flexDir="row" mb={2}>
                            <Text as="span" className="key">Subtotal</Text>
                            <Text as="span" className="value" justifyContent={'flex-end'}>Rs. 3,298</Text>
                        </Flex>
                        <Flex justifyContent='space-between' flexDir="row" mb={2}>
                            <Text as="span" className="key">Coupon Discount</Text>
                            <Text as="span" className="value">Rs. 0</Text>
                        </Flex>
                        <Flex justifyContent='space-between' flexDir="row" mb={2}>
                            <Text as="span" className="key">Shipping Fee</Text>
                            <Text as="span" className="value">Rs. 0</Text>
                        </Flex>
                        <Flex justifyContent='space-between' flexDir="row" mb={2}>
                            <Text as="span" className="key">Grand Total</Text>
                            <Text as="strong" className="value">Rs. 3,298</Text>
                        </Flex>
                    </Box>
                </Box>
            </Box>

            <Box>
            <Box className={styles.section}>
                <Box className={`${styles.sectionContent} mobile-section`} mt={2} mb={2}>
                    <Text>Pay via</Text>
                </Box>
            </Box>

            </Box>
        </Box>
    )
}