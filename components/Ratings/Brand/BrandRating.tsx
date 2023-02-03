import { useState } from "react";
import { Text } from "@chakra-ui/react";
import Rating from "../Rating";

interface Props {
    rating: number;
    setRating: Function;
    alignLeft?: boolean;
}

export default function BrandRating({ rating, setRating, alignLeft }: Props) {
    return (
        <>
            <Text mb={2} fontSize="sm" align={ alignLeft ? 'left' : 'center'}>Rate your shopping experience.</Text>
            <Rating rating={rating} setRating={setRating} />
        </>
    )
}