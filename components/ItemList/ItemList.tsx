import { Box, Divider, Flex, HStack, Icon, Text } from '@chakra-ui/react';
import { MdLocationPin } from 'react-icons/md';
import styles from './ItemList.module.scss';

export interface OrderItem {
    total_price: any;
    seller_sku_code: string;
    channel_product_name: string;
    image?: any | string;
}

interface ItemListProps {
    items: OrderItem[]
}

export default function ItemList(props: ItemListProps) {

    const priceSum = props.items.reduce((a,b) => a + parseInt(b.total_price, 10), 0);

    return (
        <>
            <Divider />
            <Box className={styles.itemCarousel}>
                {
                    props.items.map((item: OrderItem,itemIdx) => {
                    return <Flex key={itemIdx} flexGrow={1} my={2}>
                        <img src={item.image || 'https://via.placeholder.com/100'} width="25%" className={styles.image} />
                        <Flex grow="1" flexDir={"column"} alignItems={"flex-start"} justifyContent={'center'} ml={4}>
                            {/* <Text fontSize={`xs`} color="var(--turbo-colors-light-text)" fontWeight={700}>{item.vendor}</Text> */}
                            <Text fontSize={`sm`} color="var(--turbo-colors-light-text)">{item.channel_product_name}</Text>
                            {/* {
                                item.options_with_values.map((option: any, optionIdx: number) => {
                                    return <Text mt={1} key={`option-${optionIdx}`} fontSize={`xs`}>{option.name}:{option.value}</Text>
                                })
                            } */}
                        </Flex>
                        <Flex flexDir={"column"} alignItems={"flex-end"} justifyContent={'center'} w={`30%`}>
                            <Text fontSize={`xs`} color="var(--turbo-colors-light-text)">
                                <Text as="span" className={styles.lightText}>Quantity:&nbsp;{1}</Text>
                            </Text>
                            <Text fontSize={`xs`} color="var(--turbo-colors-light-text)">₹ {(parseInt(item.total_price)).toFixed(2)}</Text>
                        </Flex>
                    </Flex>
                    })
                }
            </Box>
            <Divider my={2}/>
            <Flex flexDir="row" justify="space-between" my={4} >
                <Text fontSize={`sm`} color="var(--turbo-colors-light-text)">Grand Total: </Text>
                <Text as="span" fontSize={`sm`}>₹ { (priceSum).toFixed(2)}</Text>
            </Flex>
        </>
    )
}