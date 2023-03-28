import { Avatar, Box, Divider, Flex, HStack, Icon, Text } from '@chakra-ui/react';
import imageLoader from '../../utils/imageLoader'
import styles from './ItemList.module.scss';
import Image from 'next/image';
import { BsBagCheckFill } from 'react-icons/bs';
import { useEffect } from 'react';
import { logOrderItemView } from '../../firebase';
import { useQueryClient } from '@tanstack/react-query';

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
    const queryClient = useQueryClient();

    useEffect(() => {
        const data: any = queryClient.getQueriesData(['refreshedTrackingData'])?.at(-1)?.at(-1) ?? queryClient.getQueriesData(['orderData']).at(-1)?.at(-1);
        logOrderItemView(data?.result?.tenant_code, data?.result?.order_number, data?.result?.customer_phone, data?.result?.tracking_number);
    }, [])

    const priceSum = props.items.reduce((a, b) => a + parseInt(b.total_price, 10), 0);

    return (
        <>
            <Divider />
            <Box className={styles.itemCarousel}>
                {
                    props.items.map((item: OrderItem, itemIdx) => {
                        return <Flex key={itemIdx} flexGrow={1} my={2}>
                            {/* <Image src={item.image || 'https://lp2.hm.com/hmgoepprod?set=format%5Bwebp%5D%2Cquality%5B79%5D%2Csource%5B%2Faf%2F5b%2Faf5bc2554eac0ea2a3649dc9b730751614636733.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BDESCRIPTIVESTILLLIFE%5D%2Cres%5Bm%5D%2Chmver%5B2%5D&call=url%5Bfile%3A%2Fproduct%2Fminiature%5D'} alt={item.channel_product_name} className={styles.image} loader={imageLoader} width='20' height='20' /> */}
                            <Avatar icon={<BsBagCheckFill fontSize={`1.5rem`} />}></Avatar>
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
            <Divider my={2} />
            <Flex flexDir="row" justify="space-between" my={4} >
                <Text fontSize={`sm`} color="var(--turbo-colors-light-text)">Grand Total: </Text>
                <Text as="span" fontSize={`sm`}>₹ {(priceSum).toFixed(2)}</Text>
            </Flex>
        </>
    )
}