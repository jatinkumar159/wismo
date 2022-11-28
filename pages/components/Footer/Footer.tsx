import { Flex, Text } from "@chakra-ui/react";
import styles from "./Footer.module.scss";

export default function Footer() {
    return (
        <Flex flexDir="row" justifyContent={'space-between'} className={styles.container}>
            <Text as="a">T&C</Text>
            <Text as="a">Privacy Policy</Text>
        </Flex>
    )
}