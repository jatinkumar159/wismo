import { Flex } from "@chakra-ui/react";
import Status from "../Status/Status";
import styles from "./Skeleton.module.scss"

export default function FullSkeleton() {
    return (
        <Flex className={styles.container}>
            {/* STATUS SKELETON */}
            <Status isLoading={true} />
        </Flex>
    )
}