import { SmallAddIcon } from "@chakra-ui/icons";
import { Flex, Box, Text } from "@chakra-ui/react";
import { useAppSelector } from "../../redux/hooks";
import { selectCartPayload } from "../../redux/slices/settingsSlice";
import styles from './OrderItemsList.module.scss';

interface OrderItemProps {
    mode?: string | undefined,
    orderItem?: any
}

export default function OrderItemsList(props: OrderItemProps) {
    const item = props.orderItem;
    const titleFontSize = props.mode === 'sm' ? `md` : `lg`;
    const contentFontSize = props.mode === 'sm' ? `sm` : `md`;
    const cartPayload = useAppSelector(selectCartPayload);
    
    return (
        <Box className={styles.itemList}>
            {
                cartPayload.items.map((item: any, itemIdx: number) => {
                    return <Flex key={`orderItem-${itemIdx}`} mx={4} my={2} flexGrow={1}>
                        <img src={item.image || 'https://via.placeholder.com/100'} width="25%" className={styles.image} />
                        <Flex grow="1" flexDir={"column"} alignItems={"flex-start"} justifyContent={'center'} pl={4}>
                            <Text fontSize={`xs`} color="gray.800" fontWeight={700}>{item.vendor}</Text>
                            <Text fontSize={`sm`} color="gray.800">{item.product_title}</Text>
                            {
                                item.options_with_values.map((option: any, optionIdx: number) => {
                                    return <Text mt={1} key={`option-${optionIdx}`} fontSize={`xs`}>{option.name}:{option.value}</Text>
                                })
                            }
                        </Flex>
                        <Flex flexDir={"column"} alignItems={"flex-end"} justifyContent={'center'} pl={4}>
                            <Text fontSize={`xs`} color="gray.800">₹ {(item.price / 100).toFixed(2)} x {item.quantity}</Text>
                            <Text fontSize={`sm`} color="gray.800">₹ {(item.line_price/100).toFixed(2)}</Text>
                        </Flex>
                    </Flex>
                })
            }
        </Box>
    )
}