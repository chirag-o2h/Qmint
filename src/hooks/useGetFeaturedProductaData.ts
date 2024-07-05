import { Idata, IpriceForEachId } from "@/components/partials/shop/Qmint/FeaturedProducts";
import { useEffect, useState } from "react";
import useApiRequest from "./useAPIRequest";
import { ENDPOINTS } from "@/utils/constants";
import axiosInstance from "@/axiosfolder";

let cancellationSource: AbortController | null = null;
let timeoutId: number | any = null;

const useGetFeaturesProductaData = (conditionalCall=true,dataWhenConditionCallFalse:any=null) => {
    const [dataforbody] = useState({
        "search": "",
        "pageNo": 0,
        "pageSize": -1,
        "sortBy": "",
        "sortOrder": "",
        "filters": {
            "isFeatureProduct": true
        }
    })
    let { data }: Idata = useApiRequest(ENDPOINTS.getProduct, 'post', dataforbody,null,conditionalCall);
    
    const [priceForEachId, setPriceForEachId] = useState<IpriceForEachId | null>(null)

    useEffect(() => {
        const dataOfTheProducts = {data:dataWhenConditionCallFalse} || data
        if(conditionalCall || dataWhenConditionCallFalse){
        if (dataOfTheProducts?.data?.items?.length > 0) {
            const ids: number[] = dataOfTheProducts?.data?.items?.map((product: { productId: any; }) => product.productId)
            const fetchData = async () => {
                // Clear any pending timeout or request
                timeoutId && clearTimeout(timeoutId);
                if (cancellationSource) {
                    cancellationSource.abort();
                }

                // Create a new cancellation source for this request
                cancellationSource = new AbortController();

                timeoutId = setTimeout(() => {
                    // Debounce delay passed, trigger the actual API call
                    cancellationSource?.signal.addEventListener('abort', () => {
                        // If request was cancelled before completing, clear state
                        clearTimeout(timeoutId);
                        cancellationSource = null;
                    });

                    axiosInstance
                        .post(ENDPOINTS.productPrices, { productIds: ids }, { signal: cancellationSource?.signal })
                        .then(response => {
                            if (response?.data?.data) {
                                const idwithpriceObj: any = {}
                                response?.data?.data?.forEach((product: any) => idwithpriceObj[product?.productId] = product)
                                setPriceForEachId(idwithpriceObj)
                            }
                            clearTimeout(timeoutId);
                            cancellationSource = null;
                        })
                        .catch(error => {
                            if (error.name !== 'AbortError') {
                                // console.error(error);
                            }
                            clearTimeout(timeoutId);
                            cancellationSource = null;
                        });
                }, 100); // Adjust debounce delay as needed
            };
            fetchData();
        }
        return () => {
            clearTimeout(timeoutId);
            if (cancellationSource) {
                cancellationSource.abort();
            }
        };
    }
    }, [data,conditionalCall,dataWhenConditionCallFalse]);

    return { data, priceForEachId }
}

export default useGetFeaturesProductaData;