import { ChevronRightIcon } from "@chakra-ui/icons";
import { Button, Flex, Heading, Text, Input, space, useQuery } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";
import { fetchTracking } from "../apis/post";
import styles from './index.module.scss';

export default function Home() {
  const router = useRouter();
  const [orderID, setOrderID] = useState<string>('');
  
  const tracking = fetchTracking('53441108954');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setOrderID(e.target.value);
  }

  const handleClick = () => {
    console.log(orderID);
    router.push('/order');
  }

  return <>
  <Flex className={styles.pageContainer} flexDir="column" h={`100%`} align="center" py={4} gap={`0.5rem`} mt={10}>
    <Text as="h1" marginInline='auto' fontSize='xl'>Track your order</Text>
    <Input className={styles.trackInput} fontSize="md" placeholder="Enter Order ID or Tracking Number" border='1px' borderColor='black' borderStyle='solid' value={orderID} onChange={handleChange} textAlign="center" w={`auto`}/>
    <Button mt={4}fontSize='sm' bg='black' color='white' _hover={{ background: 'black' }} w='auto' px={8} onClick={handleClick}>Track&nbsp;<ChevronRightIcon /></Button>
  </Flex>
  </>
}
