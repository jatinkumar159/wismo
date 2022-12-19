import { ArrowForwardIcon, ArrowRightIcon, ChevronDownIcon, ChevronRightIcon, ChevronUpIcon, EditIcon, LockIcon, SmallAddIcon } from "@chakra-ui/icons";
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Button, IconButton, Progress, Spinner, Text, VStack, Center, FormControl, Radio, RadioGroup, Flex } from "@chakra-ui/react";
import styles from './addresses.module.scss';
import AddressCard from "../../components/AddressCard/AddressCard";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { selectName, selectPhone, setName, setPhone, unsetPhone, unverifyProfile } from "../../redux/slices/profileSlice";
import { useQuery } from "@tanstack/react-query";
import { getBuyerProfile } from "../../apis/get";
import Head from "next/head";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import { selectSelectedAddress, selectTurboAddressList, selectUnifillAddressList, setSelectedAddress, setTurboAddressList, setUnifillAddressList } from "../../redux/slices/addressSlice";
import { ChangeEvent, useEffect, useState } from "react";
import { Formik, Form } from "formik";
import DiscountCard from "../../components/DiscountCard/DiscountCard";
import { setSelectedCoupon } from "../../redux/slices/confirmationSlice";
import { selectCart, selectCartPayload, setCart } from "../../redux/slices/settingsSlice";
import { updateCart } from "../../apis/patch";
import { createCart } from "../../apis/post";
import { FaChevronDown, FaChevronRight, FaChevronUp } from 'react-icons/fa';
const AddressListHead = () => {
    return <Head>
        <title>Addresses</title>
        <meta name="description" content="Turbo Merchant Experience" />
        <link rel="icon" href="/favicon.ico" />
    </Head>
}

