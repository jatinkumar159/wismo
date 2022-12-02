import { CheckCircleIcon } from '@chakra-ui/icons';
import { Box, Flex, Radio, Text } from '@chakra-ui/react';
import { Address } from '../../apis/get';
import styles from './AddressCard.module.scss';

interface Props {
    address: Address | undefined | null;
    selected?: boolean;
    isInForm: boolean;
}

export default function AddressCard({ address, selected, isInForm }: Props) {
    if (!address) return <></>;

    return (
        <Box p={4} className={`${styles.card} ${(!isInForm || selected) ? styles.selectedCard : ''}`} mb={2} mt={2}>
            <Flex align={'flex-start'} gap={'0.5rem'}>
                {!isInForm ? (
                    <span className={styles.selectedAddress}>
                        <CheckCircleIcon color={'chakra-colors-green-400'} />
                    </span>
                ) : null}
                <Flex grow={1} flexDir={'column'}>
                    <Box mb={2}>
                        <Text className={styles.cardName}>
                            <Text as="span" fontSize={'md'}>{address.name}</Text>
                            <Text as="span" className={styles.cardChip}>{address.address_type}</Text>
                        </Text>
                    </Box>
                    <Box>
                        <Text>{`${address.address_line_1 + ', ' + (address.address_line_2 ? address.address_line_2 + ', ' : '') + address.city + ', ' + (address.district ? address.district + ', ' : '') + address.state + ' - ' + address.pincode}`}</Text>
                    </Box>
                </Flex>
            </Flex>
        </Box>
    )
}