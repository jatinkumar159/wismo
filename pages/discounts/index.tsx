import { EditIcon } from "@chakra-ui/icons";
import { Box, IconButton, Text } from "@chakra-ui/react";
import DiscountCard from "./../../components/DiscountCard/DiscountCard";
import styles from './discounts.module.scss';

export default function Discounts() {
    return (
        <>
            <Box className={styles.container} pt={2} pb={2}>
                <Box className={styles.section} ps={4} pe={4}>
                    <div className={`${styles.sectionContent} mobile-section`}>
                        <Text as="span">Apply Discounts</Text>
                    </div>
                </Box>
            </Box>
            <Box p={4}>
                <DiscountCard></DiscountCard>
                <DiscountCard></DiscountCard>
            </Box>
        </>
    )
}