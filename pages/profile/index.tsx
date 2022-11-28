import { ChangeEvent, useState } from 'react'
import { Form, Formik } from 'formik'
import { Button, FormControl, FormErrorMessage, FormLabel, HStack, Input, InputGroup, InputLeftAddon, PinInput, PinInputField, Progress, useToast, VStack } from '@chakra-ui/react'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { sendOTP, verifyBuyer, verifyOTP } from '../../apis/post'
import { profileAsyncTaskEnd, profileAsyncTaskStart, selectIsLoading, selectIsVerified, selectPhone, setPhone, unsetPhone, unverifyProfile, verifyProfile } from '../../redux/slices/profileSlice'
import * as Yup from 'yup'
import Head from 'next/head'
import styles from './Profile.module.scss'
import { useRouter } from 'next/router'

export default function Profile() {
    const dispatch = useAppDispatch()
    const phone = useAppSelector(selectPhone);
    const isLoading = useAppSelector(selectIsLoading);
    const isVerified = useAppSelector(selectIsVerified);
    const toast = useToast();
    const router = useRouter();

    const [otpRequestId, setOtpRequestId] = useState('');

    function showToast(data: any) {
        toast({
            title: `${data.error}`,
            description: `${data.message}`,
            status: 'error',
            variant: 'left-accent',
            position: 'top-right',
            duration: 4000,
            isClosable: true,
        });
    }

    function EnterPhone() {
        const handleOnChange = (e: ChangeEvent<HTMLInputElement>, handleChange: Function, submitForm: Function) => {
            handleChange(e);
            if (e.target.value.length === 10) {
                setTimeout(() => {
                    submitForm();
                }, 0)
            }
        }

        return (
            <Formik
                initialValues={{
                    phone: ''
                }}
                validationSchema={Yup.object({
                    phone: Yup.string().length(10, 'Invalid Mobile Number').required('Required'),
                })}
                onSubmit={async (values) => {
                    const res = await verifyBuyer(values.phone);
                    const data = await res.json();

                    if (res.status !== 200) {
                        showToast(data);
                        return;
                    }

                    dispatch(setPhone(values.phone));
                    if (data.is_guest_user) {
                        dispatch(verifyProfile());
                        router.push('/confirmation');
                    }
                    else setOtpRequestId(data.otp_request_id);
                }}
            >
                {({ values, errors, touched, isSubmitting, handleBlur, handleChange, submitForm }) => (
                    <Form>
                        <FormControl isInvalid={touched.phone && errors.phone?.length ? true : false} isDisabled={isSubmitting}>
                            <FormLabel fontSize="sm">Mobile Number</FormLabel>
                            <InputGroup>
                                <InputLeftAddon>+91</InputLeftAddon>
                                <Input
                                    autoComplete='false'
                                    id='phone'
                                    type='tel'
                                    placeholder='Mobile number'
                                    errorBorderColor='red.300'
                                    autoFocus
                                    value={values.phone}
                                    onBlur={handleBlur}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleOnChange(e, handleChange, submitForm)}
                                />
                            </InputGroup>
                            <FormErrorMessage>{errors.phone}</FormErrorMessage>
                        </FormControl>
                    </Form>
                )}
            </Formik>
        );
    }

    function EnterOTP() {
        const [isOtpInvalid, setIsOtpInvalid] = useState<boolean | undefined>(undefined);

        const handleOnChange = (e: ChangeEvent<HTMLInputElement>, values: any, handleChange: Function, submitForm: Function) => {
            handleChange(e);
            const inputs = ['digit1', 'digit2', 'digit3', 'digit4'].filter(input => input !== e.target.name);
            const otp = (e.target.value ?? '') + values[inputs[0]] + values[inputs[1]] + values[inputs[2]];
            if (otp.length === 4) {
                setTimeout(() => submitForm(), 0);
            }
        }
        return (
            <Formik
                initialValues={{
                    digit1: '',
                    digit2: '',
                    digit3: '',
                    digit4: '',
                }}
                validationSchema={Yup.object({
                    digit1: Yup.string().length(1).required(),
                    digit2: Yup.string().length(1).required(),
                    digit3: Yup.string().length(1).required(),
                    digit4: Yup.string().length(1).required(),
                })}
                validateOnMount={true}
                onSubmit={async (values) => {
                    const otp = values.digit1 + values.digit2 + values.digit3 + values.digit4;
                    const res = await verifyOTP(otpRequestId, otp);
                    const data = await res.json();

                    if (res.status !== 200) {
                        showToast(data);
                        return;
                    }

                    if (data.token) {
                        // Store token to local storage? 
                        setIsOtpInvalid(false);
                        dispatch(verifyProfile());
                        router.push('/addresses');
                    } else {
                        setIsOtpInvalid(true);
                    }
                }}
            >
                {({ values, isSubmitting, handleBlur, handleChange, submitForm }) => (
                    <Form>
                        <span className={styles.label}></span>
                        <FormControl isInvalid={isOtpInvalid}>
                            <FormLabel>Enter OTP sent to {phone}</FormLabel>
                            <HStack>
                                <PinInput otp isDisabled={isSubmitting}>
                                    <PinInputField maxLength={1} name='digit1' value={values.digit1} onBlur={handleBlur} onChange={(e: ChangeEvent<HTMLInputElement>) => handleOnChange(e, values, handleChange, submitForm)} autoFocus></PinInputField>
                                    <PinInputField maxLength={1} name='digit2' value={values.digit2} onBlur={handleBlur} onChange={(e: ChangeEvent<HTMLInputElement>) => handleOnChange(e, values, handleChange, submitForm)} ></PinInputField>
                                    <PinInputField maxLength={1} name='digit3' value={values.digit3} onBlur={handleBlur} onChange={(e: ChangeEvent<HTMLInputElement>) => handleOnChange(e, values, handleChange, submitForm)} ></PinInputField>
                                    <PinInputField maxLength={1} name='digit4' value={values.digit4} onBlur={handleBlur} onChange={(e: ChangeEvent<HTMLInputElement>) => handleOnChange(e, values, handleChange, submitForm)} ></PinInputField>
                                </PinInput>
                            </HStack>
                            <FormErrorMessage>Invalid OTP</FormErrorMessage>
                        </FormControl>
                    </Form>
                )}
            </Formik>
        )
    }

    function DisplayPhone() {
        const handleOnClick = () => {
            dispatch(unsetPhone());
            dispatch(unverifyProfile());
        }
        return (
            <VStack>
                <span className={styles.preview}>{phone}</span>
                <Button colorScheme='teal' variant='outline' onClick={handleOnClick}>Edit</Button>
            </VStack>
        )
    }

    return (
        <>
            <Head>
                <title>Profile</title>
                <meta name="description" content="Turbo Merchant Experience" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            {isLoading && <Progress size='xs' colorScheme='teal' isIndeterminate />}
            <div className={styles.container}>
                {!phone && <EnterPhone />}
                {phone && !isVerified && <EnterOTP />}
                {phone && isVerified && <DisplayPhone />}
            </div>
        </>
    )
}