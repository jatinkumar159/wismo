import { useState } from "react";
import { Text } from "@chakra-ui/react";
import Rating from "../Rating";

interface Props {
    rating: number;
    setRating: Function;
}

export default function ShippingRating({ rating, setRating }: Props) {
    return (
        <>
            <Text>Did you like Shipping Journey?</Text>
            <Rating rating={rating} setRating={setRating} />
        </>
    )
}