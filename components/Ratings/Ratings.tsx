import { Button, Flex, Textarea } from "@chakra-ui/react";
import { useState } from "react"
import BrandRating from "./Brand/BrandRating";
import ShippingRating from "./Shipping/ShippingRating";
import { submitFeedback } from "../../apis/post";
import toast from "react-hot-toast";

interface RatingsMetaDataProps {
    phone: string;
    trackingNumber: string;
    tenant: string;
    setLastRating?: Function;
    closeDrawer: () => void
}
export default function Ratings({ phone, trackingNumber, tenant, setLastRating, closeDrawer }: RatingsMetaDataProps) {
    const [brandRating, setBrandRating] = useState<number>(0);
    const [shippingRating, setShippingRating] = useState<number>(0);
    const [feedback, setFeedback] = useState<string>("");
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    async function submitForm() {
        try {
            setIsSubmitting(true);
            const res = await submitFeedback({
                brandRating, shippingRating, feedback, phone, tenant, trackingNumber
            });
            if (setLastRating) setLastRating({
                brand: brandRating,
                shipping: shippingRating,
            });
            if (res.description.toLowerCase() === 'ok') {
                toast.success(`Thank you! Feedback submitted.`);
            }
            setIsSubmitting(false);
            closeDrawer();
        } catch (err) {
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