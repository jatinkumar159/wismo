import { useState } from "react";
import { Text } from "@chakra-ui/react";
import Rating from "../Rating";

export default function ShippingRating() {
    const [rating, setRating] = useState(3);

    return (
        <>
            <Text>Did you like Shipping Journey?</Text>
            <Rating rating={rating} setRating={setRating} />
        </>
    )
}