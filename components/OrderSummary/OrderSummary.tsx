import { Flex, Box, Text } from "@chakra-ui/react";

interface OrderSummaryProps {
    mode: string | undefined
}
export default function OrderSummary(props: OrderSummaryProps) {
    return (
        <Box justifyContent="space-between" flexDir="column">
            <Flex justifyContent='space-between' flexDir="row" mb={2}>
                <Text as="span" className="key" fontSize={props.mode === 'sm' ? 'sm' : 'md'}>Subtotal</Text>
                <Text as="span" className="value" fontSize={props.mode === 'sm' ? 'sm' : 'md'} justifyContent={'flex-end'}>Rs. 3,298</Text>
            </Flex>
            <Flex justifyContent='space-between' flexDir="row" mb={2}>
                <Text as="span" className="key" fontSize={props.mode === 'sm' ? 'sm' : 'md'}>Coupon Discount</Text>
                <Text as="span" className="value" fontSize={props.mode === 'sm' ? 'sm' : 'md'}>Rs. 0</Text>
            </Flex>
            <Flex justifyContent='space-between' flexDir="row" mb={2}>
                <Text as="span" className="key" fontSize={props.mode === 'sm' ? 'sm' : 'md'}>Shipping Fee</Text>
                <Text as="span" className="value" fontSize={props.mode === 'sm' ? 'sm' : 'md'}>Rs. 0</Text>
            </Flex>
            <Flex justifyContent='space-between' flexDir="row" mb={2}>
                <Text as="span" className="key" fontSize={props.mode === 'sm' ? 'sm' : 'md'}>Grand Total</Text>
                <Text as="strong" className="value" fontSize={props.mode === 'sm' ? 'sm' : 'md'}>Rs. 3,298</Text>
            </Flex>
        </Box>
    )
}