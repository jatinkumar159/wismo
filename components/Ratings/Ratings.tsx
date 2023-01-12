import { ChevronRightIcon } from "@chakra-ui/icons";
import { Button, Flex, Input, Textarea, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react"
import BrandRating from "./Brand/BrandRating";
import ShippingRating from "./Shipping/ShippingRating";
import { useQuery } from "@tanstack/react-query"
import { submitFeedback } from "../../apis/post";

interface RatingsMetaDataProps {
    phone: string;
    trackingNumber: string;
    tenant: string;
    closeDrawer: () => void
}
export default function Ratings({ phone, trackingNumber, tenant, closeDrawer }: RatingsMetaDataProps) {
    const [brandRating, setBrandRating] = useState<number>(0);
    const [shippingRating, setShippingRating] = useState<number>(0);
    const [feedback, setFeedback] = useState<string>("");
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const toast = useToast();

    async function submitForm() {
        try {
            setIsSubmitting(true);
            const res = await submitFeedback({
                brandRating, shippingRating, feedback, phone, tenant, trackingNumber
            });
            if(res.description.toLowerCase() === 'ok') {
                toast({
                    status: "success",
                    title: 'Thank you!',
                    description: 'Feedback submitted.',
                    variant: 'left-accent',
                    position: 'top-right',
                    duration: 4000,
                    isClosable: true,
                })
            }
            setIsSubmitting(false);
            closeDrawer();
        } catch(err) {
            setIsSubmitting(false);
            console.error(err);
        }
    } 

    return (
        <Flex justify={`center`}>
            <Flex flexDir='column' gap="1rem" pb="2rem" align={`center`} maxW={`300px`}>
                <BrandRating rating={brandRating} setRating={setBrandRating} />
                <ShippingRating rating={shippingRating} setRating={setShippingRating} />
                <Textarea mt={4} fontSize="sm" placeholder='Additional feedback' value={feedback} onChange={(e) => setFeedback(e.target.value)} />
                <Button isLoading={isSubmitting} w={`100%`} mt={4} fontSize='sm' bg='black' color='white' _hover={{ background: 'black' }} px={8} onClick={submitForm}>Submit Feedback</Button>
            </Flex>
        </Flex>
    )
}