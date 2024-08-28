import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '.';
import { getShoppingCartData } from '@/redux/reducers/shoppingCartReducer';
import { ENDPOINTS } from '@/utils/constants';
import { bodyForGetShoppingCartData } from '@/utils/common';

const useShoppingCartData = () => {

    const { configDetails: configDetailsState, isLoggedIn } = useAppSelector((state) => state.homePage)

    const dispatch = useAppDispatch()
    useEffect(() => {
        setTimeout(() => {
            dispatch(
                getShoppingCartData({
                    url: ENDPOINTS.getShoppingCartData,
                    body: bodyForGetShoppingCartData,
                })
            );
        }, 0);
    }, [isLoggedIn]);
}

export default useShoppingCartData