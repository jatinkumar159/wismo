import { Box, Button, Center, Flex, FormControl, FormErrorMessage, FormLabel, Input, InputGroup, InputLeftAddon, Radio, RadioGroup, Spinner, useToast } from "@chakra-ui/react";
import { useFormik } from "formik";
import styles from './new-address.module.scss';
import * as Yup from 'yup';
import { Address, getPostalAddress } from "../../apis/get";
import { ChangeEvent, useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { addAddress, setSelectedAddress } from "../../redux/slices/addressSlice";
import { selectName, selectPhone } from "../../redux/slices/profileSlice";
import { addNewAddress } from "../../apis/post";
import { showErrorToast } from "../../utils/toasts";

export default function NewAddress() {
    const router = useRouter();
    const phone = useAppSelector(selectPhone);
    const name = useAppSelector(selectName);
    const toast = useToast();
    const dispatch = useAppDispatch();

    const formik = useFormik({
        initialValues: {
            mobile: phone,
            name: name ?? '',
            email: '',
            pincode: '',
            city: '',
            state: '',
            address_line1: '',
            address_line2: '',
            country: '',
            address_type: '',
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Required'),
            address_line1: Yup.string().required('Required'),
            city: Yup.string().required('Required'),
            state: Yup.string().required('Required'),
            country: Yup.string().required('Required'),
            pincode: Yup.string().required('Required'),
            address_type: Yup.string().required('Required'),
            mobile: Yup.string().length(10, 'Invalid Mobile Number').required('Required'),
            email: Yup.string().email('Invalid Email Format'),
        }),
        onSubmit: async (values) => {
            try {
                const res = await addNewAddress({ ...values, district: 'Gurgaon' });
                const data = await res.json();

                if (res.status !== 201) {
                    showErrorToast(toast, data.api_error);
                    return;
                }

                dispatch(setSelectedAddress({ ...values, district: 'Gurgaon', address_type: 'Home', selected: true, address_id: data.address_id }));
                router.replace('/confirmation');
            } catch {
                showErrorToast(toast, { error_code: '500', message: 'An Internal Server Error Occurred, Please Try Again Later' });
            }
        }
    });

    const handlePinCodeChange = async (e: ChangeEvent<HTMLInputElement>) => {
        formik.handleChange(e);
        if (e.target.value?.length === 6) {
            try {
                const data: any = await getPostalAddress(e.target.value);
                if (data.hasOwnProperty('api_error')) {
                    formik.setErrors({
                        pincode: 'Invalid Pincode'
                    });
                    return;
                }
                formik.setValues({
                    ...formik.values,
                    pincode: e.target.value,
                    city: data['city'],
                    country: data['country'],
                    state: data['state'],
                })
            } catch {
                showErrorToast(toast, { error_code: '500', message: 'An Internal Server Error Occurred, Please Try Again Later' });
            }
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
                    <FormControl mb={4} isInvalid={formik.touched.email && formik.errors.email ? true : false}>
                        <FormLabel ps={4} htmlFor="email">Email</FormLabel>
                        <Input type="text" placeholder="email" aria-placeholder="Email" {...formik.getFieldProps('email')}></Input>
                        <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
                    </FormControl>
                    <FormControl mb={4} isInvalid={formik.touched.pincode && formik.errors.pincode ? true : false}>
                        <FormLabel ps={4} htmlFor="name">Pincode</FormLabel>
                        <Input type="text" placeholder="pincode" aria-placeholder="Pincode" {...formik.getFieldProps('pincode')} onChange={handlePinCodeChange}></Input>
                        <FormErrorMessage>{formik.errors.pincode}</FormErrorMessage>
                    </FormControl>
                    <Flex flexDir="row" justifyContent={`space-between`} gap={4} mb={4}>
                        <FormControl isInvalid={formik.touched.city && formik.errors.city ? true : false}>
                            <FormLabel ps={4} htmlFor="city">City</FormLabel>
                            <Input type="text" placeholder="City" aria-placeholder="City" {...formik.getFieldProps('city')}></Input>
                            <FormErrorMessage>{formik.errors.city}</FormErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={formik.touched.state && formik.errors.state ? true : false}>
                            <FormLabel ps={4} htmlFor="state">State</FormLabel>
                            <Input disabled type="text" placeholder="State" aria-placeholder="State" {...formik.getFieldProps('state')}></Input>
                            <FormErrorMessage>{formik.errors.state}</FormErrorMessage>
                        </FormControl>
                    </Flex>
                    <FormControl mb={4} isInvalid={formik.touched.address_line1 && formik.errors.address_line1 ? true : false}>
                        <FormLabel ps={4} htmlFor="address_line1">Address Line 1</FormLabel>
                        <Input type="text" placeholder="House, road" aria-placeholder="house, road" {...formik.getFieldProps('address_line1')}></Input>
                        <FormErrorMessage>{formik.errors.address_line1}</FormErrorMessage>
                    </FormControl>
                    <FormControl mb={4} isInvalid={formik.touched.address_line2 && formik.errors.address_line2 ? true : false}>
                        <FormLabel ps={4} htmlFor="address_line2">Address Line 2</FormLabel>
                        <Input type="text" placeholder="Locality, Landmark" aria-placeholder="Locality, Landmark" {...formik.getFieldProps('address_line2')}></Input>
                    </FormControl>
                    <FormControl mb={4} isInvalid={formik.touched.address_type && formik.errors.address_type ? true : false}>
                        <FormLabel ps={4} htmlFor="address_type">Address Type</FormLabel>
                        <RadioGroup>
                            <Radio colorScheme='green' {...formik.getFieldProps('address_type')} value='HOME' mr={4}>
                                Home
                            </Radio>
                            <Radio colorScheme='green' {...formik.getFieldProps('address_type')} value='WORK' mr={4}>
                                Work
                            </Radio>
                            <Radio colorScheme='green' {...formik.getFieldProps('address_type')} value='OTHER'>
                                Other
                            </Radio>
                        </RadioGroup>
                    </FormControl>
                    <Button type='submit'>Submit</Button>
                </form>
            </Box>

        </>
    )
}