import { EditIcon } from "@chakra-ui/icons";
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, IconButton, Progress, Text } from "@chakra-ui/react";
import styles from './addresses.module.scss';
import AddressCard from "../../components/AddressCard/AddressCard";
import { useAppSelector } from "../../redux/hooks";
import { selectPhone } from "../../redux/slices/profileSlice";
import { useQuery } from "@tanstack/react-query";
import { getAddresses } from "../../apis/get";
import Head from "next/head";
import Router, { useRouter } from "next/router";

const AddressListHead = () => {
    return <Head>
        <title>Addresses</title>
        <meta name="description" content="Turbo Merchant Experience" />
        <link rel="icon" href="/favicon.ico" />
    </Head>
}

export default function AddressList() {
    const router = useRouter();
    const phone = useAppSelector(selectPhone);
    const { isLoading, isError, data } = useQuery(['getAddresses'], () => getAddresses(phone))

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

    if (!data.turbo_address_list?.length && !data.unifill_address_list?.length) router.replace('/new-address');

    return (
        <>
            <AddressListHead />
            <Box className={styles.container}>
                <Box className={styles.section} ps={4} pe={4}>
                    <div className={`${styles.sectionContent} mobile-section`}>
                        <p>Creating an order with <span className={styles.mobileNumber}>{phone}</span>
                            <IconButton icon={<EditIcon />} aria-label={'Edit mobile'} background={'transparent'} _hover={{ bg: 'transparent' }} /></p>
                    </div>
                </Box>
                <Box ps={4} pe={4}>
                    {!data.turbo_address_list?.length && data.unifill_address_list?.length && data.unifill_address_list.map(address => {
                        return <AddressCard key={address.address_id} address={address} />
                    })}
                    {!data.unifill_address_list?.length && data.turbo_address_list?.length && data.turbo_address_list.map(address => {
                        return <AddressCard key={address.address_id} address={address} />
                    })}
                    {(data.unifill_address_list?.length && data.turbo_address_list?.length) ? (<>
                        {data.turbo_address_list.map(address => {
                            return <AddressCard key={address.address_id} address={address} />
                        })}
                        <Accordion allowToggle>
                            <AccordionItem border='none'>
                                <h2>
                                    <AccordionButton>
                                        <Box flex='1' textAlign='left'>
                                            Load More
                                        </Box>
                                        <AccordionIcon />
                                    </AccordionButton>
                                </h2>
                                <AccordionPanel pb={4}>
                                    {data.unifill_address_list.map(address => {
                                        return <AddressCard key={address.address_id} address={address} />
                                    })}
                                </AccordionPanel>
                            </AccordionItem>
                        </Accordion>
                    </>) : null}
                </Box>
            </Box>
        </>
    )
}