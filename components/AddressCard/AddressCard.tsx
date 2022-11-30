import { CheckCircleIcon } from '@chakra-ui/icons';
import { Box, Flex, Radio, Text } from '@chakra-ui/react';
import { Address } from '../../apis/get';
import styles from './AddressCard.module.scss';

interface Props {
    address: Address | undefined | null;
}

export default function AddressCard({ address }: Props) {
    if (!address) return <></>;

    return (
        <Box p={4} className={`${styles.card} ${address.selected ? styles.selectedCard : ''}`} mb={2} mt={2}>
            <Flex align={'flex-start'} gap={'0.5rem'}>
                <Flex>
                    {
                        address.selected && <span className={styles.selectedAddress}>
                            <CheckCircleIcon color={'chakra-colors-green-400'} />
                        </span>
                    }
                    {
                        !address.selected && <span className={styles.address}>
                            <Radio />
                        </span>
                    }
                </Flex>
                <Flex grow={1} flexDir={'column'}>
                    <Box mb={2}>
                        <Text className={styles.cardName}>
                            <Text as="span" fontSize={'md'}>{address.name}</Text>
                            <Text as="span" className={styles.cardChip}>{address.address_type}</Text>
                        </Text>
                    </Box>
                    <Box>
                        <Text>{address.address_line_1}, {address.address_line_2}, {address.city}, {address.district}, {address.state} - {address.pincode}</Text>
                    </Box>
                </Flex>
            </Flex>
        </Box>
    )
}