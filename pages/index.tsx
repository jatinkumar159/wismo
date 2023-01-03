import { Button, Flex, Heading, Text, Input } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";

export default function Home() {
  const router = useRouter();
  const [orderID, setOrderID] = useState<string>('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setOrderID(e.target.value);
  }

  const handleClick = () => {
    console.log(orderID);
    router.push('/order');
  }

  return <>
    <Flex flexDir='column' mt='2rem' paddingInline='2rem' gap='1rem'>
      <Text marginInline='auto' fontSize='2xl'>Track your order</Text>
      <Input placeholder="Enter Order ID or Tracking Number" border='1px' borderColor='black' borderStyle='solid' value={orderID} onChange={handleChange} />
      <Button fontSize='sm' bg='black' color='white' _hover={{ background: 'black' }} w='50%' textTransform='uppercase' onClick={handleClick}>Track</Button>
    </Flex>
  </>
}
