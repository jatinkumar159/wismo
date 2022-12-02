import { ChangeEvent, useEffect, useState } from 'react'
import { Form, Formik } from 'formik'
import {
    Button, FormControl, FormErrorMessage, FormLabel, HStack, Input, InputGroup, InputLeftAddon, PinInput, PinInputField, Progress, useToast, VStack, useDisclosure,
    InputLeftElement,
    Text,
    Spinner,
    Center,
} from '@chakra-ui/react'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { resendOTP, verifyBuyer, verifyOTP } from '../../apis/post'
import { profileAsyncTaskEnd, profileAsyncTaskStart, selectIsLoading, selectIsVerified, selectPhone, selectCountry, setPhone, unsetPhone, unverifyProfile, verifyProfile } from '../../redux/slices/profileSlice'
import * as Yup from 'yup'
import Head from 'next/head'
import styles from './profile.module.scss'
import { useRouter } from 'next/router'
import { SearchCountry } from '../../components/SearchCountry/SearchCountry'
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons'
import { selectOtpLength } from '../../redux/slices/settingsSlice'

export default function Profile() {

    const dispatch = useAppDispatch()
    const phone = useAppSelector(selectPhone);
    const country = useAppSelector(selectCountry);
    // const isLoading = useAppSelector(selectIsLoading);
    const isVerified = useAppSelector(selectIsVerified);
    const toast = useToast();
    const router = useRouter();
    // const { isOpen, onToggle, onClose } = useDisclosure();

    const [otpRequestId, setOtpRequestId] = useState('');
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
                validateOnBlur={false}
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
                        router.push('/addresses');
                    }
                    else setOtpRequestId(data.otp_request_id);
                }}
            >
                {({ values, errors, touched, isSubmitting, handleBlur, handleChange, submitForm }) => (
                    <>
                        <Form>
                            <FormControl isInvalid={touched.phone && errors.phone?.length ? true : false} isDisabled={isSubmitting}>
                                <FormLabel htmlFor="Mobile" fontSize="sm" ps={4}>Mobile</FormLabel>
                                <InputGroup>
                                    {/* <InputLeftElement width="3em" cursor="pointer" onClick={onToggle}>
                                        <Text as='span'>
                                            {country.flag}
                                        </Text>
                                        {isOpen ? (
                                            <ChevronUpIcon boxSize={6} color="gray.500" />
                                        ) : (
                                            <ChevronDownIcon boxSize={6} color="gray.500" />
                                        )}

                                    </InputLeftElement> */}
                                    <InputLeftAddon>
                                        +91
                                    </InputLeftAddon>
                                    <Input
                                        id='phone'
                                        type='number'
                                        placeholder='Phone Number'
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
                        {/* {isOpen && <SearchCountry onClose={onClose} />} */}
                    </>
                )}
            </Formik>
        );
    }

    function EnterOTP() {
        const [timer, setTimer] = useState<number>(60);
        const [isOtpInvalid, setIsOtpInvalid] = useState<boolean | undefined>(undefined);

        useEffect(() => {
            const interval = timer > 0 ? setInterval(() => setTimer(time => time - 1), 1000) : undefined;
            return () => clearInterval(interval);
        }, [timer]);

        const digits = useAppSelector(selectOtpLength);
        const inputs: string[] = [], initialValues: any = {}, validation: any = {};
        for (let digit = 1; digit <= digits; digit++) {
            inputs.push(`digit${digit}`);
            initialValues[`digit${digit}`] = '';
            validation[`digit${digit}`] = Yup.string().length(1).required();
        }

        const handleOnChange = (e: ChangeEvent<HTMLInputElement>, values: any, handleChange: Function, submitForm: Function) => {
            handleChange(e);
            const _inputs = inputs.filter(input => input !== e.target.name);
            const otp = (e.target.value ?? '') + _inputs.reduce((acc, curr) => acc + (values[curr] ?? ''), '');
            if (otp.length === digits) {
                setTimeout(() => submitForm(), 0);
            }
        }

        const handleResendOTP = async () => {
            const res = await resendOTP(phone);
            const data = await res.json();

            if (res.status !== 200) {
                showToast(data);
                return;
            }

            setOtpRequestId(data.otp_request_id);
            setTimer(60);
        }

        return (
            <Formik
                initialValues={initialValues}
                validationSchema={Yup.object(validation)}
                validateOnMount={true}
                onSubmit={async (values) => {
                    const otp = inputs.reduce((acc, curr) => acc + values[curr] ?? '', '');
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
                        <FormControl isInvalid={isOtpInvalid}>
                            <FormLabel color={`gray.500`}>An OTP has been sent to {phone}</FormLabel>
                            <HStack justifyContent={`center`} mt={4} mb={4}>
                                <PinInput otp isDisabled={isSubmitting} placeholder=''>
                                    {inputs.map(name => {
                                        return (
                                            <PinInputField key={name} maxLength={1} name={name} autoFocus={name === 'digit1'} value={values[name]} onBlur={handleBlur} onChange={(e: ChangeEvent<HTMLInputElement>) => handleOnChange(e, values, handleChange, submitForm)} />
                                        );
                                    })}
                                </PinInput>
                            </HStack>
                            <FormErrorMessage>Invalid OTP</FormErrorMessage>
                        </FormControl>

                        <Center>
                            <Button
                                mt={6}
                                hidden={timer > 0}
                                onClick={handleResendOTP}
                            >Resend OTP</Button>
                        </Center>
                        {timer > 0 && <Text as="span" color={`gray.500`}>You may resend an OTP in {timer} seconds</Text>}
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
            {isPageTransitionActive ?
                <Center h='100vh'>
                    <Spinner />
                </Center>
                : (
                    <Center h={`100vh`} className={styles.container}>
                        {!phone && <EnterPhone />}
                        {phone && !isVerified && <EnterOTP />}
                        {/* {phone && isVerified && <DisplayPhone />} */}
                    </Center>
                )}
        </>
    )
}