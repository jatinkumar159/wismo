import { SmallAddIcon } from "@chakra-ui/icons";
import { Flex, Box, Text } from "@chakra-ui/react";
import styles from './OrderItem.module.scss';

interface OrderItemProps {
    mode?: string | undefined,
    orderItem?: any
}

export default function OrderItem(props: OrderItemProps) {
    const item = props.orderItem;
    return (
        <>
            <Flex mt={4} mb={4} flexDir="row">
                <img src="https://m.media-amazon.com/images/I/81cB0YABm3L._SL1500_.jpg" width="25%" className={styles.image}></img>
                <Flex grow="1" flexDir={"column"} alignItems={"flex-start"} justifyContent={'center'} pl={4}>
                    <Text fontSize={props.mode === 'sm' ? 'md' : 'lg'} color="gray-800">Baggit Yellow - XL</Text>
                    <Text fontSize={props.mode === 'sm' ? 'sm' : 'md'}>Quantity: 1</Text>
                    <Text fontSize={props.mode === 'sm' ? 'sm' : 'md'}>MRP: Rs. 3,298</Text>
                </Flex>
            </Flex>
        </>
    )
}