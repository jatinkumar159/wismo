import { ChevronRightIcon, CopyIcon } from "@chakra-ui/icons"
import { Avatar, AvatarGroup, Box, Divider, Flex, Icon, Text } from "@chakra-ui/react"
import styles from "./Details.module.scss"
import { MdLocationPin } from 'react-icons/md'
import { FaTruckMoving } from 'react-icons/fa'
import { BsHeadphones } from 'react-icons/bs'

export default function Details() {
    return (
        <Flex className={styles.container} flexDir='column' gap='0.5rem'>
            <Text>Order Details</Text>
            <Flex justifyContent='space-between' alignItems='center'>
                <AvatarGroup size='sm' max={2}>
                    <Avatar></Avatar>
                    <Avatar></Avatar>
                    <Avatar></Avatar>
                    <Avatar></Avatar>
                </AvatarGroup>
                <ChevronRightIcon w='1.5rem' h='1.5rem' />
            </Flex>
            <Text>Order No FK989473</Text>
            <Box>
                <Icon as={MdLocationPin} w='1.5rem' h='1.5rem' />
                <Text as='span'>Gurgaon</Text>
            </Box>
            <Divider />
            <Flex>
                <Icon as={FaTruckMoving} mr='0.5rem'></Icon>
                <Box>
                    <Text>Delhivery</Text>
                    <Text>Tracking ID: 123456789345 <CopyIcon /></Text>
                </Box>
            </Flex>
            <Divider />
            <Flex justifyContent='space-between'>
                <Flex>
                    <Icon as={BsHeadphones} mr='0.5rem'></Icon>
                    <Box>
                        <Text>Need Help</Text>
                        <Text>Raise Ticket</Text>
                    </Box>
                </Flex>
                <ChevronRightIcon w='1.5rem' h='1.5rem' />
            </Flex>
        </Flex>
    )
}