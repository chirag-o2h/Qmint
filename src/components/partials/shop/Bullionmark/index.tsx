import React, { lazy, Suspense, useMemo } from "react";
import { useAppSelector } from "@/hooks";
import Seo from "@/components/common/Seo";
import useAPIoneTime from "@/hooks/useAPIoneTime";
import { getBullionMarkShopPageSections } from "@/redux/reducers/homepageReducer";
import BannerSlider from "../../landing-page/Bullionmark/BannerSlider";
import { Box, useMediaQuery } from "@mui/material";
import useUserDetailsFromToken from "@/hooks/useUserDetailsFromToken";
import RenderOnViewportEntry from "@/components/common/RenderOnViewportEntry";

const Layout = lazy(() => import("@/components/common/Layout"));
const Loader = lazy(() => import("@/components/common/Loader"));
const Toaster = lazy(() => import("@/components/common/Toaster"));
const BestCategorySlider = lazy(() => import("./BestCategorySlider"));
const BmkFeaturedProductsSlider = lazy(() => import("./BmkFeaturedProductsSlider"));
const ThreePicsRow = lazy(() => import("./ThreePicsRow"));
const OneBigPicAndContent = lazy(() => import("./OneBigPicAndContent"));
const BmkPopularProductSlider = lazy(() => import("./BmkPopularProductSlider"));
const ExclusiveJourneys = lazy(() => import("../../landing-page/Bullionmark/ExclusiveJourneys"));
const InspiringStories = lazy(() => import("../../landing-page/Bullionmark/InspiringStories"));

function BullionmarkShop() {
    const { configDetails: configDetailsState, openToaster, loading, bmkShopPageSections } = useAppSelector((state) => state.homePage);
    useAPIoneTime({ service: getBullionMarkShopPageSections });
    useUserDetailsFromToken();

    const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));
    const keyWords = useMemo(() => {
        return configDetailsState?.Store_ShopPage_Meta_Keywords?.value?.split(',') || [];
    }, [configDetailsState]);

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Layout>
                {loading && <Loader open={loading} />}
                {openToaster && <Toaster />}
                <Seo
                    keywords={['gatsby', 'tailwind', 'react', 'tailwindcss', 'Travel', 'Qmit', 'gold', 'metal', ...keyWords]}
                    lang="en"
                    isItShopPage={true}
                    description={configDetailsState?.Store_ShopPage_Meta_Description?.value}
                />
                {!isMobile && configDetailsState?.Sliders_ShopHomepage_Enable?.value && <BannerSlider isItShopPage={true} />}
                <BestCategorySlider
                    pageData={bmkShopPageSections}
                    PaddingClass={!isMobile && configDetailsState?.Sliders_ShopHomepage_Enable?.value ? "" : "TopBannerAbsent"}
                    title={configDetailsState?.["ShopHomepage_Section_1_Featured_Categories_Title"]?.value}
                />
                <RenderOnViewportEntry rootMargin="200px" threshold={0.25} minHeight={900}>
                    <BmkFeaturedProductsSlider
                        title={configDetailsState?.["ShopHomepage_Section_2_Featured_Products_Title"]?.value}
                        description={configDetailsState?.["ShopHomepage_Section_2_Featured_Products_Subtitle"]?.value}
                    />
                </RenderOnViewportEntry>
                <RenderOnViewportEntry rootMargin="200px" threshold={0.25} minHeight={600}>
                    <ThreePicsRow />
                </RenderOnViewportEntry>
                <RenderOnViewportEntry rootMargin="200px" threshold={0.25} minHeight={550}>
                    <OneBigPicAndContent />
                </RenderOnViewportEntry>
                <RenderOnViewportEntry rootMargin="200px" threshold={0.25} minHeight={750}>
                    <BmkPopularProductSlider
                        title={configDetailsState?.["ShopHomepage_Section_5_Popular_Products_Title"]?.value}
                        description={configDetailsState?.["ShopHomepage_Section_5_Popular_Products_Subtitle"]?.value}
                    />
                </RenderOnViewportEntry>
                <RenderOnViewportEntry rootMargin="200px" threshold={0.25} minHeight={800}>
                    <ExclusiveJourneys data={bmkShopPageSections?.shopHomepage_Section_6_Two_pics_and_content} />
                </RenderOnViewportEntry>
                <RenderOnViewportEntry rootMargin="200px" threshold={0.25} minHeight={800}>
                    <InspiringStories
                        title={configDetailsState?.["ShopHomepage_Section_7_Two_pics_in_a_rows_Title"]?.value}
                        data={bmkShopPageSections?.shopHomepage_Section_7_Two_pics_in_a_rows}
                        className="ShopInspiringStories"
                    />
                </RenderOnViewportEntry>
            </Layout>
        </Suspense>
    );
}

export default BullionmarkShop;