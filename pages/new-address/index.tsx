import { Box, Button, Center, Flex, FormControl, FormErrorMessage, FormLabel, Input, InputGroup, InputLeftAddon, Radio, RadioGroup, Spinner, useToast } from "@chakra-ui/react";
import { useFormik } from "formik";
import styles from './new-address.module.scss';
import * as Yup from 'yup';
import { getPostalAddress } from "../../apis/get";
import { ChangeEvent, useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setSelectedAddress } from "../../redux/slices/addressSlice";
import { selectName, selectPhone } from "../../redux/slices/profileSlice";
import { addNewAddress } from "../../apis/post";
import { showErrorToast } from "../../utils/toasts";
import { Address } from "./../../utils/interfaces";

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
            name: Yup.string().required('This is a mandatory field.'),
            address_line1: Yup.string().required('This is a mandatory field.'),
            city: Yup.string().required('This is a mandatory field.'),
            state: Yup.string().required('This is a mandatory field.'),
            country: Yup.string().required('This is a mandatory field.'),
            pincode: Yup.string().required('This is a mandatory field.'),
            address_type: Yup.string().required('This is a mandatory field.'),
            mobile: Yup.string().length(10, 'Invalid Mobile Number').required('This is a mandatory field.'),
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

    const fillPostalData = async (pincode: string) => {
        const data: any = await getPostalAddress(pincode);
        if (data.hasOwnProperty('api_error')) {
            formik.setErrors({
                pincode: 'Invalid Pincode'
            });
            return;
        }
        await formik.setTouched({ ...formik.touched, city: true, state: true, country: true }, false);
        await formik.setValues({ ...formik.values, city: data['city'], state: data['state'], country: data['country'] });

    }

    useEffect(() => {
        if (formik.values.pincode?.length === 6) {
            fillPostalData(formik.values.pincode);
        } else {
            formik.setValues({ ...formik.values, city: '', state: '', country: '' });
        }
    }, [formik.values.pincode])

    return (
        <>
            <Head>
                <title>Add New Address</title>
                <meta name="description" content="Turbo Merchant Experience" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Box className={styles.container} mb={2}>
                <form onSubmit={formik.handleSubmit}>
                    <FormControl className={styles.leftAddonGroup} variant={`floating`} mb={4} isInvalid={formik.touched.mobile && formik.errors.mobile ? true : false}>
                        <InputGroup>
                            <InputLeftAddon p={2} background={`none`}>+91</InputLeftAddon>
                            <Input borderLeft={0} type="number" placeholder={`Mobile`} {...formik.getFieldProps('mobile')}></Input>
                            <FormLabel ps={4} htmlFor="mobile" className={styles.leftAddonLabel}>Mobile</FormLabel>
                        </InputGroup>
                        <FormErrorMessage fontSize={`xs`}>{formik.errors.mobile}</FormErrorMessage>
                    </FormControl>
                    <FormControl variant="floating" mb={4} isInvalid={formik.touched.name && formik.errors.name ? true : false}>
                        <FormLabel ps={4} htmlFor="name">Name</FormLabel>
                        <Input type="text" placeholder="Name" aria-placeholder="Name" {...formik.getFieldProps('name')}></Input>
                        <FormErrorMessage fontSize={`xs`}>{formik.errors.name}</FormErrorMessage>
                    </FormControl>
                    <FormControl variant="floating" mb={4} isInvalid={formik.touched.email && formik.errors.email ? true : false}>
                        <FormLabel ps={4} htmlFor="email">Email</FormLabel>
                        <Input type="text" placeholder="Email" aria-placeholder="Email" {...formik.getFieldProps('email')}></Input>
                        <FormErrorMessage fontSize={`xs`}>{formik.errors.email}</FormErrorMessage>
                    </FormControl>
                    <FormControl className={`${formik.touched.state ? styles.touched : null}`} variant="floating" mb={4} isInvalid={formik.touched.pincode && formik.errors.pincode ? true : false}>
                        <FormLabel ps={4} htmlFor="name">Pincode</FormLabel>
                        <Input type="text" placeholder="Pincode" aria-placeholder="Pincode" {...formik.getFieldProps('pincode')}></Input>
                        <FormErrorMessage fontSize={`xs`}>{formik.errors.pincode}</FormErrorMessage>
                    </FormControl>
                    <Flex flexDir="row" justifyContent={`space-between`} gap={4} mb={4}>
                        <FormControl className={`${formik.touched.state ? styles.touched : null}`} variant="floating" isInvalid={formik.touched.city && formik.errors.city ? true : false}>
                            <FormLabel ps={4} htmlFor="city">City</FormLabel>
                            <Input type="text" placeholder="City" aria-placeholder="City" {...formik.getFieldProps('city')}></Input>
                            <FormErrorMessage fontSize={`xs`}>{formik.errors.city}</FormErrorMessage>
                        </FormControl>
                        <FormControl className={`${formik.touched.state ? styles.touched : null} ${styles.disabledFormField}`} variant="floating" isInvalid={formik.touched.state && formik.errors.state ? true : false}>
                            <FormLabel ps={4} htmlFor="state">State</FormLabel>
                            <Input disabled type="text" placeholder="State" aria-placeholder="State" {...formik.getFieldProps('state')}></Input>
                            <FormErrorMessage fontSize={`xs`}>{formik.errors.state}</FormErrorMessage>
                        </FormControl>
                    </Flex>
                    <FormControl variant="floating" mb={4} isInvalid={formik.touched.address_line1 && formik.errors.address_line1 ? true : false}>
                        <FormLabel ps={4} htmlFor="address_line1">Address Line 1</FormLabel>
                        <Input type="text" placeholder="House no." aria-placeholder="house, road" {...formik.getFieldProps('address_line1')}></Input>
                        <FormErrorMessage fontSize={`xs`}>{formik.errors.address_line1}</FormErrorMessage>
                    </FormControl>
                    <FormControl variant="floating" mb={4} isInvalid={formik.touched.address_line2 && formik.errors.address_line2 ? true : false}>
                        <FormLabel ps={4} htmlFor="address_line2">Address Line 2</FormLabel>
                        <Input type="text" placeholder="Locality" aria-placeholder="Locality, Landmark" {...formik.getFieldProps('address_line2')}></Input>
                    </FormControl>
                    <FormControl variant="floating" mb={4} isInvalid={formik.touched.address_type && formik.errors.address_type ? true : false}>
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