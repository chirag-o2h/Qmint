import React, { lazy, Suspense, useCallback, useEffect, useMemo, useState, useTransition } from "react"
import { useMediaQuery, Theme, Container, Stack, Skeleton } from "@mui/material"

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
import { serProgressLoaderStatus, setConfigDetails } from "@/redux/reducers/homepageReducer"
import Loader from "@/components/common/Loader"
import { bodyForGetShoppingCartData, getlastPartOfPath } from "@/utils/common"
import useDebounce from "@/hooks/useDebounce"
import { navigate } from "gatsby"
import classNames from "classnames"
import axiosInstance, { THEME_TYPE } from "@/axiosfolder"
import { useLocation } from "@reach/router"
import { getShoppingCartData } from "@/redux/reducers/shoppingCartReducer"
import RenderOnViewportEntry from "@/components/common/RenderOnViewportEntry"
const BullionmarkHeader = lazy(() => import("@/components/header/BullionmarkHeader"));
const LazyHeader = lazy(() => import("@/components/header/index"))
const LazyBullionmarkFooter = lazy(() => import("@/components/footer/BullionmarkFooter"));
const LazyFooter = lazy(() => import('@/components/footer/index'));
import useragent from 'express-useragent';
import useRedirectTo404 from "@/hooks/useRedirectTo404"

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
interface ServerDataProps {
    categoryPageMetadata: any;
    items: any[];
    count: number;
    categories: any[];
    manufacturers: any[];
    price: any;
    specifications: any;
    configDetails: any;
    configDetailsForRedux: any;
    categoryData: any;
    isMobile: boolean
    redirectTo404?: boolean
}

interface Props {
    serverData: ServerDataProps;
    props: any; // Adjust according to the actual props type
}
function Category({ serverData, props }: Props) {
    const { isLoggedIn } = useAppSelector((state) => state.homePage)
    const location = useLocation();
    const searchParams = useMemo(() => new URLSearchParams(location?.search), [location]);
    const isSmallScreen = serverData?.isMobile
    const [page, setPage] = useState(searchParams.has("page") ? parseInt(searchParams.get("page")!) : 1);
    const dispatch = useAppDispatch();

    const checkLoadingStatus = useAppSelector(state => state.category.loading);
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
    }, [location.pathname])

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
    }, [clearFilters, debounceFilter, debouncePrice, isPriceChanged])
    const keywordData = useMemo(() => {
        return searchParams.get("keyword")
    }, [searchParams.get("keyword")])
    // this below use effect not using in ssr/csr
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
    //========================================================= 
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
    const keyWords = serverData?.categoryPageMetadata?.metaKeywords?.split(',')?.length > 0 ? serverData?.categoryPageMetadata?.metaKeywords?.split(',') : []
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
    useEffect(() => {
        dispatch(setConfigDetails(serverData?.configDetailsForRedux));
        if (serverData?.configDetails?.Store_FaviconURL?.value) {
            const faviconUrl = serverData?.configDetails?.Store_FaviconURL?.value; // Assuming API response contains favicon URL
            // Update favicon dynamically
            const link: any =
                document.querySelector("link[rel='icon']") ||
                document.createElement("link");
            link.rel = "icon";
            link.href = faviconUrl;
            document.head.appendChild(link);
        }
    }, [serverData])
    const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down("sm"));
    const [isPending, startTransition] = useTransition();
    const [isRendering, setIsRendering] = useState(true);
    useEffect(() => {
        startTransition(() => {
            // Simulating initial data fetch
            setTimeout(() => setIsRendering(false), 3500);
        });
    }, [])
    useRedirectTo404(serverData)
    return (
        <>
            {isRendering && (
                <>
                    <Skeleton
                        height={"124px"}
                        width={"100%"}
                        style={{ marginBottom: !isMobile ? "32px" : "24px", transform: "scale(1)" }}
                    /></>)}
            {!isRendering && <Suspense fallback={
                <Skeleton
                    height={"124px"}
                    width={"100%"}
                    style={{ marginBottom: !isMobile ? "32px" : "24px", transform: "scale(1)" }} />}>
                {process.env.THEME_TYPE === "1" ? <BullionmarkHeader /> : <LazyHeader />}
            </Suspense>}
            {checkLoadingStatus && <Loader open={checkLoadingStatus} />}
            <Seo
                title={(serverData?.categoryPageMetadata?.metaTitle ?? '')}
                isItShopPage={true}
                keywords={[`gatsby`, `tailwind`, `react`, `tailwindcss`, 'Travel', 'Qmit', 'gold', 'metal', ...keyWords]}
                description={serverData?.categoryPageMetadata?.metaDescription}
                lang="en"
                configDetailsState={serverData?.configDetails}
            />
            <Container id="PageCategory" className={classNames({ "BmkCategoryPage": THEME_TYPE === "1" },)}>
                {isSmallScreen ? (
                    <Stack className="CategoryHeader">
                        <SortBy isSmallScreen={isSmallScreen} />
                        <CategoryFilters isPriceChanged={isPriceChanged} setIsPriceChanged={setIsPriceChanged} categoryData={serverData?.categoryData} isSmallScreen={isSmallScreen} />
                    </Stack>
                ) : null}
                <Stack className="MainContent">
                    {!isSmallScreen ? <CategoryFilters isPriceChanged={isPriceChanged} setIsPriceChanged={setIsPriceChanged} categoryData={serverData?.categoryData} isSmallScreen={isSmallScreen} /> : null}
                    <ProductList page={page} setPage={setPage} categoryData={serverData?.categoryData} />
                </Stack>
            </Container>
            <RenderOnViewportEntry
                rootMargin="200px"
                threshold={0.25}
                minHeight={800}
            >
                {process.env.THEME_TYPE === "1" ? <LazyBullionmarkFooter /> : <LazyFooter />}
            </RenderOnViewportEntry>
        </>
    )
}

