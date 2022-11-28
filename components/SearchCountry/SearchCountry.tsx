import { useState } from "react";
import Countries from "./country-data.json";
import { Box, Input, List, ListItem, Text } from "@chakra-ui/react";
import { useAppDispatch } from "../../redux/hooks";
import { setCountry } from "../../redux/slices/profileSlice";

export type Country = {
    name: string;
    flag: string;
    code: string;
    dial_code: string;
};

export const SearchCountry = ({ onClose }: any) => {
    const [filteredList, setFilteredList] = useState(Countries);
    const [selectedItem, setSelectedItem] = useState<Country | undefined>(
        undefined
    );

    const dispatch = useAppDispatch();

    const onCountryChange = (item: Country) => {
        if (item?.code) dispatch(setCountry(item));
        onClose();
    };

    const handleSearch = (event: any) => {
        const value = event.target.value.toLowerCase();
        const result: any =
            Countries?.filter((item: any) => {
                return item.name.toLowerCase().includes(value);
            }) || [];
        setFilteredList(result);
    };

    return (
        <Box
            my={1}
            maxH="xs"
            width="full"
            bg="white"
            zIndex={999}
            height="auto"
            overflow="auto"
            borderRadius="lg"
            boxShadow="0px 1px 30px rgba(0, 0, 0, 0.1)"
        >
            <Box position="sticky" top="0" padding={4} bg="white">
                <Input
                    size="sm"
                    type="search"
                    borderRadius="md"
                    autoComplete="off"
                    placeholder="Enter Country Name"
                    onChange={(event) => handleSearch(event)}
                    _focusWithin={{ borderColor: "secondary" }}
                    _invalid={{ bg: "white", borderColor: "gray.50" }}
                />
            </Box>

            <List>
                {filteredList?.map((item: Country, index: number) => (
                    <ListItem
                        key={index}
                        paddingY={2}
                        color="#ACB9C4"
                        cursor="pointer"
                        fontWeight="500"
                        textTransform="capitalize"
                        onClick={() => {
                            onCountryChange(item);
                            setSelectedItem(item);
                        }}
                        style={{ transition: "all .125s ease" }}
                        _hover={{ bg: "gray.50", color: "#396070" }}
                        sx={
                            item?.flag === selectedItem?.flag
                                ? { backgroundColor: "gray.50", color: "#396070" }
                                : {}
                        }
                    >
                        <Text as="span" mx={4}>
                            {item?.flag}
                        </Text>
                        <Text as="span">{item?.name}</Text>
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};
