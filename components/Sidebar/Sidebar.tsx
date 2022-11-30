import { Text, Box } from "@chakra-ui/react";
import { useAppSelector } from "../../redux/hooks";
import { selectCartPayload } from "../../redux/slices/settingsSlice";
import styles from './Sidebar.module.scss';

export default function Sidebar() {
    const cartPayload = useAppSelector(selectCartPayload);
    return (
        <Box w={`100%`}>
            <Text>Sidebar comes here.</Text>
            {cartPayload};
        </Box>
    )
}