import { Idata, IpriceForEachId } from "@/components/partials/shop/Qmint/FeaturedProducts";
import { ENDPOINTS } from "@/utils/constants";
import { useEffect, useState } from "react";
import useApiRequest from "./useAPIRequest";

const defaultData = {
    "search": "",
    "pageNo": 0,
    "pageSize": -1,
    "sortBy": "",
    "sortOrder": "",
    "filters": {
        "showOnHomepage": true
    }
}

const useGetPopulurProductsData = () => {
    const [priceForEachId, setPriceForEachId] = useState<IpriceForEachId | null>(null)
    const [dataforbody, setDataforbody] = useState<any>(defaultData)
    const [productIds, setProductIds] = useState({})
    const { data }: Idata = useApiRequest(ENDPOINTS.getProduct, 'post', dataforbody);
    const { data: priceData, loading: priceLoading } = useApiRequest(ENDPOINTS.productPrices, 'post', productIds, 60);
    const [productType, setProductType] = useState('all');


    useEffect(() => {
        const metalId = productType === 'gold' ? 17 : productType === 'silver' ? 18 : undefined;
        setDataforbody({ ...dataforbody, filters: { ...dataforbody.filters, metalId } })
    }, [productType])

    useEffect(() => {
        if (priceData?.data?.length > 0) {
            const idwithpriceObj: any = {}
            priceData?.data?.forEach((product: any) => idwithpriceObj[product?.productId] = product)
            setPriceForEachId(idwithpriceObj)
        }
    }, [priceData])
    
    useEffect(() => {
        if (data?.data?.items?.length > 0) {
            const productIds = data?.data?.items?.map(product => product?.productId);
            setProductIds({ productIds })
        }
    }, [data])


    return { data, priceForEachId, productType, setProductType }
}

export default useGetPopulurProductsData

