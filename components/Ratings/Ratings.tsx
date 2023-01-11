import { ChevronRightIcon } from "@chakra-ui/icons";
import { Button, Flex, Input, Textarea } from "@chakra-ui/react";
import { useState } from "react"
import BrandRating from "./Brand/BrandRating";
import ShippingRating from "./Shipping/ShippingRating";

export default function Ratings() {
    const [brandRating, setBrandRating] = useState<number>(0);
    const [shippingRating, setShippingRating] = useState<number>(0);
    const [feedback, setFeedback] = useState<string>("");

    const submitForm = () => {

    }

    return (
        <Flex flexDir='column' gap="1rem" pb="2rem">
            <BrandRating rating={brandRating} setRating={setBrandRating} />
            <ShippingRating rating={shippingRating} setRating={setShippingRating} />
            <Textarea placeholder='Additional feedback' value={feedback} onChange={(e) => setFeedback(e.target.value)} />
            <Button w={`100%`} mt={4} fontSize='sm' bg='black' color='white' _hover={{ background: 'black' }} px={8} onClick={submitForm}>Submit Feedback</Button>
        </Flex>
    )
}