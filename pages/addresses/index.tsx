import { EditIcon } from "@chakra-ui/icons";
import { Box, IconButton, Text } from "@chakra-ui/react";
import styles from './addresses/addresses.module.scss';
import AddressCard from "./components/AddressCard/AddressCard";

export default function AddressList() {
    return (
        <Box className={styles.container}>
            <Box className={styles.section} ps={4} pe={4}>
                <div className={`${styles.sectionContent} mobile-section`}>
                    <p>Creating an order with <span className={styles.mobileNumber}>+91 9654723413</span>
                    <IconButton icon={<EditIcon/>} aria-label={'Edit mobile'} background={'transparent'} _hover={{ bg: 'transparent'}}/></p>
                </div>
            </Box>
            <Box ps={4} pe={4}>
                <AddressCard></AddressCard>
                <AddressCard></AddressCard>
                <AddressCard></AddressCard>
            </Box>
        </Box> 

    )
}