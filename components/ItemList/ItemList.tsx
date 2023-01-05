import { Divider, Flex, HStack, Icon, Text } from '@chakra-ui/react';
import { MdLocationPin } from 'react-icons/md';
import styles from './ItemList.module.scss';

export default function ItemList() {
    const product = {
        vendor: "Vendor Name",
        product_title: "T-Shirt",
        line_price: 400,
        price: 25000,
        quantity: 1,
        image: null,
        options_with_values: [{
            name: 'Size',
            value: 'XL'
        }]
    }

    const products = new Array(3).fill(product);
    return (
        <>
            <Divider />
            {
            products.map((item,itemIdx) => {
            return <Flex key={itemIdx} flexGrow={1} my={2}>
                <img src={item.image || 'https://via.placeholder.com/100'} width="25%" className={styles.image} />
                <Flex grow="1" flexDir={"column"} alignItems={"flex-start"} justifyContent={'center'} pl={4}>
                    {/* <Text fontSize={`xs`} color="var(--turbo-colors-light-text)" fontWeight={700}>{item.vendor}</Text> */}
                    <Text fontSize={`sm`} color="var(--turbo-colors-light-text)">{item.product_title}</Text>
                    {/* {
                        item.options_with_values.map((option: any, optionIdx: number) => {
                            return <Text mt={1} key={`option-${optionIdx}`} fontSize={`xs`}>{option.name}:{option.value}</Text>
                        })
                    } */}
                </Flex>
                <Flex flexDir={"column"} alignItems={"flex-end"} justifyContent={'center'} pl={4}>
                    <Text fontSize={`xs`} color="var(--turbo-colors-light-text)">
                        <Text as="span" className={styles.lightText}>Quantity:&nbsp;{item.quantity}</Text>
                    </Text>
                    <Text fontSize={`xs`} color="var(--turbo-colors-light-text)">₹ {(item.price / 100).toFixed(2)}</Text>
                </Flex>
            </Flex>
            })
            }
            <Divider my={2}/>
            <Flex flexDir="row" justify="space-between" my={4} >
                <Text fontSize={`sm`} color="var(--turbo-colors-light-text)">Grand Total: </Text>
                <Text as="span" fontSize={`sm`}>₹ { (products.reduce((a,b)=> a + b.price, 0) / 100).toFixed(2)}</Text>
            </Flex>
        </>
    )
}