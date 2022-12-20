import { Box, Button, Center, Checkbox, Flex, FormControl, FormErrorMessage, FormLabel, HStack, Input, InputGroup, InputLeftAddon, Radio, RadioGroup, Spinner, Text, useRadio, useRadioGroup, useToast } from "@chakra-ui/react";
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
import { FaChevronRight } from "react-icons/fa";

function RadioCard(props) {
    const { getInputProps, getCheckboxProps } = useRadio(props)

    const input = getInputProps()
    const checkbox = getCheckboxProps()

    return (
        <Box as='label'>
            <input {...input} />
            <Box
                {...checkbox}
                cursor='pointer'
                textTransform={`uppercase`}
                borderWidth='1px'
                borderColor={`gray.200`}
                borderRadius='lg'
                px={2} py={1}
                fontSize={`xs`}
                boxShadow='none'
                _checked={{
                    bg: '#F1F8E9',
                    color: '#549112',
                    borderColor: 'transparent',
                    borderWidth: '1px'
                }}
                _focus={{
                    boxShadow: 'none',
                }}
            >
                {props.children}
            </Box>
        </Box>
    )
}


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
            console.log(values)
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
                formik.setTouched({ ...formik.touched, ['state']: true, ['pincode']: true, ['city']: true });
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

    const options = ['home', 'work', 'other']

    const { getRootProps, getRadioProps } = useRadioGroup({
        name: 'home',
        defaultValue: 'home',
        onChange: (e) => {
            formik.setValues({...formik.values, ['address_type']: e})
        },
    })

    const group = getRootProps();

    return (
        <>
            <Head>
                <title>Add New Address</title>
                <meta name="description" content="Turbo Merchant Experience" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Flex className={styles.container} flexDir={`column`}>
                <Flex className={styles.section} ps={4} pe={4} pt={2} pb={2} align={`center`} mb={2}>
                    <Box className={`${styles.sectionContent}`} flexGrow={1}>
                        <Text fontWeight={`bold`}>Your number <Text as="span" ms={4} fontWeight={`normal`}>{phone}</Text></Text>
                    </Box>
                    <Box>
                        <Text><FaChevronRight /></Text>
                    </Box>
                </Flex>

                <Flex className={styles.pageTitle} mb={2} ps={4} pe={4}>
                    <Text fontWeight={`bold`}>Deliver to</Text>
                </Flex>

                <Box className={styles.formContainer} p={4}>
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
                            <Input type="text" placeholder="Pincode" aria-placeholder="Pincode" {...formik.getFieldProps('pincode')} onChange={handlePinCodeChange}></Input>
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
                        <FormControl mb={4} isInvalid={formik.touched.address_type && formik.errors.address_type ? true : false}>
                            <FormLabel htmlFor="address_type">Save address as </FormLabel>
                            <Flex {...group} flexDir={`row`} display={`inline-flex`} gap={4}>
                                {options.map((value) => {
                                    const radio = getRadioProps({ value })
                                    return (
                                        <RadioCard key={value} {...radio}>
                                            {value}
                                        </RadioCard>
                                    )
                                })}
                            </Flex>
                        </FormControl>
                        <FormControl mb={4} isInvalid={formik.touched.address_type && formik.errors.address_type ? true : false}>
                            <Checkbox spacing="0.5rem"><Text fontSize="xs">Make this the default shipping address</Text></Checkbox>
                        </FormControl>
                        <Button type='submit'>Submit</Button>
                    </form>
                </Box>
            </Flex>

        </>
    )
}