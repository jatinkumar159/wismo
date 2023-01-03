import { CheckCircleIcon } from "@chakra-ui/icons";
import { Step, Steps } from "chakra-ui-steps";

const steps = [{ label: "CONFIRMED" }, { label: "SHIPPED" }, { label: "OUT FOR DELIVERY" }, { label: "DELIVERED" }];

interface Props {
    nextStep: () => void;
    prevStep: () => void;
    reset: () => void;
    setStep: (step: number) => void;
    activeStep: number;
}

export default function OrderSteps({ activeStep }: Props) {
    return (
        <Steps activeStep={activeStep} orientation='horizontal' labelOrientation="vertical" responsive={false} checkIcon={CheckCircleIcon} mt='1rem'>
            {steps.map(({ label }, index) => (
                <Step label={label} key={index}></Step>
            ))}
        </Steps>
    )
}