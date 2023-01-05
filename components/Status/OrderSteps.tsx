import { CheckCircleIcon, CheckIcon } from "@chakra-ui/icons";
import { Text } from "@chakra-ui/react";
import { Step, Steps } from "chakra-ui-steps";

const steps = [{ label: "Confirmed" }, { label: "Shipped" }, { label: "Out for Delivery" }, { label: "Delivered" }];

interface Props {
    nextStep: () => void;
    prevStep: () => void;
    reset: () => void;
    setStep: (step: number) => void;
    activeStep: number;
}

export default function OrderSteps({ activeStep }: Props) {
    return (
        <Steps activeStep={activeStep} orientation='horizontal' labelOrientation="vertical" responsive={false} mt='1rem' size='sm'>
            {steps.map(({ label }, index) => (
                <Step label={label} key={index}></Step>
            ))}
        </Steps>
    )
}