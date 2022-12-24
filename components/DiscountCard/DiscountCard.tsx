import { CheckCircleIcon } from '@chakra-ui/icons';
import { Box, Button, Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Radio, Tag, Text, useDisclosure, VStack } from '@chakra-ui/react';
import { Coupon } from '../../redux/slices/confirmationSlice';
import styles from './DiscountCard.module.scss';

interface Props {
    coupon: Coupon,
    key?: any
}




export default function DiscountCard () {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const handleDetailView = () => {
        console.log("Detail View")
        return onOpen();
    }
    
    return (
        <>
            <Box className={styles.discountCard}>
                <Flex flexDir={`row`} className={styles.cardContent} w={`100%`} p={4} pb={2} >
                    <Text as="span" flexGrow={1} lineHeight={1}>
                        <Box mb={4}>
                            <Text as="h4" fontSize={'md'} fontWeight={`bold`} mb={2} >Flat 10% upto ₹100</Text>
                            <Text as="span" className={styles.cardSubtitle}>Use Paytm wallet</Text>
                        </Box>
                        <Tag backgroundColor={`transparent`} border={`1px solid var(--chakra-colors-gray-200)`} p={1}>WORLDCUP2022</Tag>
                    </Text>
                    <Flex align="flex-end">
                        <Text pb={2} fontSize={`xs`} className={styles.viewDetailLink} lineHeight={1} as="span" onClick={handleDetailView} fontWeight="700">View Details</Text>
                    </Flex>
                </Flex>
                <Flex className={styles.cardFooter} py={2} px={4}>
                    <Box flexGrow={1}>
                        <Text className={`${styles.cardNudge} ${styles.success}`}>Save ₹100 with this coupon</Text>
                    </Box>
                    <Box>
                        <Button variant="outline" colorScheme={`green`} px={4} py={2} h={`24px`}><Text as="span" fontSize="sm" textTransform="uppercase" lineHeight="1">Apply</Text></Button>
                    </Box>
                </Flex>
            </Box>

            <Modal closeOnEsc={true} closeOnOverlayClick={true} variant={`action`} isOpen={isOpen} onClose={onClose} size={`full`} motionPreset={`none`}>
                <ModalOverlay />
                <ModalContent>
                <ModalHeader py={3} pl={4} borderBottom={`1px solid var(--chakra-colors-gray-200)`} fontSize={`sm`} color="#757575" fontWeight="normal">Coupon Details</ModalHeader>
                <ModalCloseButton size={`sm`} pt={1}/>
                <ModalBody px={4}>
                    {/* <UserForm {...currentDiscount}/> */}
                    <Text fontSize={`sm`}>Coupon details come here...</Text>
                </ModalBody>

                <ModalFooter justifyContent={`flex-start`} p={2} pl={4} borderTop={`1px solid var(--chakra-colors-gray-200)`} fontSize={`md`}>
                    <Button mr={3} onClick={onClose} size={`xs`}>Close</Button>
                </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}