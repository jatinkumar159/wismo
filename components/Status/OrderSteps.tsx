import { CheckCircleIcon, CheckIcon } from "@chakra-ui/icons";
import { Box, Text } from "@chakra-ui/react";
import { Step, Steps } from "chakra-ui-steps";

interface Step {
    label: string;
}
interface Props {
    nextStep?: () => void;
    prevStep?: () => void;
    reset?: () => void;
    steps: Step[];
    setStep?: (step: number) => void;
    activeStep: number;
}

export default function OrderSteps({ steps, activeStep }: Props) {
    return (
        <Box overflow="auto" pb={3}>
            <Steps activeStep={activeStep} orientation='horizontal' labelOrientation="vertical" responsive={false} mt='1rem' size='sm'>
                {steps.map(({ label }, index) => (
                    <Step label={label} key={index}></Step>
                ))}
            </Steps>
        </Box>
    )
}