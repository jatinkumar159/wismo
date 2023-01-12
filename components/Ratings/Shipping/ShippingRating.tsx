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
            <Text fontSize="sm">How would you rate the shipping journey?</Text>
            <Rating rating={rating} setRating={setRating} />
        </>
    )
}