import { Box, Text } from "@chakra-ui/react";
import styles from './addresses/addresses.module.scss';
import AddressCard from "./components/AddressCard/AddressCard";

export default function AddressList() {
    return (
        <Box className={styles.container}>
            <AddressCard></AddressCard>
            <AddressCard></AddressCard>
            <AddressCard></AddressCard>
        </Box> 

    )
}