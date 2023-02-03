import { useState } from "react";
import { Divider, Text } from "@chakra-ui/react";
import Rating from "../Rating";

interface Props {
    rating: number;
    setRating: Function;
    alignLeft?: boolean;
}

export default function ShippingRating({ rating, setRating, alignLeft }: Props) {
    return (
        <>
            <Text mt={4} mb={2} fontSize="sm" align={ alignLeft ? 'left' : 'center'}>Rate your delivery experience.</Text>
            <Rating rating={rating} setRating={setRating} />
        </>
    )
}