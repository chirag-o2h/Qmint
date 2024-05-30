import React, { Suspense, lazy, useEffect } from "react"
import Seo from "../components/common/Seo"
import Banner from "../components/partials/frontPage/Banner"
// const Banner = lazy(()=>import('../components/partials/frontPage/Banner'))
const CloserLookMain = lazy(() => import("../components/partials/frontPage/CloserLookMain"))
const TheJournal = lazy(() => import("../components/partials/frontPage/TheJournal"))
const Locations = lazy(() => import("../components/partials/frontPage/Locations"))
const Adventure = lazy(() => import("../components/partials/frontPage/Adventure"))
const Experience = lazy(() => import("../components/partials/frontPage/Experience"))
const KnowMore = lazy(() => import("../components/partials/frontPage/KnowMore"))
const LatestStories = lazy(() => import("../components/partials/frontPage/LatestStories"))
const Gallery = lazy(() => import("../components/partials/frontPage/Gallery"))
const MainLayout = lazy(() => import("@/components/common/MainLayout"))
// import MainLayout from "@/components/common/MainLayout";

import { ENDPOINTS } from "@/utils/constants"
import useAPIoneTime from "@/hooks/useAPIoneTime"
import { CategoriesListDetails, HomePageSectionDetails, configDetails, serProgressLoaderStatus, setConfigDetails, setMainHomePageData, setScrollPosition } from "@/redux/reducers/homepageReducer"
import { useAppDispatch, useAppSelector } from "@/hooks"
import { Box, useMediaQuery } from "@mui/material";
import Layout from "@/components/common/Layout";
import useUserDetailsFromToken from "@/hooks/useUserDetailsFromToken";
import Toaster from "@/components/common/Toaster";
import Loader from "@/components/common/Loader";
import RenderOnViewportEntry from "@/components/common/RenderOnViewportEntry";
// =================================================================
// import Loader from '@/components/common/Loader'
// import Seo from "../components/common/Seo"
import BannerSlider from '@/components/partials/home-bullionmark/BannerSlider'
// import React, { Suspense, lazy, useEffect, useState } from 'react'
// import { Toaster } from 'react-hot-toast'
// import { useAppDispatch, useAppSelector } from "@/hooks"
// import { Box } from '@mui/material'
import PlanningJourney from '@/components/partials/home-bullionmark/PlanningJourney'
import BestAdventures from '@/components/partials/home-bullionmark/BestAdventures'
import GetInspired from '@/components/partials/home-bullionmark/GetInspired'
import ExclusiveJourneys from '@/components/partials/home-bullionmark/ExclusiveJourneys'
import ExclusiveJourneysWithSlider from '@/components/partials/home-bullionmark/ExclusiveJourneysWithSlider'
import InspiringStories from '@/components/partials/home-bullionmark/InspiringStories'
import TravelInspiration from '@/components/partials/home-bullionmark/TravelInspiration'
import Newsletter from '@/components/partials/home-bullionmark/Newsletter'
import { getBullionMarkPageAPI } from '@/redux/reducers/homepageReducer'
// import useAPIoneTime from '@/hooks/useAPIoneTime'
import { STORE_CODE, THEME_TYPE } from "@/axiosfolder"

