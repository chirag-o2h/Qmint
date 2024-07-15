import React, { useEffect } from 'react'
import { useAppDispatch } from '.'
import { setLoadingFalse, setLoadingTrue } from '@/redux/reducers/homepageReducer'

const useAPIoneTime = ({ service, endPoint, body, params, conditionalCall = true, needLoadingorNot=true }: { service: any, endPoint?: string, body?: any, params?: any, callAgain?: any, conditionalCall?: boolean,needLoadingorNot?:boolean }) => {
    const dispatch = useAppDispatch()
    useEffect(() => {
        let timeoutId: any;
        needLoadingorNot && dispatch(setLoadingTrue())
        const apiCall = async () => {
            if (conditionalCall) {
                await dispatch(service({ url: endPoint, body, params }))
                needLoadingorNot && setTimeout(() => {
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
    }, [body, params, conditionalCall,needLoadingorNot])
}

export default useAPIoneTime