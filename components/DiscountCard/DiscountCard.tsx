import { CheckCircleIcon } from '@chakra-ui/icons';
import { Box, Flex, Radio, Text, VStack } from '@chakra-ui/react';
import { Coupon } from '../../redux/slices/confirmationSlice';
import styles from './DiscountCard.module.scss';

interface Props {
    coupon: Coupon,
    isSelected: boolean,
}

export default function DiscountCard({ coupon, isSelected }: Props) {
    return (
        <Box p={4} className={`${styles.card} ${isSelected ? styles.selectedCard : ''}`} mb={4} minW='300'>
            <Flex align={'flex-start'} gap={'0.5rem'}>
                <Flex grow={1} flexDir={'column'}>
                    <VStack mb={2} align='flex-start'>
                        <Text className={styles.cardName} fontWeight='bold'>{coupon.code}</Text>
                        <Text as="span" fontSize="xs">{coupon.discountPercentage}% off upto ₹{coupon.maxDiscount}</Text>
                    </VStack>
                </Flex>
            </Flex>
        </Box>
    )
}