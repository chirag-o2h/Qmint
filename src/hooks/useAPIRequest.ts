import { useRef } from 'react';
import { useState, useEffect } from 'react';
import { AxiosError } from 'axios';
import axiosInstance from '@/axiosfolder';
import { useAppDispatch } from '.';
import { setLoadingFalse, setLoadingTrue } from '@/redux/reducers/homepageReducer';
import { ENDPOINTS } from '@/utils/constants';

const useApiRequest = (url: string, method: 'get' | 'post' = 'get', requestData: any = null, pollInterval: number | null = null,conditionalCall:boolean=true): { data:any, loading:boolean, error:any} => {
    const dispatch = useAppDispatch()
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    let cancellationSource: AbortController | any = useRef(null);
    let timeoutId: number | any = useRef(null);
    let intervalId: number | any = useRef(null);

    useEffect(() => {
        if ((requestData === null || (typeof requestData === 'object' && Object.keys(requestData).length > 0) || (Array.isArray(requestData) && requestData.length > 0))&& conditionalCall) {
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
                    let response;
                    if (method === 'get') {
                        response = axiosInstance.get(url, { signal: cancellationSource.current.signal })
                            .then(response => {
                                setData(response?.data);
                                return response;
                            })
                            .catch(error => {
                                if (error.name !== 'AbortError') {
                                    // console.error(error);
                                }
                            });
                    } else if (method === 'post') {
                        if(ENDPOINTS.productPrices !== url || requestData?.productIds?.length > 0){
                            response = axiosInstance.post(url, requestData, { signal: cancellationSource.current.signal })
                            .then(response => {
                                setData(response?.data);
                                return response;
                            })
                            .catch(error => {
                                if (error.name !== 'AbortError') {
                                    // console.error(error);
                                }
                            });
                        }
                    }
                } catch (error: any | Error | AxiosError) {
                    // console.error('error', error)
                    setError(error);
                } finally {
                    setTimeout(() => {
                        dispatch(setLoadingFalse())
                    }, 2000);
                    setLoading(false);
                }
            };
            clearTimeout(timeoutId.current);
            timeoutId.current = setTimeout(() => {
                fetchData();
            }, 500);

            // Polling
            if (pollInterval) {
                intervalId.current && clearInterval(intervalId.current)
                intervalId.current = setInterval(()=>fetchData(), pollInterval * 1000);
                return () =>{
                    timeoutId?.current && clearTimeout(timeoutId.current);
                     clearInterval(intervalId.current)
                    };
            }

            return () => {
                intervalId.current && clearInterval(intervalId.current)
                clearTimeout(timeoutId.current);
                if (cancellationSource.current) {
                    cancellationSource.current.abort();
                }
            };
        }
    }, [url, method, requestData, pollInterval,conditionalCall]);

    return { data, loading, error };
};

export default useApiRequest;
