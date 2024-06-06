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

    return (
        <Layout>
            <>
                <Loader open={loading} />
                {openToaster && <Toaster />}
                <Seo
                    keywords={[`gatsby`, `tailwind`, `react`, `tailwindcss`]}
                    title="Home"
                    lang="en"
                />
                {configDetailsState?.Sliders_Homepage_Enable?.value === false || isMobile ? null : <Suspense fallback={<></>}><BannerSlider isItShopPage={true} /></Suspense>}
                <Suspense fallback={<></>}> <BestCategorySlider PaddingClass={configDetailsState?.Sliders_Homepage_Enable?.value === false || isMobile ? "TopBannerAbsent" : ""} /></Suspense>
                <Suspense fallback={<></>}> <BmkFeaturedProductsSlider /></Suspense>
                <Suspense fallback={<></>}> <ThreePicsRow /></Suspense>
                <Suspense fallback={<></>}> <OneBigPicAndContent /></Suspense>
                <Suspense fallback={<></>}> <BmkPopularProductSlider /></Suspense>
                <Suspense fallback={<></>}><ExclusiveJourneys data={bmkShopPageSections?.shopHomepage_Section_6_Two_pics_and_content
                } /></Suspense>
                <Suspense fallback={<></>}><InspiringStories data={bmkShopPageSections?.shopHomepage_Section_7_Two_pics_in_a_rows} className='ShopInspiringStories' /></Suspense>
            </>
        </Layout>)
}

export default BullionmarkShop