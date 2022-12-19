import { Flex, Text } from "@chakra-ui/react";
import { IoTicketOutline } from 'react-icons/io5';
import styles from './PromoBar.module.scss';

export default function PromoBar() {
    return (<>
        <Flex flexDir={`row`} alignItems={`center`} gap={2} lineHeight={1} className={styles.container} p={2} ps={4} pe={4}>
        <IoTicketOutline className={styles.promoIcon} display={`inline`} size={`14px`} alignmentBaseline={`middle`}/> 
            <Text as="span" fontSize={`sm`} line-height={1}> Get 5% extra off on online payments.</Text>
        </Flex>
    </>)
}