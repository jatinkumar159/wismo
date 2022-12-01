import { Box, Button, Center, Flex, FormControl, FormErrorMessage, FormLabel, Input, InputGroup, InputLeftAddon, Spinner } from "@chakra-ui/react";
import { useFormik } from "formik";
import styles from './new-address.module.scss';
import * as Yup from 'yup';
import { Address, getPostalAddress } from "../../apis/get";
import { ChangeEvent, useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useAppDispatch } from "../../redux/hooks";

export default function NewAddress() {
    const router = useRouter();
    const dispatch = useAppDispatch();

    const [isPageTransitionActive, setIsPageTransitionActive] = useState<boolean>(false);

    useEffect(() => {
        const pageTransitionStart = () => setIsPageTransitionActive(true);
        const pageTransitionStop = () => setIsPageTransitionActive(false);

        router.events.on('routeChangeStart', pageTransitionStart)
        router.events.on('routeChangeComplete', pageTransitionStop);

        return () => {
            router.events.off('routeChangeStart', pageTransitionStart);
            router.events.off('routeChangeComplete', pageTransitionStop);
        }
    }, [router]);

    const formik = useFormik({
        initialValues: {
            name: '',
            address_line_1: '',
            address_line_2: '',
            city: '',
            state: '',
            country: '',
            pincode: '',
            // address_type: '',
            mobile: '',
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Required'),
            address_line_1: Yup.string().required('Required'),
            city: Yup.string().required('Required'),
            state: Yup.string().required('Required'),
            country: Yup.string().required('Required'),
            pincode: Yup.string().required('Required'),
            // address_type: Yup.string().required('Required'),
            mobile: Yup.string().length(10, 'Invalid Mobile Number').required('Required'),
        }),
        onSubmit: (values) => {
            alert(JSON.stringify(values));
            // TODO: SAVE IN STORE
            router.replace('/confirmation');
        }
    });

    const handlePinCodeChange = async (e: ChangeEvent<HTMLInputElement>) => {
        formik.handleChange(e);
        if (e.target.value?.length === 6) {
            const data: any = await getPostalAddress(e.target.value);
            if (data[0]['Status'] === 'Error') {
                formik.setErrors({
                    pincode: 'Invalid Pincode'
                });
                return;
            }
            formik.setValues({
                ...formik.values,
                pincode: e.target.value,
                city: data[0]['PostOffice'][0]['District'],
                country: data[0]['PostOffice'][0]['Country'],
                state: data[0]['PostOffice'][0]['State'],
            })
        } else {
            formik.setValues({
                ...formik.values,
                pincode: e.target.value,
                city: '',
                country: '',
                state: '',
            })
        }
    }

    return (
        <>
            {isPageTransitionActive ?
                <Center h='100vh'>
                    <Spinner />
                </Center> : (
                    <>
                        <Head>
                            <title>Add New Address</title>
                            <meta name="description" content="Turbo Merchant Experience" />
                            <link rel="icon" href="/favicon.ico" />
                        </Head>

                        <Box className={styles.container} mb={2}>
                            <form onSubmit={formik.handleSubmit}>
                                <FormControl mb={4} isInvalid={formik.touched.mobile && formik.errors.mobile ? true : false}>
                                    <FormLabel ps={4} htmlFor="mobile">Mobile</FormLabel>
                                    <InputGroup>
                                        <InputLeftAddon>+91</InputLeftAddon>
                                        <Input type="number" placeholder={`Mobile`} {...formik.getFieldProps('mobile')}></Input>
                                    </InputGroup>
                                    <FormErrorMessage>{formik.errors.mobile}</FormErrorMessage>
                                </FormControl>
                                <FormControl mb={4} isInvalid={formik.touched.name && formik.errors.name ? true : false}>
                                    <FormLabel ps={4} htmlFor="name">Name</FormLabel>
                                    <Input type="text" placeholder="Name" aria-placeholder="Name" {...formik.getFieldProps('name')}></Input>
                                    <FormErrorMessage>{formik.errors.name}</FormErrorMessage>
                                </FormControl>
                                <FormControl mb={4} isInvalid={formik.touched.pincode && formik.errors.pincode ? true : false}>
                                    <FormLabel ps={4} htmlFor="name">Pincode</FormLabel>
                                    <Input type="text" placeholder="Pincode" aria-placeholder="Pincode" {...formik.getFieldProps('pincode')} onChange={handlePinCodeChange}></Input>
                                    <FormErrorMessage>{formik.errors.pincode}</FormErrorMessage>
                                </FormControl>
                                <Flex flexDir="row" justifyContent={`space-between`} gap={4} mb={4}>
                                    <FormControl isInvalid={formik.touched.city && formik.errors.city ? true : false}>
                                        <FormLabel ps={4} htmlFor="name">City</FormLabel>
                                        <Input disabled type="text" placeholder="City" aria-placeholder="City" {...formik.getFieldProps('city')}></Input>
                                        <FormErrorMessage>{formik.errors.city}</FormErrorMessage>
                                    </FormControl>
                                    <FormControl isInvalid={formik.touched.state && formik.errors.state ? true : false}>
                                        <FormLabel ps={4} htmlFor="name">State</FormLabel>
                                        <Input disabled type="text" placeholder="State" aria-placeholder="State" {...formik.getFieldProps('state')}></Input>
                                        <FormErrorMessage>{formik.errors.state}</FormErrorMessage>
                                    </FormControl>
                                </Flex>
                                <FormControl mb={4} isInvalid={formik.touched.address_line_1 && formik.errors.address_line_1 ? true : false}>
                                    <FormLabel ps={4} htmlFor="name">Address Line 1</FormLabel>
                                    <Input type="text" placeholder="House, road" aria-placeholder="house, road" {...formik.getFieldProps('address_line_1')}></Input>
                                    <FormErrorMessage>{formik.errors.address_line_1}</FormErrorMessage>
                                </FormControl>
                                <FormControl mb={4} isInvalid={formik.touched.address_line_2 && formik.errors.address_line_2 ? true : false}>
                                    <FormLabel ps={4} htmlFor="name">Address Line 2</FormLabel>
                                    <Input type="text" placeholder="Locality, Landmark" aria-placeholder="Locality, Landmark" {...formik.getFieldProps('address_line_2')}></Input>
                                </FormControl>
                                <Button type='submit'>Submit</Button>
                            </form>
                        </Box>

                    </>
                )
            }
        </>
    )
}