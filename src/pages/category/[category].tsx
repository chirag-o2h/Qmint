import React, { useEffect, useMemo, useState } from "react"
import { useMediaQuery, Theme, Container, Stack } from "@mui/material"

// Components
import Layout from "@/components/common/Layout"
import Seo from "@/components/common/Seo"
import CategoryFilters from "@/components/partials/category/filters/CategoryFilters"
import ProductList from "@/components/partials/category/ProductList"
import SortBy from "@/components/partials/category/filters/SortBy"
import { getCategoryData, setPriceForEachItem } from "@/redux/reducers/categoryReducer"
import { ENDPOINTS } from "@/utils/constants"
import { useAppDispatch, useAppSelector } from "@/hooks"
import { categoryRequestBody } from "@/types/categoryRequestBody"
import useApiRequest from "@/hooks/useAPIRequest"
import { serProgressLoaderStatus } from "@/redux/reducers/homepageReducer"
import Loader from "@/components/common/Loader"

export const pageSize = 12;
export const requestBodyDefault: categoryRequestBody = {
    search: "",
    pageNo: 0,
    pageSize: pageSize,
    sortBy: "",
    sortOrder: "",
    filters: {
        // minPrice: 0,
        // maxPrice: 100,
        specification: {}
    }
}

function Category(props:any) {
    const searchParams = useMemo(() => new URLSearchParams(props?.location?.search), [props?.location, window.location]);
    const isSmallScreen = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'))
    const [page, setPage] = useState(searchParams.has("page") ? parseInt(searchParams.get("page")!) : 1);
    const dispatch = useAppDispatch();
    
    const [productIds, setProductIds] = useState({})
    const { data: priceData, loading: priceLoading } = useApiRequest(ENDPOINTS.productPrices, 'post', productIds, 60);
    const categoryData = useAppSelector(state => state.category);
    // console.log("🚀 ~ Category ~ categoryData:", categoryData)
    const checkLoadingStatus = useAppSelector(state => state.category.loading);

    useEffect(() => {
        dispatch(serProgressLoaderStatus(true))
        return () => {
            dispatch(serProgressLoaderStatus(false))
        }
    }, [])

    useEffect(() => {
        if (categoryData.items?.length ?? 0 > 0) {
            const productIds = categoryData?.items?.map((product: any) => product?.productId);
            setProductIds({ productIds })
        }
    }, [categoryData.specifications])

    useEffect(() => {
        if (priceData?.data?.length > 0) {
            const idwithpriceObj: any = {}
            priceData?.data?.forEach((product: any) => idwithpriceObj[product?.productId] = product)
            // setPriceForEachId(() => idwithpriceObj)
            dispatch(setPriceForEachItem(idwithpriceObj));
        }
    }, [priceData])

    return (
        <Layout>
            <Loader open = {checkLoadingStatus} />
            <Seo
                keywords={[`QMint categories`]}
                title="Category"
                lang="en"
            />
            <Container id="PageCategory">
                {isSmallScreen ? (
                    <Stack className="CategoryHeader">
                        <SortBy />
                        <CategoryFilters setPage={setPage} page={page} searchParams={searchParams} />
                    </Stack>
                ) : null}
                <Stack className="MainContent">
                    {!isSmallScreen ? <CategoryFilters page={page} setPage={setPage} searchParams={searchParams} /> : null}
                    <ProductList page={page} setPage={setPage} />
                </Stack>
            </Container>
        </Layout>
    )
}

export default Category