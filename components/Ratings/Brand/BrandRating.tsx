import { useState } from "react";
import { Text } from "@chakra-ui/react";
import Rating from "../Rating";

export default function BrandRating() {
    const [rating, setRating] = useState(2);

    return (
        <>
            <Text>Would you recommend Brand X to others?</Text>
            <Rating rating={rating} setRating={setRating} />
        </>
    )
}