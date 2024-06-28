import React, { Suspense, useEffect } from "react"

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
import { Box, useMediaQuery } from "@mui/material";
import useUserDetailsFromToken from "@/hooks/useUserDetailsFromToken";
import RenderOnViewportEntry from "@/components/common/RenderOnViewportEntry";

function BullionmarkShop() {
    const { configDetails: configDetailsState, openToaster, loading, bmkShopPageSections } = useAppSelector((state) => state.homePage)
    useAPIoneTime({ service: getBullionMarkShopPageSections })
    const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down('sm'))
    const keyWords = configDetailsState?.Store_ShopPage_Meta_Keywords?.value?.split(',')?.length > 0 ? configDetailsState?.Store_ShopPage_Meta_Keywords?.value?.split(',') : []
    useUserDetailsFromToken()

    return (
        <Suspense fallback={<Box id="HeaderWrapper">...</Box>}>
            <Layout>
                {loading && <Loader open={loading} />}
                {openToaster && <Toaster />}
                <Seo
                    keywords={[`gatsby`, `tailwind`, `react`, `tailwindcss`, 'Travel', 'Qmit', 'gold', 'metal', ...keyWords]}
                    lang="en"
                    isItShopPage={true}
                    description={configDetailsState?.Store_ShopPage_Meta_Description?.value} />
                    {configDetailsState?.Sliders_ShopHomepage_Enable?.value === false || isMobile ? null : <BannerSlider isItShopPage={true} />}
                    <RenderOnViewportEntry rootMargin={'200px'} threshold={0.25} minHeight={774}> <BestCategorySlider pageData={bmkShopPageSections} PaddingClass={configDetailsState?.Sliders_ShopHomepage_Enable?.value === false || isMobile ? "TopBannerAbsent" : ""} title={configDetailsState?.["ShopHomepage_Section_1_Featured_Categories_Title"]?.value} /></RenderOnViewportEntry>
                    <RenderOnViewportEntry rootMargin={'1000px'} threshold={0.25} minHeight={1025}> <BmkFeaturedProductsSlider title={configDetailsState?.["ShopHomepage_Section_2_Featured_Products_Title"]?.value} description={configDetailsState?.["ShopHomepage_Section_2_Featured_Products_Subtitle"]?.value} /></RenderOnViewportEntry>
                    <RenderOnViewportEntry rootMargin={'1500px'} threshold={0.25} minHeight={614}> <ThreePicsRow /></RenderOnViewportEntry>
                    <RenderOnViewportEntry rootMargin={'2000px'} threshold={0.25} minHeight={973}> <OneBigPicAndContent /></RenderOnViewportEntry>
                    <RenderOnViewportEntry rootMargin={'2500px'} threshold={0.25} minHeight={731}> <BmkPopularProductSlider title={configDetailsState?.["ShopHomepage_Section_5_Popular_Products_Title"]?.value} description={configDetailsState?.["ShopHomepage_Section_5_Popular_Products_Subtitle"]?.value} /></RenderOnViewportEntry>
                    <RenderOnViewportEntry rootMargin={'3000px'} threshold={0.25} minHeight={1083}> <ExclusiveJourneys data={bmkShopPageSections?.shopHomepage_Section_6_Two_pics_and_content
                    } /></RenderOnViewportEntry>
                    <RenderOnViewportEntry rootMargin={'3500px'} threshold={0.25} minHeight={875}> <InspiringStories title={configDetailsState?.["ShopHomepage_Section_7_Two_pics_in_a_rows_Title"]?.value} data={bmkShopPageSections?.shopHomepage_Section_7_Two_pics_in_a_rows} className='ShopInspiringStories' /></RenderOnViewportEntry>
            </Layout>
        </Suspense>
    )
}

export default BullionmarkShop