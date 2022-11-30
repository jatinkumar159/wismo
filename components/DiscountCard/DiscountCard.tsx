import { CheckCircleIcon } from '@chakra-ui/icons';
import { Box, Flex, Radio, Text } from '@chakra-ui/react';
import styles from './DiscountCard.module.scss';

interface Props {
    selected: boolean
}

const defaultProps = {
    selected: false
}

export default function DiscountCard(props: Props) {
    return (
        <Box p={4} className={`${styles.card} ${props.selected ? styles.selectedCard : ''}`} mb={4}>
            <Flex align={'flex-start'} gap={'0.5rem'}>
                <Flex>
                    {
                        props.selected && <span className={styles.selectedDiscount}>
                            <CheckCircleIcon color={'chakra-colors-green-400'}/>
                        </span>
                    }
                    {
                        !props.selected && <span className={styles.discount}>
                            <Radio/>
                        </span>
                    }
                </Flex>
                <Flex grow={1} flexDir={'column'}>
                    <Box mb={2}>
                        <Text className={styles.cardName}>WORLDCUP2022</Text>
                        <Text as="span" fontSize="xs">₹500 flat discount on all orders above ₹3,000.</Text>
                    </Box>
                </Flex>
            </Flex>
        </Box>
    )
}

DiscountCard.defaultProps = defaultProps;