export default Category
export async function getServerData(context: { params: any, query: any, headers: any }) {
    try {
        const ua = useragent.parse(context.headers.get('user-agent'));
        const isMobile = ua.isMobile ? true : false;
        const { params, query } = context;
        const { keyword } = query;
        const { 'category': category } = params;
        const pageNo = query.page ? parseInt(query.page, 10) - 1 : 0;

        const selectedPrice = null; // Placeholder: Get selected price based on your logic
        const selectedFilters = {}; // Placeholder: Get selected filters based on your logic

        const commonArgument = {
            pageNo,
            filters: { minPrice: selectedPrice?.[0], maxPrice: selectedPrice?.[1], specification: selectedFilters }
        };

        const argumentForService = {
            url: keyword ? ENDPOINTS.search : `${ENDPOINTS.getCategoryData}/${category}`,
            body: keyword
                ? { ...requestBodyDefault, search: keyword, ...commonArgument }
                : { ...requestBodyDefault, ...commonArgument }
        };


        const [
            configDetailsResponse,
            categoryDataResponse,
        ] = await Promise.all([
            axiosInstance.get(ENDPOINTS.getConfigStore),
            axiosInstance.post(argumentForService.url, argumentForService.body)
        ]);
        const configDetails = configDetailsResponse.data.data;
        const categoryData = categoryDataResponse.data.data;
        const additionalField = categoryData.additionalField;
        const categoryPageMetadata = {
            metaDescription: categoryData?.metaDescription,
            metaKeywords: categoryData?.metaKeywords,
            metaTitle: categoryData?.metaTitle,
        };

        const filtersData = additionalField?.filters || {};
        const items = categoryData.items || [];
        categoryData.sortedItems = categoryData.items || [];
        const count = categoryData.count || 0;
        const categories = filtersData.categories || [];
        const manufacturers = filtersData.manufactureres || [];
        const price = filtersData.price || {};
        const specifications = filtersData.sepecifications || {};
        categoryData.specifications = filtersData.sepecifications || {};
        categoryData.loading = false
        categoryData.categories = filtersData.categories
        return {
            props: {
                isMobile,
                configDetails: configDetails?.reduce((acc: any, curr: any) => {
                    acc[curr.key] = curr
                    return acc
                }, {}),
                configDetailsForRedux: configDetails,
                categoryData: categoryData,
                categoryPageMetadata,
                items,
                count,
                categories,
                manufacturers,
                price,
                specifications,
            },
        };
    } catch (error) {
        console.error("🚀 ~ getServerData ~ error:", error);
        console.log("getServerData -- inside catch block", Date.now());
        return {
            status: 500,
            headers: {},
            props: {
                redirectTo404: true
            },
        };
    }
}