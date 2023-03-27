import { ChevronRightIcon, CopyIcon } from "@chakra-ui/icons";
import { Flex, Text, Box, Skeleton, Avatar, AvatarGroup, Divider, HStack, Icon, Popover, PopoverArrow, PopoverBody, PopoverContent, PopoverTrigger, Portal } from "@chakra-ui/react";
import { BsBagFill, BsBagCheckFill } from "react-icons/bs";
import { FaTshirt, FaRupeeSign, FaTruckMoving } from "react-icons/fa";
import { MdLocationPin } from "react-icons/md";
import BrandRating from "../Ratings/Brand/BrandRating";
import ShippingRating from "../Ratings/Shipping/ShippingRating";
import Status from "../Status/Status";
import styles from "./Skeleton.module.scss"

export default function FullSkeleton() {
    return (
        <Flex className={styles.container}>
            {/* STATUS SKELETON */}
            <Status isLoading={true} />

            {/* RATINGS SKELETON */}
            <Flex className={styles.containerRatings} flexDir='column' gap='0.5rem' mb={4} p={4}>
                <Text as="h3" fontSize="lg" mb={1}>How did we do?</Text>
                <Box>
                    {/* <Skeleton width={'200px'} height={"20px"} mb={1}></Skeleton>
                    <Skeleton width={"300px"} height={"40px"} mb={2}></Skeleton>
                    <Skeleton width={'200px'} height={"20px"} mb={1}></Skeleton>
                    <Skeleton width={"300px"} height={"40px"} mb={2}></Skeleton> */}

                    <BrandRating rating={0} setRating={() => {}} alignLeft={true} />
                    <ShippingRating rating={0} setRating={() => {}} alignLeft={true} />
                </Box>
            </Flex>

            {/* DETAILS SKELETON */}
            <Flex className={styles.detailsContainer} flexDir='column' gap='0.5rem' mb={4} p={4}>
                <Text as="h3" fontSize="lg" mb={1}>Order Details</Text>
                <Box>
                    <HStack>
                        <Icon as={BsBagFill} fontSize="md" mr={2} color="var(--wismo-colors-text)"></Icon>
                        <Box>
                            <Text>Order number</Text>
                            <HStack>
                                <Skeleton width={"110px"} height={"20px"}></Skeleton>
                            </HStack>
                        </Box>
                    </HStack>
                </Box>
                <Divider my={1} />
                <Flex justifyContent='space-between' alignItems='center'>
                    <HStack>
                        <Icon as={FaTshirt} fontSize="md" mr={2} color="var(--wismo-colors-text)" />
                        <Text fontSize="sm">Order Items</Text>
                    </HStack>
                    <Box display="inline-flex" alignItems="center">
                        <Flex align={`center`}>
                            <ChevronRightIcon w='1.5rem' h='1.5rem' />
                        </Flex>
                    </Box>
                </Flex>
                <Divider my={1} />
                <Flex flexDir={`row`} justify={`space-between`} align="center">
                    <Box>
                        <HStack>
                            <Icon as={FaRupeeSign} fontSize="md" mr={2} color="var(--wismo-colors-text)"></Icon>
                            <Flex flexDir="column" alignItems="flex-start">
                                <Text>Payment Method</Text>
                                <HStack>
                                    <Skeleton width={"110px"} height={"20px"}></Skeleton>
                                </HStack>
                            </Flex>
                        </HStack>
                    </Box>
                </Flex>
            </Flex>
            <Flex className={styles.detailsContainer} flexDir='column' gap='0.5rem' mb={4} p={4}>
                <Text as="h3" fontSize="lg" mb={1}>Courier Details</Text>
                <Flex flexDir="column" alignItems="flex-start">
                    <HStack>
                        <Icon as={MdLocationPin} fontSize="md" mr={2} color="var(--wismo-colors-text)" />
                        <Skeleton width={"60px"} height={"20px"}></Skeleton>
                    </HStack>
                </Flex>
                <Divider my={1} />
                <Box>
                    <HStack>
                        <Icon as={FaTruckMoving} fontSize="md" mr={2} color="var(--wismo-colors-text)"></Icon>
                        <Flex flexDir="column" alignItems="flex-start">
                            <Skeleton width={"180px"} height={"20px"}></Skeleton>
                            <HStack>
                                <Box className={styles.lightText} fontSize="xs">
                                    {"Tracking ID: "}
                                    <Skeleton width={"110px"} height={"20px"}></Skeleton>
                                </Box>
                            </HStack>
                        </Flex>
                    </HStack>
                </Box>
            </Flex>
        </Flex>
    )
}