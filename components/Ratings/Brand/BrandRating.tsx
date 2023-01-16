import { useState } from "react";
import { Text } from "@chakra-ui/react";
import Rating from "../Rating";

interface Props {
    rating: number;
    setRating: Function;
}

export default function BrandRating({ rating, setRating }: Props) {
    return (
        <>
            <Text fontSize="sm" align="center">Rate your shopping experience</Text>
            <Rating rating={rating} setRating={setRating} />
        </>
    )
}