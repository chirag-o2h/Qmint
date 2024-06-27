import React, { useCallback, useEffect, useMemo, useState } from "react"
import { useMediaQuery, Theme, Container, Stack } from "@mui/material"

// Components
import Layout from "@/components/common/Layout"
import Seo from "@/components/common/Seo"
import CategoryFilters from "@/components/partials/category/filters/CategoryFilters"
import ProductList from "@/components/partials/category/ProductList"
import SortBy from "@/components/partials/category/filters/SortBy"
import { getCategoryData, setClearFilters, setPageSelectedPrice, setPageSelectedSpecifications, setPageSortOrder, setPriceForEachItem } from "@/redux/reducers/categoryReducer"
import { ENDPOINTS } from "@/utils/constants"
import { useAppDispatch, useAppSelector } from "@/hooks"
import { categoryRequestBody } from "@/types/categoryRequestBody"
import useApiRequest from "@/hooks/useAPIRequest"
import { serProgressLoaderStatus } from "@/redux/reducers/homepageReducer"
import Loader from "@/components/common/Loader"
import { getlastPartOfPath } from "@/utils/common"
import useDebounce from "@/hooks/useDebounce"
import { navigate } from "gatsby"
import classNames from "classnames"
import { THEME_TYPE } from "@/axiosfolder"

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
let timeOut: any;

function Category(props: any) {
    const searchParams = useMemo(() => new URLSearchParams(props?.location?.search), [props?.location, window.location]);
    const isSmallScreen = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'))
    const [page, setPage] = useState(searchParams.has("page") ? parseInt(searchParams.get("page")!) : 1);
    const dispatch = useAppDispatch();
    const { configDetails: configDetailsState } = useAppSelector((state) => state.homePage)

    const checkLoadingStatus = useAppSelector(state => state.category.loading);
    const categoryPageMetadata = useAppSelector(state => state.category.categoryPageMetadata)
    const pagesSelectedFilters = useAppSelector(state => state.category.pageSelectedFilters)
    const [isPriceChanged, setIsPriceChanged] = useState<boolean>(false);
    const clearFilters = useAppSelector(state => state.category.clearFilters)
    const filtersD = useMemo(() => pagesSelectedFilters.specification[getlastPartOfPath(location.pathname)] || {}, [pagesSelectedFilters.specification[getlastPartOfPath(location.pathname)]])
    const priceD = useMemo(() => pagesSelectedFilters.price[getlastPartOfPath(location.pathname)] || null, [pagesSelectedFilters.price[getlastPartOfPath(location.pathname)]])
    const debounceFilter = useDebounce(filtersD, 700);
    const debouncePrice = useDebounce(priceD, 700);

    useEffect(() => {
        setPage(1); // reset page number to 1 when path changes for new category
        fetchData()
    }, [window.location.pathname])

    useEffect(() => {
        dispatch(serProgressLoaderStatus(true))
        return () => {
            dispatch(serProgressLoaderStatus(false))
        }
    }, [])

    useEffect(() => {
        if (clearFilters) {
            setPage(1);
            dispatch(setPageSelectedSpecifications({
                key: getlastPartOfPath(location.pathname), value: undefined
            }))
            dispatch(setPageSelectedPrice({
                key: getlastPartOfPath(location.pathname), value: undefined
            }))
            dispatch(setPageSortOrder({ key: getlastPartOfPath(location.pathname), value: null }));
            dispatch(setClearFilters(false));
            fetchData();
        } else {
            if (Object.keys(debounceFilter).length === 0 && !isPriceChanged) {
                return;
            }
            setPage(1);
            // searchParams.set('page', "1");
            navigate(`?${searchParams.toString()}`, { replace: true });
            fetchData();
        }
    }, [clearFilters, debounceFilter, debouncePrice,isPriceChanged])
    const keywordData = useMemo(() => {
        return searchParams.get("keyword")
    }, [searchParams.get("keyword")])
    // useEffect(() => {
    //     if (clearFilters) {
    //         return;
    //     }
    //     console.log("debounceFilter", debounceFilter, debouncePrice)
    //     if (Object.keys(debounceFilter).length === 0 && !isPriceChanged) {
    //         return;
    //     }
    //     searchParams.set('page', "1");
    //     navigate(`?${searchParams.toString()}`, { replace: true });
    //     fetchData();
    // }, [debounceFilter, debouncePrice])

    useEffect(() => {
        fetchData();
    }, [page])
    useEffect(() => {
        if (keywordData) {
            setPage(1);
            dispatch(setPageSelectedSpecifications({
                key: getlastPartOfPath(location.pathname), value: undefined
            }))
            dispatch(setPageSelectedPrice({
                key: getlastPartOfPath(location.pathname), value: undefined
            }))
            dispatch(setClearFilters(false));
            dispatch(setPageSortOrder({ key: getlastPartOfPath(location.pathname), value: null }));
            fetchData(true);
        }
    }, [keywordData])
    const fetchData = async (isItDueToKeywordChange = false) => {
        const selectedPrice = pagesSelectedFilters.price[getlastPartOfPath(location.pathname)] || null;
        const selectedFilters = pagesSelectedFilters.specification[getlastPartOfPath(location.pathname)] || {};

        const commonArgument = {
            pageNo: page - 1,
            filters: { minPrice: selectedPrice?.[0], maxPrice: selectedPrice?.[1], specification: selectedFilters }
        };

        const argumentForService = {
            url: searchParams.has("keyword") ? ENDPOINTS.search : ENDPOINTS.getCategoryData + `/${getlastPartOfPath(location.pathname)}`,
            body: searchParams.has("keyword")
                ? { ...requestBodyDefault, search: searchParams.get("keyword")!, ...(isItDueToKeywordChange ? {} : { ...commonArgument }) }
                : { ...requestBodyDefault, ...commonArgument }
        }
        if (timeOut) {
            clearTimeout(timeOut)
        }
        timeOut = setTimeout(() => {
            dispatch(getCategoryData(
                argumentForService) as any)
        }, 1000);

        // if (selectedFilters && Object.keys(selectedFilters)?.length || (selectedPrice)) {
        // await dispatch(getCategoryData(
        //   argumentForService) as any)
        // }
    }
    const keyWords = categoryPageMetadata?.metaKeywords?.value?.split(',')?.length > 0 ? categoryPageMetadata?.metaKeywords?.value?.split(',') : []
    return (
        <Layout>
            {checkLoadingStatus && <Loader open={checkLoadingStatus} />}
            <Seo
                title={(categoryPageMetadata.metaTitle ?? '')}
                isItShopPage={true}
                keywords={[`gatsby`, `tailwind`, `react`, `tailwindcss`, 'Travel', 'Qmit', 'gold', 'metal', ...keyWords]}
                description={categoryPageMetadata?.metaDescription}
                lang="en"
            />
            <Container id="PageCategory" className={classNames({ "BmkCategoryPage": THEME_TYPE === "1" },)}>
                {isSmallScreen ? (
                    <Stack className="CategoryHeader">
                        <SortBy />
                        <CategoryFilters isPriceChanged={isPriceChanged} setIsPriceChanged={setIsPriceChanged} />
                    </Stack>
                ) : null}
                <Stack className="MainContent">
                    {!isSmallScreen ? <CategoryFilters isPriceChanged={isPriceChanged} setIsPriceChanged={setIsPriceChanged} /> : null}
                    <ProductList page={page} setPage={setPage} />
                </Stack>
            </Container>
        </Layout >
    )
}

export default Category