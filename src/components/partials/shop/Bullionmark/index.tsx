import React, { Suspense } from "react"

import { useAppDispatch, useAppSelector, useToggle } from "@/hooks"


import Layout from "@/components/common/Layout";
import Loader from "@/components/common/Loader";
import Toaster from "@/components/common/Toaster";
import Seo from "@/components/common/Seo";
import useAPIoneTime from "@/hooks/useAPIoneTime";
import { getBullionMarkShopPageSections } from "@/redux/reducers/homepageReducer";
import BannerSlider from "../../landing-page/Bullionmark/BannerSlider";
import BestCategorySlider from "./BestCategorySlider";
import BmkFeaturedProductsSlider from "./BmkFeaturedProductsSlider";
import ThreePicsRow from "./ThreePicsRow";
import OneBigPicAndContent from "./OneBigPicAndContent";
import BmkPopularProductSlider from "./BmkPopularProductSlider";
import ExclusiveJourneys from "../../landing-page/Bullionmark/ExclusiveJourneys";
import InspiringStories from "../../landing-page/Bullionmark/InspiringStories";
import { useMediaQuery } from "@mui/material";

function BullionmarkShop() {
    const { configDetails: configDetailsState, openToaster, loading, bmkShopPageSections } = useAppSelector((state) => state.homePage)
    useAPIoneTime({ service: getBullionMarkShopPageSections })
    const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down('sm'))
    const keyWords = configDetailsState?.Store_ShopPage_Meta_Keywords?.value?.split(',')?.length > 0 ? configDetailsState?.Store_ShopPage_Meta_Keywords?.value?.split(',') : []

    return (
        <Layout>
            <>
                <Loader open={loading} />
                {openToaster && <Toaster />}
                <Seo
                    keywords={[`gatsby`, `tailwind`, `react`, `tailwindcss`, 'Travel', 'Qmit', 'gold', 'metal', ...keyWords]}
                    title={configDetailsState?.Store_ShopPage_Title?.value}
                    lang="en"
                    description={configDetailsState?.Store_ShopPage_Meta_Description?.value} />
                {configDetailsState?.Sliders_ShopHomepage_Enable?.value === false || isMobile ? null : <Suspense fallback={<></>}><BannerSlider isItShopPage={true} /></Suspense>}
                <Suspense fallback={<></>}> <BestCategorySlider pageData={bmkShopPageSections} PaddingClass={configDetailsState?.Sliders_ShopHomepage_Enable?.value === false || isMobile ? "TopBannerAbsent" : ""} title={configDetailsState?.["ShopHomepage_Section_1_Featured_Categories_Title"]?.value} /></Suspense>
                <Suspense fallback={<></>}> <BmkFeaturedProductsSlider title={configDetailsState?.["ShopHomepage_Section_2_Featured_Products_Title"]?.value} description={configDetailsState?.["ShopHomepage_Section_2_Featured_Products_Subtitle"]?.value} /></Suspense>
                <Suspense fallback={<></>}> <ThreePicsRow /></Suspense>
                <Suspense fallback={<></>}> <OneBigPicAndContent /></Suspense>
                <Suspense fallback={<></>}> <BmkPopularProductSlider title={configDetailsState?.["ShopHomepage_Section_5_Popular_Products_Title"]?.value} description={configDetailsState?.["ShopHomepage_Section_5_Popular_Products_Subtitle"]?.value} /></Suspense>
                <Suspense fallback={<></>}><ExclusiveJourneys data={bmkShopPageSections?.shopHomepage_Section_6_Two_pics_and_content
                } /></Suspense>
                <Suspense fallback={<></>}><InspiringStories title={configDetailsState?.["ShopHomepage_Section_7_Two_pics_in_a_rows_Title"]?.value} data={bmkShopPageSections?.shopHomepage_Section_7_Two_pics_in_a_rows} className='ShopInspiringStories' /></Suspense>
            </>
        </Layout>)
}

export default BullionmarkShop