import { ChevronRightIcon, CopyIcon } from "@chakra-ui/icons"
import { Avatar, AvatarGroup, Box, Divider, Flex, HStack, Icon, Text } from "@chakra-ui/react"
import styles from "./Details.module.scss"
import { MdLocationPin } from 'react-icons/md'
import { FaTruckMoving } from 'react-icons/fa'
import { BsBagCheckFill, BsHeadphones } from 'react-icons/bs'

export default function Details() {
    return (
        <Flex className={styles.container} flexDir='column' gap='0.5rem'>
            <Text as="h3" fontSize="lg">Order Details</Text>
            <Flex justifyContent='space-between' alignItems='center'>
            <Box>
                <Text fontSize="sm" className={styles.lightText}>Order number:&nbsp;<Text as="span" className={styles.darkText}>FK989473</Text></Text>
            </Box>
            <Box display="inline-flex" alignItems="center">
                <Box>
                    <AvatarGroup size='sm' max={2} spacing="-0.375rem">
                        <Avatar icon={<BsBagCheckFill fontSize={`14px`} />}></Avatar>
                        <Avatar icon={<BsBagCheckFill fontSize={`14px`} />}></Avatar>
                        <Avatar icon={<BsBagCheckFill fontSize={`14px`} />}></Avatar>
                        <Avatar icon={<BsBagCheckFill fontSize={`14px`} />}></Avatar>
                    </AvatarGroup>
                </Box>
                <Box>
                    <ChevronRightIcon w='1.5rem' h='1.5rem' />
                </Box>
            </Box>
            </Flex>
            <Box>
                <HStack>
                    <Icon as={MdLocationPin} fontSize="md" mr={2} color="var(--wismo-colors-text)"/>
                    <Text as='span'>Gurgaon</Text>
                </HStack>
            </Box>
            <Divider />
            <Box>
                <HStack>
                <Icon as={FaTruckMoving} fontSize="md" mr={2} color="var(--wismo-colors-text)"></Icon>
                <Box>
                    <Text>Delhivery</Text>
                    <Text>Tracking ID: 123456789345 <CopyIcon /></Text>
                </Box>
                </HStack>
            </Box>
            <Divider />
            <Box justifyContent='space-between'>
                <HStack>
                    <Icon as={BsHeadphones} fontSize="md" mr={2} color="var(--wismo-colors-text)"></Icon>
                    <Box>
                        <Text>Need Help</Text>
                        <Text>Raise Ticket</Text>
                    </Box>
                    <Box flexGrow={1} textAlign="right">
                        <ChevronRightIcon w='1.5rem' h='1.5rem' />
                    </Box>
                </HStack>
            </Box>
        </Flex>
    )
}