import React, { Suspense, lazy, useEffect, useState } from "react"
import { Skeleton } from "@mui/material";
import Seo from "../components/common/Seo"
import Banner from '../components/partials/frontPage/Banner'
const MobileSecondaryMenu = lazy(() => import('../components/header/MobileSecondaryMenu'));
const LookingFor = lazy(() => import("../components/partials/home/LookingFor"))
const PopularProducts = lazy(() => import("../components/partials/home/PopularProducts"))
const DiscoverTreasure = lazy(() => import("../components/partials/home/DiscoverTreasure"))
import LazyHeader from "../components/header/FrontHeader"
const CloserLookMain = lazy(() => import("../components/partials/frontPage/CloserLookMain"))
const TheJournal = lazy(() => import("../components/partials/frontPage/TheJournal"))
const Locations = lazy(() => import("../components/partials/frontPage/Locations"))
const Adventure = lazy(() => import("../components/partials/frontPage/Adventure"))
const Experience = lazy(() => import("../components/partials/frontPage/Experience"))
const KnowMore = lazy(() => import("../components/partials/frontPage/KnowMore"))
const LatestStories = lazy(() => import("../components/partials/frontPage/LatestStories"))
const Gallery = lazy(() => import("../components/partials/frontPage/Gallery"))
const LazyFooter = lazy(() => import('../components/footer/FrontFooter'));
import FeaturedProducts from "../components/partials/home/FeaturedProducts"
import { ENDPOINTS } from "@/utils/constants"
import useAPIoneTime from "@/hooks/useAPIoneTime"
import { CategoriesListDetails, HomePageSectionDetails, configDetails, serProgressLoaderStatus, setConfigDetails, setMainHomePageData, setScrollPosition } from "@/redux/reducers/homepageReducer"
import { useAppDispatch, useAppSelector } from "@/hooks"
import { Box, useMediaQuery } from "@mui/material";
import Layout from "@/components/common/Layout";
import useUserDetailsFromToken from "@/hooks/useUserDetailsFromToken";
import Toaster from "@/components/common/Toaster";
import Loader from "@/components/common/Loader";
import MainLayout from "@/components/common/MainLayout";
import RenderOnViewportEntry from "@/components/common/RenderOnViewportEntry";
import axios from "axios";

function MainHomePage({ serverData }: { serverData: { configDetails: any,mainHomePageData:any, bannerData:any } }) {
    const dispatch = useAppDispatch()
    const { configDetails: configDetailsState, openToaster, scrollPosition, loading, mainHomePageData } = useAppSelector((state) => state.homePage)
    useEffect(() => {
        dispatch(setConfigDetails(serverData.configDetails))
        dispatch(setMainHomePageData(serverData.mainHomePageData))
    }, [serverData])
    useEffect(() => {
        return () => {
            dispatch(setScrollPosition(window.scrollY));
        }
    }, [])

    useUserDetailsFromToken()
    useEffect(() => {
        dispatch(serProgressLoaderStatus(true))
        return () => {
            dispatch(serProgressLoaderStatus(false))
        }
    }, [])
    // const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down('md'))
    // useAPIoneTime({ service: HomePageSectionDetails, endPoint: ENDPOINTS.homePageSection })
    // useAPIoneTime({ service: configDetails, endPoint: ENDPOINTS.getConfigStore })
    return (
        <div className="flex flex-col min-h-screen">
            {/* <Suspense fallback={<Box id="HeaderWrapper"></Box>}> */}
            <MainLayout>
                <Loader open={loading} />
                {openToaster && <Toaster />}
                <Seo
                    keywords={[`gatsby`, `tailwind`, `react`, `tailwindcss`, 'Travel','Qmit','gold','metal']}
                    title="Home"
                    lang="en"
                />
                {/* {isMobile && <Suspense fallback={<></>}> <MobileSecondaryMenu /></Suspense>} */}
                <Box className="FrontPage">
                    {/* {configDetailsState?.sliderenableinhome?.value === false ? null : } */}
                    <RenderOnViewportEntry rootMargin={'600px'} threshold={0.25} minHeight={'100vh'}>{configDetailsState?.sliderenableinhome?.value ? <Banner bannerData={serverData.bannerData}/> : null}</RenderOnViewportEntry>
                    <RenderOnViewportEntry rootMargin={'600px'} threshold={0.25} minHeight={774}><Locations /></RenderOnViewportEntry>
                    <RenderOnViewportEntry rootMargin={'600px'} threshold={0.25} minHeight={1025}><Adventure /></RenderOnViewportEntry>
                    <RenderOnViewportEntry rootMargin={'600px'} threshold={0.25} minHeight={614}><Experience /></RenderOnViewportEntry>
                    <RenderOnViewportEntry rootMargin={'600px'} threshold={0.25} minHeight={973}><KnowMore /></RenderOnViewportEntry>
                    <RenderOnViewportEntry rootMargin={'600px'} threshold={0.25} minHeight={731}><LatestStories /></RenderOnViewportEntry>
                    <RenderOnViewportEntry rootMargin={'600px'} threshold={0.25} minHeight={844}><Gallery /></RenderOnViewportEntry>
                    <RenderOnViewportEntry rootMargin={'600px'} threshold={0.25} minHeight={875}><CloserLookMain /></RenderOnViewportEntry>
                    <RenderOnViewportEntry rootMargin={'600px'} threshold={0.25} minHeight={1083}><TheJournal /></RenderOnViewportEntry>
                </Box>
            </MainLayout>
        </div>
    )
}

export default MainHomePage
export const getServerData = async () => {
    try {
        const endpointBaseURL = "https://qmapistaging.qmint.com/api/v1/";
        const headers = {
            "Storecode": "12",
            "Validkey": "MBXCSv6SGIx8mx1tHvrMw5b0H3R91eMmtid4c2ItRHRKL4Pnzo"
        };

        // Use axios.get to fetch data and extract response.data
        const [configDetailsResponse,
             mainHomePageDataResponse,
             bannerDataResponse
            ] = await Promise.all([
            axios.get(endpointBaseURL + ENDPOINTS.getConfigStore, { headers }),
            axios.get(endpointBaseURL + ENDPOINTS.mainHomePage, { headers }),
            axios.get(endpointBaseURL + ENDPOINTS.getSlider.replace('typeEnum', '0'), { headers }),
        ]);

        // Extract response.data from axios responses
        const configDetails = configDetailsResponse.data.data;
        const mainHomePageData = mainHomePageDataResponse.data.data;
        const bannerData = bannerDataResponse.data.data
        return {
            props: {
                configDetails,
                mainHomePageData,
                bannerData
            }
        };
    } catch (error) {
        console.error("🚀 ~ getServerData ~ error:", error);
        return {
            status: 500,
            headers: {},
            props: {}
        };
    }
};
