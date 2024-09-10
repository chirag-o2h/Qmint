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
            console.log("inside the useeffect data before ")
            const data =  dispatch(
                getShoppingCartData({
                    url: ENDPOINTS.getShoppingCartData,
                    body: bodyForGetShoppingCartData,
                })
            );
            // console.log(data,"inside the useeffect data after with data")
        }, 0);
    }, [isLoggedIn]);
}

export default useShoppingCartData