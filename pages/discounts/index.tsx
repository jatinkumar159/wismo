import { EditIcon } from "@chakra-ui/icons";
import { Box, Button, FormControl, FormLabel, IconButton, Radio, RadioGroup, Text, VStack } from "@chakra-ui/react";
import { Field, Form, Formik, useFormik } from "formik";
import { useRouter } from "next/router";
import { ChangeEvent } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { availableCoupons, Coupon, setSelectedCoupon } from "../../redux/slices/confirmationSlice";
import DiscountCard from "./../../components/DiscountCard/DiscountCard";
import styles from './discounts.module.scss';

export default function Discounts() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const coupons: Coupon[] = useAppSelector(availableCoupons);

    return (
        <>
            <Formik
                initialValues={{
                    coupon: null,
                }}
                onSubmit={(values) => {
                    dispatch(setSelectedCoupon(coupons.find(coupon => coupon.code === values.coupon)!))
                    router.back();
                }}
            >
                {({ values, errors, touched, handleBlur, handleChange }) => (
                    <Box className={styles.container} pt={2} pb={2}>
                        <Box className={styles.section} ps={4} pe={4}>
                            <div className={`${styles.sectionContent} mobile-section`}>
                                <Text as="span">Apply Discounts</Text>
                            </div>
                        </Box>
                        <Box p={4}>
                            <Form>
                                <FormControl isInvalid={touched.coupon && !!errors.coupon} id='coupon'>
                                    <RadioGroup>
                                        <VStack align='flex-start'>
                                            {coupons.map(coupon => (
                                                <Radio key={coupon.code} colorScheme='green' onBlur={handleBlur} onChange={handleChange} name='coupon' value={coupon.code}>
                                                    <DiscountCard coupon={coupon} isSelected={values.coupon === coupon.code}></DiscountCard>
                                                </Radio>
                                            ))}
                                        </VStack>
                                    </RadioGroup>
                                </FormControl>

                                <Button
                                    type='submit'
                                    borderRadius={4}
                                    bg={`black`}
                                    _hover={{background: 'black'}}
                                    color={`white`}
                                    disabled={!values.coupon}
                                    fontSize={`sm`}
                                >Proceed to payment</Button>
                            </Form>
                        </Box>
                    </Box>
                )}
            </Formik>
        </>
    )
}