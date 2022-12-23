import { Flex, Box, Text } from "@chakra-ui/react";
import { useAppSelector } from "../../redux/hooks";
import { selectSelectedCoupon } from "../../redux/slices/confirmationSlice";

interface OrderSummaryProps {
    mode: string | undefined
}
export default function OrderSummary(props: OrderSummaryProps) {
    const contentFontSize = props.mode === 'sm' ? `sm` : `md`;
    const selectedDiscount = useAppSelector(selectSelectedCoupon);

    return (
        <Box py={2} px={4} w={`100%`}>
            <Flex justifyContent='space-between' flexDir="row" mb={2}>
                <Text as="span" className="key" fontSize={contentFontSize}>Total MRP</Text>
                <Text as="span" className="value" fontSize={contentFontSize} justifyContent={'flex-end'}>₹ 3,298</Text>
            </Flex>
            <Flex justifyContent='space-between' flexDir="row" mb={2}>
                <Text as="span" className="key" fontSize={contentFontSize}>Discount</Text>
                <Text as="span" className="value" fontSize={contentFontSize}>{(selectedDiscount && <Text as="span">{`₹ ${selectedDiscount.discountAmount!}`}</Text>)}
                    {(!selectedDiscount && <Text as="span">{`₹ 0`}</Text>)}</Text>
            </Flex>
            <Flex justifyContent='space-between' flexDir="row" mb={2}>
                <Text as="span" className="key" fontSize={contentFontSize}>Shipping</Text>
                <Text as="span" className="value" fontSize={contentFontSize}>₹ 0</Text>
            </Flex>
            <Flex justifyContent='space-between' flexDir="row" mb={2} mt={2}>
                <Text as="span" className="key" fontSize={contentFontSize} textTransform="uppercase" fontWeight="bold">Grand Total</Text>
                <Text as="strong" className="value" fontSize={contentFontSize}>
                    {selectedDiscount ? `₹ ${3298 - selectedDiscount.discountAmount!}` : `₹ 3,298`}
                </Text>
            </Flex>
        </Box>
    )
}