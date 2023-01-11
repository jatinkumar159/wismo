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
            <Text>Would you recommend Brand X to others?</Text>
            <Rating rating={rating} setRating={setRating} />
        </>
    )
}