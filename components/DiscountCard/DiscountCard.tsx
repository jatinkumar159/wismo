import { CheckCircleIcon } from '@chakra-ui/icons';
import { Box, Flex, Radio, Text, VStack } from '@chakra-ui/react';
import { Coupon } from '../../redux/slices/confirmationSlice';
import styles from './DiscountCard.module.scss';

interface Props {
    coupon: Coupon,
    key?: any
}

export default function DiscountCard({ coupon }: Props) {
    return (
        <Flex flexDir={`row`} align={`center`}>
            <Text as="span" className={styles.cardName} flexGrow={1} lineHeight={1}>
                <Text as="span" fontSize={'md'}>{coupon.code}</Text>
                <Text as="span" className={styles.cardChip}>Code</Text>
            </Text>
            <Text className={styles.editCardLink} lineHeight={1} as="span">Edit</Text>
        </Flex>
    )
}