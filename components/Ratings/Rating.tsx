import { StarIcon } from "@chakra-ui/icons";
import { Box, Icon, IconButton, Stack } from "@chakra-ui/react";
import { useState } from "react";

interface Props {
    rating: number;
    setRating: Function;
}

export default function Rating({ rating, setRating }: Props) {
    const stars = [1, 2, 3, 4, 5];

    return (
        <Stack isInline gap='1rem'>
            <input name="rating" type="hidden" value={rating} />
            {stars.map(i => {
                return (
                    <Box key={i}>
                        {rating < i ?
                            <IconButton background='none' icon={<StarIcon boxSize='3rem' color='grey' focusable='false' onClick={() => setRating(i)} />} aria-label='Star' />
                            : <IconButton background='none' icon={<StarIcon boxSize='3rem' color='darkgreen' onClick={() => setRating(i)} />} aria-label='Star' />
                        }
                    </Box>
                )
            })}
        </Stack>
    )
}