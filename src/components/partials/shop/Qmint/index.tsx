import React, { Suspense, lazy, useEffect, useState } from "react"
const LookingFor = lazy(() => import("./LookingFor"))
const PopularProducts = lazy(() => import("./PopularProducts"))
const DiscoverTreasure = lazy(() => import("./DiscoverTreasure"))
const CloserLook = lazy(() => import("./CloserLook"))
import FeaturedProducts from "./FeaturedProducts"
import { ENDPOINTS } from "@/utils/constants"
import useAPIoneTime from "@/hooks/useAPIoneTime"
import { HomePageSectionDetails, serProgressLoaderStatus, setScrollPosition } from "@/redux/reducers/homepageReducer"
import { useAppDispatch, useAppSelector, useToggle } from "@/hooks"
import { useMediaQuery } from "@mui/material";
import Layout from "@/components/common/Layout";
import useUserDetailsFromToken from "@/hooks/useUserDetailsFromToken";
import Toaster from "@/components/common/Toaster";
import Loader from "@/components/common/Loader";
import useAlertPopUp from "@/hooks/useAlertPopUp";
import SessionExpiredDialog from "@/components/header/SessionExpiredDialog";
import ProductsSlider from "@/components/partials/shop/Qmint/ProductsSlider";
import Seo from "@/components/common/Seo"
import Banner from "./Banner"

const QmintShop=()=> {
    const dispatch = useAppDispatch()
    const { configDetails: configDetailsState, openToaster, loading } = useAppSelector((state) => state.homePage)
    const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down('sm'))
    const [openSessionExpireDialog, toggleSessionExpireDialog] = useToggle(false)
    const keyWords = configDetailsState?.Store_ShopPage_Meta_Keywords?.value?.split(',')?.length > 0 ? configDetailsState?.Store_ShopPage_Meta_Keywords?.value?.split(',') : []

    const [body] = useState({
        "search": "",
        "pageNo": 0,
        "pageSize": -1,
        "sortBy": "",
        "sortOrder": "",
        "filters": {
            "includeInTopMenu": true
        }
    })

    useEffect(() => {
        return () => {
            dispatch(setScrollPosition(window.scrollY));
        }
    }, [])

    useAPIoneTime({ service: HomePageSectionDetails, endPoint: ENDPOINTS.homePageSection })
    // useAPIoneTime({ service: CategoriesListDetails, endPoint: ENDPOINTS.topCategoriesListWithSubCategories, body })
    useUserDetailsFromToken()
    const [wait1, setWait1] = useState(false)
    const [wait2, setWait2] = useState(false)
    const [wait3, setWait3] = useState(false)
    useEffect(() => {
        dispatch(serProgressLoaderStatus(true))
        const timeout1 = setTimeout(() => {
            setWait1(true);
        }, 400); // Wait for 300ms before rendering the first component
        const timeout2 = setTimeout(() => {
            setWait2(true);
        }, 900);
        const timeout3 = setTimeout(() => {
            setWait3(true)
        }, 1100);
        return () => {
            dispatch(serProgressLoaderStatus(false))
            clearTimeout(timeout1)
            clearTimeout(timeout2)
            clearTimeout(timeout3)
        }
    }, [])
    useAlertPopUp({ pageName: 'Home', openPopup: toggleSessionExpireDialog })
    return (
        <Layout>
            <>
                {loading && <Loader open={loading} />}
                {openToaster && <Toaster />}
                <Seo
                    keywords={[`gatsby`, `tailwind`, `react`, `tailwindcss`, 'Travel', 'Qmit', 'gold', 'metal', ...keyWords]}
                    lang="en"
                    isItShopPage={true}
                    description={configDetailsState?.Store_ShopPage_Meta_Description?.value} />
                {/* {isMobile && <Suspense fallback={<></>}> <MobileSecondaryMenu /></Suspense>} */}

                {configDetailsState?.Sliders_ShopHomepage_Enable?.value === false || isMobile ? null : <Banner />}
                <Suspense fallback={<></>}> <ProductsSlider /></Suspense>
                {configDetailsState?.["ShopHomepage_Section_2_Featured_Products_Enable"]?.value !== false && <Suspense fallback={<></>}> <FeaturedProducts /></Suspense>}
                {configDetailsState?.["ShopHomepage_Section_3_Three_pics_in_a_rows_Enable"]?.value !== false && <Suspense fallback={<></>}> <LookingFor /></Suspense>}
                {configDetailsState?.["ShopHomepage_Section_4_Popular_Products_Enable"]?.value !== false && <Suspense fallback={<></>}><PopularProducts /></Suspense>}
                {configDetailsState?.["Shoppage_Section_5_One_pic_and_content_Enable"]?.value !== false && <Suspense fallback={<></>}><DiscoverTreasure /></Suspense>}
                {configDetailsState?.["ShopHomepage_Section_6_Three_posts_in_a_row_Enable"]?.value !== false && <Suspense fallback={<></>}><CloserLook /></Suspense>}
                {openSessionExpireDialog && <SessionExpiredDialog
                    open={openSessionExpireDialog}
                    onClose={toggleSessionExpireDialog}
                />}
            </>
        </Layout>
    )
}
// Implement getServerData for QmintShop
QmintShop.getServerData = async (context:any) => {
    // Fetch data for QmintShop
    return {
      props: {
        // Your data here
      },
    };
  };
export default QmintShop
