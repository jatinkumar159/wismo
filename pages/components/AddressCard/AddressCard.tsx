import { CheckCircleIcon } from '@chakra-ui/icons';
import { Box, Flex, Radio, Text } from '@chakra-ui/react';
import styles from './AddressCard.module.scss';

interface Props {
    selected: boolean
}

const defaultProps = {
    selected: false
}

export default function AddressCard(props: Props) {
    return (
        <Box p={4} className={`${styles.card} ${styles.selectedCard}`}>
            <Flex align={'flex-start'} gap={'0.5rem'}>
                <Flex>
                    {
                        props.selected && <span className={styles.selectedAddress}>
                            <CheckCircleIcon color={'chakra-colors-green-400'}/>
                        </span>
                    }
                    {
                        !props.selected && <span className={styles.address}>
                            <Radio/>
                        </span>
                    }
                </Flex>
                <Flex grow={1} flexDir={'column'}>
                    <Box mb={2}>
                        <Text className={styles.cardName}>
                            <Text as="span" fontSize={'md'}>Rachit</Text>
                            <Text as="span" className={styles.cardChip}>Home</Text>
                        </Text>
                    </Box>
                    <Box>
                        <Text>G123, DLF New Town Heights, Sector 90, Gurgaon, Haryana - 122051</Text>
                    </Box>
                </Flex>
            </Flex>
        </Box>
    )
}

AddressCard.defaultProps = defaultProps;