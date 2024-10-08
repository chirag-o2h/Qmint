import React, { Suspense, lazy, useEffect, useMemo, useState, useTransition } from "react"
const LookingFor = lazy(() => import("./LookingFor"))
const PopularProducts = lazy(() => import("./PopularProducts"))
const DiscoverTreasure = lazy(() => import("./DiscoverTreasure"))
const CloserLook = lazy(() => import("./CloserLook"))
const FeaturedProducts = lazy(() => import("./FeaturedProducts"))
import { ENDPOINTS } from "@/utils/constants"
// import useAPIoneTime from "@/hooks/useAPIoneTime"
import { configDetails, HomePageSectionDetails, serProgressLoaderStatus, setConfigDetails, setScrollPosition } from "@/redux/reducers/homepageReducer"
import { useAppDispatch, useAppSelector, useToggle } from "@/hooks"
import { Skeleton, useMediaQuery } from "@mui/material";
// import Layout from "@/components/common/Layout";
import useUserDetailsFromToken from "@/hooks/useUserDetailsFromToken";
import Toaster from "@/components/common/Toaster";
// import Loader from "@/components/common/Loader";
import useAlertPopUp from "@/hooks/useAlertPopUp";
const SessionExpiredDialog = lazy(() => import("@/components/header/SessionExpiredDialog"));
const ProductsSlider = lazy(() => import("@/components/partials/shop/Qmint/ProductsSlider"));
import Seo from "@/components/common/Seo"
import Banner from "./Banner"
import useragent from 'express-useragent';
const Header = lazy(() => import("../../../header/index"))
import axiosInstance from "@/axiosfolder"
import RenderOnViewportEntry from "@/components/common/RenderOnViewportEntry"
const LazyFooter = lazy(() => import('../../../footer/index'));
interface IServerData {
    isMobile: boolean,
    configDetails: any,
    configDetailsForRedux: any,
    productData: any,
    bannerSliderData: any
    homePageSectionDetails: any
}
const QmintShop = ({ serverData }: { serverData: IServerData }) => {
    const dispatch = useAppDispatch()
    const [isRendering, setIsRendering] = useState(true);
    // const { configDetails: configDetailsState, openToaster, loading } = useAppSelector((state) => state.homePage)
    const { openToaster } = useAppSelector((state) => state.homePage)
    const [openSessionExpireDialog, toggleSessionExpireDialog] = useToggle(false)
    // const keyWords = serverData?.configDetails?.Store_ShopPage_Meta_Keywords?.value?.split(',')?.length > 0 ? serverData?.configDetails?.Store_ShopPage_Meta_Keywords?.value?.split(',') : []
    const keyWords = useMemo(() => {
        return (
            serverData?.configDetails?.Store_ShopPage_Meta_Keywords?.value?.split(",") || []
        );
    }, [serverData?.configDetails]);

    // const [body] = useState({
    //     "search": "",
    //     "pageNo": 0,
    //     "pageSize": -1,
    //     "sortBy": "",
    //     "sortOrder": "",
    //     "filters": {
    //         "includeInTopMenu": true
    //     }
    // })
    const [isPending, startTransition] = useTransition();
    useEffect(() => {
        startTransition(() => {
            // Simulating initial data fetch
            setTimeout(() => setIsRendering(false), 3500);
        });
        return () => {
            dispatch(setScrollPosition(window.scrollY));
        }
    }, [])
    // this is called on the server side
    // useAPIoneTime({ service: HomePageSectionDetails, endPoint: ENDPOINTS.homePageSection })
    // this was not calling perviously too need to check the below api use case 
    // useAPIoneTime({ service: CategoriesListDetails, endPoint: ENDPOINTS.topCategoriesListWithSubCategories, body })
    useUserDetailsFromToken()
    useEffect(() => {
        dispatch(serProgressLoaderStatus(true))

        return () => {
            dispatch(serProgressLoaderStatus(false))
        }
    }, [])
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
    }, [serverData]);
    useAlertPopUp({ pageName: 'Home', openPopup: toggleSessionExpireDialog })
    return (
        <>
            <Seo
                keywords={[
                    "gatsby",
                    "tailwind",
                    "react",
                    "tailwindcss",
                    "Travel",
                    "Qmit",
                    "gold",
                    "metal",
                    ...keyWords,
                ]}
                lang="en"
                isItShopPage={true}
                description={
                    serverData?.configDetails?.Store_ShopPage_Meta_Description?.value
                }
                configDetailsState={serverData?.configDetails}
            />
            {!isRendering && <Suspense fallback={
                <Skeleton
                    height={"124px"}
                    width={"100%"}
                    style={{ marginBottom: !serverData?.isMobile ? "0px" : "0px", transform: "scale(1)", position: "sticky", top: '0px' }}
                />
            }><Header /></Suspense>}
            {
                isRendering &&
                (
                    <Skeleton
                        height={"124px"}
                        width={"100%"}
                        style={{ marginBottom: !serverData?.isMobile ? "0px" : "0px", transform: "scale(1)", zIndex: 9999, background: "gray" }}
                    />
                )}
            {/* <Layout> */}
            {/* {loading && <Loader open={loading} />} */}
            {openToaster && <Toaster />}
            <Seo
                keywords={[`gatsby`, `tailwind`, `react`, `tailwindcss`, 'Travel', 'Qmit', 'gold', 'metal', ...keyWords]}
                lang="en"
                isItShopPage={true}
                description={serverData?.configDetails?.Store_ShopPage_Meta_Description?.value} />
            {/* {isMobile && <Suspense fallback={<></>}> <MobileSecondaryMenu /></Suspense>} */}

            {serverData?.configDetails?.Sliders_ShopHomepage_Enable?.value === false || serverData?.isMobile ? null :
                <Banner bannerData={serverData?.bannerSliderData} isMobile={serverData?.isMobile} />
            }
            <RenderOnViewportEntry rootMargin="200px"
                threshold={0.25}
                minHeight={800} fallback={<></>}> <ProductsSlider isMobile={serverData?.isMobile} homePageSectionDetails={serverData?.homePageSectionDetails} /></RenderOnViewportEntry>
            {serverData?.configDetails?.["ShopHomepage_Section_2_Featured_Products_Enable"]?.value !== false && <RenderOnViewportEntry rootMargin="200px"
                threshold={0.25}
                minHeight={800}> <FeaturedProducts configDetails={serverData?.configDetails} isMobile={serverData?.isMobile} /></RenderOnViewportEntry>}
            {serverData?.configDetails?.["ShopHomepage_Section_3_Three_pics_in_a_rows_Enable"]?.value !== false && <RenderOnViewportEntry rootMargin="200px"
                threshold={0.25}
                minHeight={800}> <LookingFor sectionDetails={serverData?.homePageSectionDetails} /></RenderOnViewportEntry>}
            {serverData?.configDetails?.["ShopHomepage_Section_4_Popular_Products_Enable"]?.value !== false && <RenderOnViewportEntry rootMargin="200px"
                threshold={0.25}
                minHeight={800}><PopularProducts configDetails={serverData?.configDetails} /></RenderOnViewportEntry>}
            {serverData?.configDetails?.["Shoppage_Section_5_One_pic_and_content_Enable"]?.value !== false && <RenderOnViewportEntry rootMargin="200px"
                threshold={0.25}
                minHeight={800}><DiscoverTreasure sectionDetails={serverData?.homePageSectionDetails} /></RenderOnViewportEntry>}
            {serverData?.configDetails?.["ShopHomepage_Section_6_Three_posts_in_a_row_Enable"]?.value !== false && <RenderOnViewportEntry rootMargin="200px"
                threshold={0.25}
                minHeight={800}><CloserLook configDetails={serverData?.configDetails} homePageSectionDetails={serverData?.homePageSectionDetails} /></RenderOnViewportEntry>}
            {openSessionExpireDialog && <SessionExpiredDialog
                open={openSessionExpireDialog}
                onClose={toggleSessionExpireDialog}
            />}
            {/* </Layout> */}
            <RenderOnViewportEntry
                rootMargin="200px"
                threshold={0.25}
                minHeight={800}
            >
                <LazyFooter />
            </RenderOnViewportEntry>
        </>
    )
}
// Implement getServerData for QmintShop
QmintShop.getServerData = async (context: any) => {
    try {
        // Parse the user-agent from the context
        const ua = useragent.parse(context.headers.get('user-agent'));
        const isMobile = ua.isMobile ? true : false;
        const dataforbody = {
            search: "",
            pageNo: 0,
            pageSize: -1,
            sortBy: "",
            sortOrder: "",
            filters: {
                isFeatureProduct: true,
            },
        };

        console.log("getServerData -- before fetching data", Date.now());
        const [
            configDetailsResponse,
            // productResponse,
            bannerSliderResponse,
            homePageSectionDetailsResponse
        ] = await Promise.all([
            axiosInstance.get(ENDPOINTS.getConfigStore),
            // axiosInstance.post(ENDPOINTS.getProduct, dataforbody),
            axiosInstance.get(ENDPOINTS.getSlider.replace('typeEnum', '1')),
            axiosInstance.get(ENDPOINTS.homePageSection)
        ]);

        const configDetails = configDetailsResponse.data.data;
        // const productData = productResponse.data.data;
        const bannerSliderData = bannerSliderResponse?.data
        const homePageSectionDetails = homePageSectionDetailsResponse?.data?.data
        // let priceForEachId = null;

        // if (productData?.data?.items?.length > 0) {
        //     const ids = productData.data.items.map((product:any) => product.productId);
        //     const priceResponse = await axiosInstance.post(ENDPOINTS.productPrices, { productIds: ids });
        //     const priceData = priceResponse.data;

        //     priceForEachId = {};
        //     priceData?.data?.forEach((product:any) => {
        //         priceForEachId[product.productId] = product;
        //     });
        // }

        console.log("getServerData -- before returning props", isMobile, Date.now());

        return {
            props: {
                isMobile,
                configDetails: configDetails?.reduce((acc: any, curr: any) => {
                    acc[curr.key] = curr
                    return acc
                }, {}),
                configDetailsForRedux: configDetails,
                // productData: productData,
                bannerSliderData: bannerSliderData,
                homePageSectionDetails
                // priceForEachId,
            },
        };
    } catch (error) {
        console.error("🚀 ~ getServerData ~ error:", error);
        console.log("getServerData -- inside catch block", Date.now());
        return {
            status: 500,
            headers: {},
            props: {},
        };
    }
};
export default QmintShop
