import { Box, Button, Flex, FormControl, FormLabel, Input, InputGroup, InputLeftAddon } from "@chakra-ui/react";
import { useFormik } from "formik";
import styles from './new-address.module.scss';

interface Address {
    mobile: string,
    name: string,
    pincode: number | string,
    addressType: string,
    country: string,
    district: string,
    city: string,
    state: string,
    addressLine: string
}

export default function NewAddress() {

    const formik = useFormik({
        initialValues: {
            mobile: '',
            name: '',
            pincode: '',
            addressType: '',
            country: '',
            district: '',
            city: '',
            state: '',
            addressLine: ''
        },
        onSubmit: (values) => {
            console.log(JSON.stringify(values));
        }
    })
    return (
        <Box className={styles.container} mb={2}>
            <form>
                <FormControl mb={4}>
                    <FormLabel ps={4} htmlFor="mobile">Mobile</FormLabel>
                    <InputGroup>
                        <InputLeftAddon children={`+91`}></InputLeftAddon>
                        <Input type="tel" placeholder={`Mobile`}></Input>
                    </InputGroup>
                </FormControl>
                <FormControl mb={4}>
                    <FormLabel ps={4} htmlFor="name">Name</FormLabel>
                    <Input type="text" placeholder="Mobile" aria-placeholder="Mobile"></Input>
                </FormControl>
                <FormControl mb={4}>
                    <FormLabel ps={4} htmlFor="name">Pincode</FormLabel>
                    <Input type="text" placeholder="Pincode" aria-placeholder="Pincode"></Input>
                </FormControl>
                <Flex flexDir="row" justifyContent={`space-between`} gap={4} mb={4}>
                    <FormControl>
                        <FormLabel ps={4} htmlFor="name">City</FormLabel>
                        <Input disabled type="text" placeholder="City" aria-placeholder="City"></Input>
                    </FormControl>
                    <FormControl>
                        <FormLabel ps={4} htmlFor="name">State</FormLabel>
                        <Input disabled type="text" placeholder="State" aria-placeholder="State"></Input>
                    </FormControl>
                </Flex>
                <FormControl mb={4}>
                    <FormLabel ps={4} htmlFor="name">Address</FormLabel>
                    <Input type="text" placeholder="House, road, locality" aria-placeholder="house, road, locality"></Input>
                </FormControl>
                <Button type="submit">Submit</Button>
            </form>
        </Box>
    )
}