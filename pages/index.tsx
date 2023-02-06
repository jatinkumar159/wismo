import { ChevronRightIcon } from "@chakra-ui/icons";
import { Button, Flex, Text, Input, FormControl, FormErrorMessage } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import styles from './index.module.scss';
import * as Yup from 'yup'

export default function Home() {
  const router = useRouter();

  const validationSchema = Yup.object().shape({
    trackingNumber: Yup.string().min(3, 'Tracking number should be at least 3 digits').required('Tracking number is required')
  })

  const tryFetchTracking = async (trackingNumber: string): Promise<Boolean> => {
    return router.push({
      pathname: '/order',
      query: {
        id: trackingNumber
      }
    });
  }

  return (<>
    <Flex className={styles.pageContainer} flexDir="column" h={`100%`} align="center" py={4} gap={`0.5rem`} mt={10}>
      <Text as="h1" marginInline='auto' fontSize='xl'>Track your order</Text>
      <Formik w={`100%`}
        initialValues={{
          trackingNumber: ""
        }}
        validationSchema={validationSchema}
        validateOnBlur={false}
        onSubmit={(values: any) => {
          return tryFetchTracking(values.trackingNumber);
        }}>
        {
          ({ errors, touched, values, handleChange, submitForm }) => (
            <Form>
              <span>{touched.trackingNumber}</span>
              <FormControl isInvalid={touched.trackingNumber && errors.trackingNumber?.length ? true : false}>
                <Input w={`260px`} textAlign="center" placeholder="Tracking Number or Order ID" autoFocus name="trackingNumber" type="text" onChange={handleChange} value={values.trackingNumber} />
                <FormErrorMessage fontSize="xs">{errors.trackingNumber}</FormErrorMessage>
              </FormControl>
              <Button w={`100%`} mt={4} fontSize='sm' bg='black' color='white' _hover={{ background: 'black' }} px={8} onClick={submitForm}>Track&nbsp;<ChevronRightIcon /></Button>
            </Form>
          )
        }
      </Formik>
    </Flex>
  </>)
}
