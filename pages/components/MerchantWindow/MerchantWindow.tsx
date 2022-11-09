import Discounts from '../Discounts/Discounts';
import MerchantForm from '../MerchantForm/MerchantForm';
import Products from '../Products/Products';
import StepForm from '../StepForm/StepForm';
import styles from './MerchantWindow.module.scss';

export default function MerchantWindow() {
    return (
        <div className={styles.container}>
            <StepForm></StepForm>
            <MerchantForm></MerchantForm>
            <Discounts></Discounts>
            <Products></Products>
        </div>
    )
}