export default function AddressList() {
    // TODO: CHECK IF USER IS A GUEST AND IF ANY ADDRESSES HAVE BEEN STORED
    const router = useRouter();
    const phone = useAppSelector(selectPhone);
    const name = useAppSelector(selectName);
    const selectedAddress = useAppSelector(selectSelectedAddress);
    const cart = useAppSelector(selectCart);
    const cartPayload = useAppSelector(selectCartPayload);
    const turboAddressList = useAppSelector(selectTurboAddressList);
    const unifillAddressList = useAppSelector(selectUnifillAddressList);
    const dispatch = useAppDispatch();
    const { isLoading, isError, data } = useQuery([phone], () => getBuyerProfile(localStorage.getItem('turbo')!), {
        staleTime: Infinity
    });

    const [showAllAddresses, setShowAllAddresses] = useState(false);
    // UNCOMMENT TO MAKE LOCAL DATA THE SOURCE OF TRUTH, ADD STALE TIME INIFINITY TO QUERY, AND ADD DISPATCH EVENTS ON NEW ADDRESS PAGE
    // useEffect(() => {
    //     if (data?.turbo_address_list?.length) {
    //         let userName = data.turbo_address_list.find(address => address.selected === true)?.name
    //         if (!userName) userName = data.turbo_address_list[0].name;
    //         dispatch(setName(userName));
    //     }
    //     if (data && !turboAddressList?.length && !unifillAddressList?.length) {
    //         dispatch(setTurboAddressList(data.turbo_address_list));
    //         dispatch(setUnifillAddressList(data.unifill_address_list));
    //     }
    // }, [dispatch, data, turboAddressList, unifillAddressList]);

    const handleUpdateCart = async (id: string, type: string, data: any) => {
        try {
            const res = await updateCart(id, type, data);
            const updatedCart = await res.json();

            if (updatedCart.hasOwnProperty('cart')) dispatch(setCart(updatedCart['cart']));
        } catch {
            console.error('Error while updating cart');
        }
    }

    const handleCreateCart = async (address: any) => {
        try {
            const res = await createCart('SHOPIFY', '638d85e405faf1498a5adf2s', phone, cartPayload, address);
            const data = await res.json();

            if (data.hasOwnProperty('cart')) {
                dispatch(setCart(data.cart));
            }
        } catch {
            console.error('Error while creating cart');
        }
    }

    useEffect(() => {
        if (data) {
            if (data?.turbo_address_list?.length) {
                let defaultSelectedAddress = data.turbo_address_list.find(address => address.selected === true);
                if (!defaultSelectedAddress) defaultSelectedAddress = data.turbo_address_list[0];

                dispatch(setName(defaultSelectedAddress.name));
                if (!selectedAddress) {
                    // this is the first time the user has arrived at the /addresses screen
                    if (!cart) handleCreateCart(defaultSelectedAddress);
                    else handleUpdateCart(cart['id'], 'ADDRESS_UPDATE', defaultSelectedAddress);
                }
            }
            dispatch(setTurboAddressList(data.turbo_address_list));
            dispatch(setUnifillAddressList(data.unifill_address_list));
        }
    }, [data])

    const handleChangeMobile = () => {
        dispatch(unsetPhone());
        dispatch(unverifyProfile());
        router.push('/profile');
    }

    const handleAddressToggle = () => {
        setShowAllAddresses(!showAllAddresses);
    }

    // const handleOnChange = (e: ChangeEvent<HTMLInputElement>, handleChange: Function) => {
    //     handleChange(e);
    // }

    if (!phone) return <>
        <AddressListHead />
        <span>Please enter a valid phone number to continue!</span>
    </>

    if (isLoading) return <>
        <AddressListHead />
        <Progress size='xs' colorScheme='teal' isIndeterminate />
    </>

    if (isError) return <>
        <AddressListHead />
        <span>An error occurred, please try again later!</span>
    </>

    if (!data.turbo_address_list?.length && !data.unifill_address_list?.length && !turboAddressList?.length && !unifillAddressList?.length) router.replace('/new-address');

    return (
        <>
            <AddressListHead />
            <Flex className={styles.container} flexDir={`column`} h={`100%`}>
                <Flex className={styles.section} ps={4} pe={4} pt={2} pb={2} align={`center`} mb={2}>
                    <Box className={`${styles.sectionContent}`} flexGrow={1}>
                        <Text fontWeight={`bold`}>Your number <Text as="span" ms={4} fontWeight={`normal`}>{phone}</Text></Text>
                        {/* <p> <span className={styles.mobileNumber}>{name ? name + ' - ' : ''}</span>
                            <IconButton icon={<EditIcon />} aria-label={'Edit mobile'} background={'transparent'} _hover={{ bg: 'transparent' }} onClick={handleChangeMobile} /></p> */}
                    </Box>
                    <Box>
                        <Text><FaChevronRight /></Text>
                    </Box>
                </Flex>
                <Flex className={styles.pageTitle} mb={2} ps={4} pe={4}>
                    <Text fontWeight={`bold`}>Deliver to</Text>
                </Flex>
                <Box flexGrow={1}>
                    <Formik
                        initialValues={{
                            selectedAddress: selectedAddress ? selectedAddress.address_id : '',
                        }}
                        onSubmit={(values) => {
                            let address = turboAddressList?.find(address => address.address_id === values.selectedAddress);
                            if (!address) address = unifillAddressList?.find(address => address.address_id === values.selectedAddress);
                            if (address !== selectedAddress) handleUpdateCart(cart['id'], 'ADDRESS_UPDATE', address);
                            dispatch(setSelectedAddress(address!));
                            router.push('/confirmation');
                        }}
                    >
                        {({ values, errors, touched, handleBlur, handleChange }) => (
                            <Box>
                                <Form>
                                    <FormControl>
                                        <RadioGroup>
                                            {/* If only Unifill addresses exist */}
                                            {(!turboAddressList?.length && unifillAddressList?.length) ? unifillAddressList.map(address => {
                                                return (
                                                    <Box mb={2} key={address.address_id} p={4} className={`${styles.card} ${(address.address_id === values.selectedAddress) ? styles.selectedCard : ''}`}>
                                                        <Radio key={address.address_id} colorScheme='green' onBlur={handleBlur} onChange={handleChange} name='selectedAddress' value={address.address_id} className={`${styles.radio}`}>
                                                            <AddressCard key={address.address_id} isInForm={true} address={address} selected={address.address_id === values.selectedAddress} />
                                                        </Radio>
                                                    </Box>
                                                );
                                            }) : null}
                                            {/* If only turbo addresses exist */}
                                            {(!unifillAddressList?.length && turboAddressList?.length) ? turboAddressList.map(address => {
                                                return (
                                                    <Box mb={2} key={address.address_id} p={4} className={`${styles.card} ${(address.address_id === values.selectedAddress) ? styles.selectedCard : ''}`}>
                                                        <Radio key={address.address_id} colorScheme='green' onBlur={handleBlur} onChange={handleChange} name='selectedAddress' value={address.address_id} className={`${styles.radio}`}>
                                                            <AddressCard key={address.address_id} isInForm={true} address={address} selected={address.address_id === values.selectedAddress} />
                                                        </Radio>
                                                    </Box>
                                                );
                                            }) : null}
                                            {/* If both addresses exist */}
                                            {(unifillAddressList?.length && turboAddressList?.length) ? (<>
                                                {turboAddressList.map(address => {
                                                    return (
                                                        <Box mb={2} key={address.address_id} p={4} className={`${styles.card} ${(address.address_id === values.selectedAddress) ? styles.selectedCard : ''}`}>
                                                            <Radio key={address.address_id} colorScheme='green' onBlur={handleBlur} onChange={handleChange} name='selectedAddress' value={address.address_id} className={`${styles.radio}`}>
                                                                <AddressCard key={address.address_id} isInForm={true} address={address} selected={address.address_id === values.selectedAddress} />
                                                            </Radio>
                                                        </Box>
                                                    );
                                                })}

                                                {
                                                    showAllAddresses && unifillAddressList.map(address => {
                                                        return (
                                                            <Box mb={2} p={4} className={`${styles.card} ${(address.address_id === values.selectedAddress) ? styles.selectedCard : ''}`}>
                                                                <Radio colorScheme='green' onBlur={handleBlur} onChange={handleChange} name='selectedAddress' value={address.address_id} className={`${styles.radio}`}>
                                                                    <AddressCard key={address.address_id} isInForm={true} address={address} selected={address.address_id === values.selectedAddress} />
                                                                </Radio>
                                                            </Box>
                                                        );
                                                    })
                                                }

                                                <Flex flexDir={`row`} justifyContent={`center`} alignItems={`center`} gap={`0.25rem`} className={styles.addressToggle} p={2} fontSize={`xs`} textAlign={`center`} w={`100%`} onClick={handleAddressToggle}>Show {showAllAddresses ? `less ` : `all`} {showAllAddresses ? <FaChevronUp /> : <FaChevronDown />}</Flex>

                                                {/* <Accordion allowToggle w={`100%`} reduceMotion={true} p={0}>
                                                    <AccordionItem border='none'>
                                                        <h2>
                                                            <AccordionButton>
                                                                <Flex w={`100%`} textAlign='left'>
                                                                    <Text fontSize={`xs`} textAlign={`center`} w={`100%`}>Show all <ChevronDownIcon /></Text>
                                                                </Flex>
                                                            </AccordionButton>
                                                        </h2>
                                                        {unifillAddressList.map(address => {
                                                            return (
                                                                <AccordionPanel key={address.address_id} className={`${(address.address_id === values.selectedAddress) ? styles.selectedCard : ''}`} p={0}>
                                                                    <Box mb={2} p={4} className={`${styles.card} ${(address.address_id === values.selectedAddress) ? styles.selectedCard : ''}`}>
                                                                        <Radio colorScheme='green' onBlur={handleBlur} onChange={handleChange} name='selectedAddress' value={address.address_id} className={`${styles.radio}`}>
                                                                            <AddressCard key={address.address_id} isInForm={true} address={address} selected={address.address_id === values.selectedAddress} />
                                                                        </Radio>
                                                                    </Box>
                                                                </AccordionPanel>
                                                            );
                                                        })}
                                                    </AccordionItem>
                                                </Accordion> */}
                                            </>) : null}
                                        </RadioGroup>

                                    </FormControl>

                                    {/* <VStack p={4} align={`flex-start`}>
                                        <Text className={styles.newAddress} mb={2}>
                                            <Link href="/new-address"> <SmallAddIcon />Add new delivery address</Link>
                                        </Text>
                                    </VStack> */}
                                </Form>
                            </Box>
                        )}
                    </Formik>
                </Box>
                <Box p={4} className={styles.pageFooter}>
                    <Link href="/new-address">
                        <Button fontSize={`sm`} variant={`outline`} type="submit" w={`100%`} colorScheme={`black`} textTransform={`uppercase`}>
                            Add new Address
                        </Button>
                    </Link>
                    <Text mt={2} fontSize={`sm`} textAlign={`center`}>Powered by <Link href={`https://unicommerce.com`} color={`blue.300`} _hover={{textDecor: 'underline'}}>TURBO</Link></Text>
                </Box>
            </Flex>
        </>
    )
}