import { CheckCircleIcon, EditIcon } from '@chakra-ui/icons';
import { Box, Flex, IconButton, Radio, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { Address } from '../../apis/get';
import styles from './AddressCard.module.scss';

interface Props {
    address: Address | undefined | null;
    selected?: boolean;
    isInForm: boolean;
}

export default function AddressCard({ address, selected, isInForm }: Props) {
    const router = useRouter();
    if (!address) return <></>;

    const handleAddressClick = () => {
        router.push({
            pathname: '/edit-address',
            query: {
                address_id: address.address_id,
            }
        }, 'edit-address');
    }

    return (
        <Box p={4} mb={2} mt={2}>
            <Flex align={'flex-start'} gap={'0.5rem'}>
                <Flex grow={1} flexDir={'column'}>
                    {!isInForm ? (
                        <Flex flexDir={`row`} gap={`4`}>
                            <Text as="span" className={styles.selectedAddress}>
                                <CheckCircleIcon color={'chakra-colors-green-400'} />
                            </Text>
                            <Text className={styles.cardName} flexGrow={1}>
                                <Text as="span" fontSize={'md'}>{address.name}</Text>
                                <Text as="span" className={styles.cardChip}>{address.address_type}</Text>
                            </Text>
                        </Flex>
                    ) : <Text className={styles.cardName} flexGrow={1}>
                        <Text as="span" fontSize={'md'}>{address.name}</Text>
                        <Text as="span" className={styles.cardChip}>{address.address_type}</Text>
                        <IconButton
                            variant='ghost'
                            colorScheme='teal'
                            aria-label='Edit Address'
                            onClick={handleAddressClick}
                            icon={<EditIcon />}
                        ></IconButton>
                    </Text>}
                    <Box mt={2}>
                        <Text>{`${address.address_line1 + ', ' + (address.address_line2 ? address.address_line2 + ', ' : '') + address.city + ', ' + (address.district ? address.district + ', ' : '') + address.state + ' - ' + address.pincode}`}</Text>
                    </Box>
                </Flex>
            </Flex>
        </Box>
    )
}