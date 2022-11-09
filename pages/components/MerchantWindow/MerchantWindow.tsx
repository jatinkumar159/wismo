import Discounts from '../Discounts/Discounts';
import MerchantForm from '../MerchantForm/MerchantForm';
import Products from '../Products/Products';
import styles from './MerchantWindow.module.scss';

export default function MerchantWindow() {
    return (
        <>
            <MerchantForm></MerchantForm>
            <Discounts></Discounts>
            <Products></Products>
        </>
    )
}