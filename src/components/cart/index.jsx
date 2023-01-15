/* eslint-disable */
import { useState } from 'react';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';

import { click } from 'utils/click';
import { CLICK_NAMES } from 'constants/click-names';
import { removeCartItems } from 'store/app-data/app-slice';
import { CATEGOREIS, SIZES, TYPES } from 'constants/pizza';
import { appSelectors } from 'store/app-data/app-selectors';
import { SubmitOrderButton } from 'components/submit-order-button';

import CART_IMAGE from 'assets/cart.png';

import styles from './cart.module.scss';

const CartContent = () => {
    const dispatch = useDispatch();
    const [counter, setCounter] = useState(1);
    const { cart, _cart } = useSelector(appSelectors.appData);
    const pizzaName = `${CATEGOREIS[_cart?.category?.id]?.title} ${TYPES[_cart?.type?.id]?.title ? `- ${TYPES[_cart?.type?.id]?.title}` : ''} ${SIZES[_cart?.size?.id]?.title ? `(${SIZES[_cart?.size?.id]?.title})` : ''}`

    const remove = () => {
        if(counter - 1 < 1){
            dispatch(removeCartItems())
            return;
        }
        setCounter(counter - 1)
    }
    return (
        <>
            <h3 className="w-full text-center p-4 font-bold">Your Order</h3>
            <div className='bg-slate-50 dark:bg-slate-500 p-4 mb-4'>
                {pizzaName}
                <div className='flex items-center mt-3 gap-x-3'>
                    <button style={{height: 40}} className='dark:bg-slate-600 bg-slate-200 rounded-lg px-3' onClick={() => setCounter(counter + 1)}>+</button>
                    {counter}
                    <button style={{height: 40}} className={classNames('dark:bg-slate-600 bg-slate-200 rounded-lg px-3', {
                        'text-xs': counter === 1
                    })} onClick={remove}>{counter === 1 ? 'Delete' : '-'}</button>
                </div>
            </div>
            <hr />
            <div className='my-4 px-4 text-sm'>{`Total Price: ${counter * Object.values(cart).reduce((partialSum, a) => partialSum + a, 0)}$`}</div>
            <SubmitOrderButton hidePrice />
        </>
    )
}

export const Cart = ({ isVisible = true }) => {
    const { _cart } = useSelector(appSelectors.appData);
    const showItem = CATEGOREIS[_cart?.category?.id]?.title && TYPES[_cart?.type?.id]?.title && SIZES[_cart?.size?.id]?.title;
    const checkHover = () => {
        if (isVisible) return;
        click(CLICK_NAMES.HIDDEN_CART__HOVER);
    };
    
    if(isVisible){
        if(!showItem) return;
        return (
            <div style={{ minWidth: 300 }} className="animate__animated animate__fadeInRight bg-slate-100 dark:bg-slate-600 border-l-2 border-solid flex flex-col">
                <CartContent />
            </div>
        )
    }
    
    return (
        <div className={styles.Cart__trigger}>
            <button
                type="button"
                onMouseEnter={checkHover}
                className={classNames("absolute z-10 dark:invert px-6 text-sm rounded-lg leading-9 py-1 right-5 top-5")}
            >
                <img width={40} alt='CART' src={CART_IMAGE} />
            </button>
            <div className='hidden z-10 bg-slate-50 dark:bg-slate-600 shadow-md select-none p-4 rounded-md border border-solid absolute right-5 top-10 mr-8'>
                {showItem ? (
                    <CartContent />
                ) : <h3 className='px-10 py-10 text-sm'>Your Cart Is Empty.</h3>}
            </div>
        </div>
    )
}