import { Flex } from "@chakra-ui/react"
import Auth from "../../components/Auth/Auth"
import Details from "../../components/Details/Details"
import ShipmentStatus from "../../components/ShipmentStatus/ShipmentStatus"
import Status from "../../components/Status/Status"
import styles from "./order.module.scss"

export default function Order() {
    return (
        <Flex className={styles.container}>
            <Status />
            <Details />
            {/* <Auth /> */}
            <ShipmentStatus />
        </Flex>
    )
}