import { EditIcon, SmallAddIcon } from '@chakra-ui/icons';
import { Box, Button, Flex, IconButton, Link, Text } from '@chakra-ui/react';
import AddressCard from './components/AddressCard/AddressCard';
import styles from './confirmation/confirmation.module.scss';

export default function Confirmation() {
    return (
        <div className={`${styles.container} confirmation`}>
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
                </Text>
            </Box>

             <Box className={styles.section} pt={3} pb={3} pl={4} pr={4}>
                <Flex className={`${styles.sectionContent} coupon-section`} justifyContent="space-between" alignItems={'center'}>
                    <Text lineHeight={2} alignItems="center">Have a coupon?</Text>
                    <Button borderRadius={4} size='sm' color="white" background="black" _hover={{bg:'black'}}>Apply</Button>
                </Flex>
            </Box>

            <Box className={styles.section}>
                <Box className={`${styles.sectionContent} delivery-section`} mb={4}>
                    <Text mt={4}>Order Summary</Text>
                </Box>
            </Box>
        </div>
    )
}