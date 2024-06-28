import { useRef } from 'react';
import { useState, useEffect } from 'react';
import { AxiosError } from 'axios';
import axiosInstance from '@/axiosfolder';
import { useAppDispatch } from '.';
import { setLoadingFalse, setLoadingTrue } from '@/redux/reducers/homepageReducer';

const useAPIRequestWithService = ({ service, endPoint, body, params, pollInterval, conditionalCall = true }: { service: any, endPoint?: string, body?: any, params?: any, callAgain?: any, conditionalCall?: boolean, pollInterval: number }) => {
    const dispatch = useAppDispatch()
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    let cancellationSource: AbortController | any = useRef(null);
    let timeoutId: number | any = useRef(null);
    let intervalId: number | any = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            // setLoading(true);
            // dispatch(setLoadingTrue())
            // Clear any pending timeout or request
            timeoutId.current && clearTimeout(timeoutId?.current);
            if (cancellationSource.current) {
                cancellationSource.current.abort();
            }

            // Create a new cancellation source for this request
            cancellationSource.current = new AbortController();

            try {
                let response = await dispatch(service({ url: endPoint, body, params }));
            } catch (error: any | Error | AxiosError) {
                // console.error('error', error)
                setError(error);
            } finally {
                setTimeout(() => {
                    dispatch(setLoadingFalse())
                }, 2000);
                // setLoading(false);
            }
        };
        if (conditionalCall) {
            fetchData();
        }

        // Polling
        if (pollInterval && conditionalCall) {
            intervalId.current = setInterval(fetchData, pollInterval * 1000);
            return () => clearInterval(intervalId.current);
        }

        return () => {
            clearTimeout(timeoutId.current);
            if (cancellationSource.current) {
                cancellationSource.current.abort();
            }
        };
    }, [pollInterval, endPoint, body, params, conditionalCall]);

    return { data, loading, error };
};

export default useAPIRequestWithService;
