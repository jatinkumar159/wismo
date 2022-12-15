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
        <Box p={4} className={`discount-card`}>
            <Text as="h3" fontSize={'md'} fontWeight={`bold`} color={`green.400`} textTransform={`uppercase`} size={`md`}>{coupon.code}</Text>
            <Text as="span" fontSize="xs">{coupon.discountPercentage}% off upto ₹{coupon.maxDiscount}</Text>
        </Box>
    )
}