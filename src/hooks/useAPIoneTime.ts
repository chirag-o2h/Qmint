import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useAppDispatch } from '.'
import { setLoadingFalse, setLoadingTrue } from '@/redux/reducers/homepageReducer'

const useAPIoneTime = ({ service, endPoint, body, params, conditionalCall = true }: { service: any, endPoint?: string, body?: any, params?: any, callAgain?: any, conditionalCall?: boolean }) => {
    const dispatch = useAppDispatch()
    useLayoutEffect(() => {
        console.log("bugs")
        let timeoutId: any;
        dispatch(setLoadingTrue())
        const apiCall = async () => {
            if (conditionalCall) {
                await dispatch(service({ url: endPoint, body, params }))
                setTimeout(() => {
                    dispatch(setLoadingFalse())
                }, 2000);
            }
        }
        timeoutId = setTimeout(() => {
            apiCall()
        }, 500);
        return () => {
            timeoutId && clearTimeout(timeoutId)
        }
    }, [body, params, conditionalCall])
}

export default useAPIoneTime