function MainHomePage(
    // { serverData }: { serverData: { configDetails: any,mainHomePageData:any, bannerData:any } }
) {
    const dispatch = useAppDispatch()
    const { configDetails: configDetailsState, openToaster, scrollPosition, loading, mainHomePageData } = useAppSelector((state) => state.homePage)
    // useEffect(() => {
    //     dispatch(setConfigDetails(serverData.configDetails))
    //     dispatch(setMainHomePageData(serverData.mainHomePageData))
    // }, [serverData])
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
    useAPIoneTime({ service: configDetails, endPoint: ENDPOINTS.getConfigStore })
    const keyWords = configDetailsState?.storemetakeywords?.value?.split(',')?.length > 0 ? configDetailsState?.storemetakeywords?.value?.split(',') : []
    return (
        <Suspense fallback={<Box id="HeaderWrapper">.</Box>}>
            <div className="flex flex-col min-h-screen">
                <MainLayout>
                    <Loader open={loading} />
                    {openToaster && <Toaster />}
                    <Seo
                        keywords={[`gatsby`, `tailwind`, `react`, `tailwindcss`, 'Travel', 'Qmit', 'gold', 'metal', ...keyWords]}
                        title={configDetailsState?.storetital?.value}
                        lang="en"
                        description={configDetailsState?.storemetadescription?.value}
                    />
                    {/* {isMobile && <Suspense fallback={<></>}> <MobileSecondaryMenu /></Suspense>} */}
                    <Box className="FrontPage">
                        {configDetailsState?.Sliders_Homepage_Enable?.value === false ? null :
                            <Banner bannerData={null} />
                        }
                        {/* <RenderOnViewportEntry rootMargin={'300px'} threshold={0.25} minHeight={'100vh'}>{configDetailsState?.Sliders_Homepage_Enable?.value === false ? null :<Banner bannerData={null} /> }</RenderOnViewportEntry> */}
                        <RenderOnViewportEntry rootMargin={'200px'} threshold={0.25} minHeight={774}><Locations /></RenderOnViewportEntry>
                        <RenderOnViewportEntry rootMargin={'200px'} threshold={0.25} minHeight={1025}><Adventure /></RenderOnViewportEntry>
                        <RenderOnViewportEntry rootMargin={'200px'} threshold={0.25} minHeight={614}><Experience /></RenderOnViewportEntry>
                        <RenderOnViewportEntry rootMargin={'200px'} threshold={0.25} minHeight={973}><KnowMore /></RenderOnViewportEntry>
                        <RenderOnViewportEntry rootMargin={'200px'} threshold={0.25} minHeight={731}><LatestStories /></RenderOnViewportEntry>
                        <RenderOnViewportEntry rootMargin={'200px'} threshold={0.25} minHeight={844}><Gallery /></RenderOnViewportEntry>
                        <RenderOnViewportEntry rootMargin={'200px'} threshold={0.25} minHeight={875}><CloserLookMain /></RenderOnViewportEntry>
                        <RenderOnViewportEntry rootMargin={'200px'} threshold={0.25} minHeight={1083}><TheJournal /></RenderOnViewportEntry>
                    </Box>
                </MainLayout>
            </div>
        </Suspense>
    )
}

function indexBulliomark() {
    const { configDetails: configDetailsState, openToaster, loading, bullionMarkPage } = useAppSelector((state) => state.homePage)
    const keyWords = configDetailsState?.storemetakeywords?.value?.split(',')?.length > 0 ? configDetailsState?.storemetakeywords?.value?.split(',') : []

    useAPIoneTime({ service: getBullionMarkPageAPI })
    useAPIoneTime({ service: configDetails, endPoint: ENDPOINTS.getConfigStore })

    return (
        <>
            <Suspense fallback={<Box id="HeaderWrapper">.</Box>}>
                <MainLayout>
                    <Loader open={loading} />
                    {openToaster && <Toaster />}
                    <Seo
                        keywords={[`gatsby`, `tailwind`, `react`, `tailwindcss`, 'Travel', 'Qmit', 'gold', 'metal', ...keyWords]}
                        title={configDetailsState?.storetital?.value}
                        lang="en"
                        description={configDetailsState?.storemetadescription?.value}
                    />
                    <Box className="FrontPage BullionmarkFrontPage">
                        <BannerSlider />
                        <PlanningJourney />
                        <BestAdventures />
                        <GetInspired />
                        {bullionMarkPage?.homepage_Section_4_Two_pics_and_content?.[0]?.overview ? <ExclusiveJourneys data={bullionMarkPage?.homepage_Section_4_Two_pics_and_content?.[0]?.overview} /> : null}
                        <ExclusiveJourneysWithSlider />
                        <TravelInspiration />
                        <InspiringStories data={bullionMarkPage?.homepage_Section_7_Two_posts_in_a_row} />
                        <Newsletter />
                    </Box>
                </MainLayout>
            </Suspense>
        </>
    )
}

export default (THEME_TYPE == '1' ? indexBulliomark : MainHomePage)
// export const getServerData = async () => {
//     try {
//         const endpointBaseURL = "https://qmapistaging.qmint.com/api/v1/";
//         const headers = {
//             "Storecode": "12",
//             "Validkey": "MBXCSv6SGIx8mx1tHvrMw5b0H3R91eMmtid4c2ItRHRKL4Pnzo"
//         };

//         // Use axios.get to fetch data and extract response.data
//         const [configDetailsResponse,
//              mainHomePageDataResponse,
//              bannerDataResponse
//             ] = await Promise.all([
//             axios.get(endpointBaseURL + ENDPOINTS.getConfigStore, { headers }),
//             axios.get(endpointBaseURL + ENDPOINTS.mainHomePage, { headers }),
//             axios.get(endpointBaseURL + ENDPOINTS.getSlider.replace('typeEnum', '0'), { headers }),
//         ]);

//         // Extract response.data from axios responses
//         const configDetails = configDetailsResponse.data.data;
//         const mainHomePageData = mainHomePageDataResponse.data.data;
//         const bannerData = bannerDataResponse.data.data
//         return {
//             props: {
//                 configDetails,
//                 mainHomePageData,
//                 bannerData
//             }
//         };
//     } catch (error) {
//         console.error("🚀 ~ getServerData ~ error:", error);
//         return {
//             status: 500,
//             headers: {},
//             props: {}
//         };
//     }
// };
