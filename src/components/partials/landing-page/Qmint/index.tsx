import React from "react";
import { useAppDispatch, useAppSelector } from "@/hooks";
import useAPIoneTime from "@/hooks/useAPIoneTime";
import useUserDetailsFromToken from "@/hooks/useUserDetailsFromToken";
import { configDetails, serProgressLoaderStatus, setScrollPosition } from "@/redux/reducers/homepageReducer";
import { ENDPOINTS } from "@/utils/constants";
import { Box } from "@mui/material";
import { Suspense, useEffect } from "react";
import MainLayout from "@/components/common/MainLayout";
import Loader from "@/components/common/Loader";
import { Toaster } from "react-hot-toast";
import Seo from "@/components/common/Seo";
import Banner from "./Banner";
import RenderOnViewportEntry from "@/components/common/RenderOnViewportEntry";
import Locations from "./Locations";
import Adventure from "./Adventure";
import Experience from "./Experience";
import KnowMore from "./KnowMore";
import LatestStories from "./LatestStories";
import Gallery from "./Gallery";
import CloserLookMain from "./CloserLookMain";
import TheJournal from "./TheJournal";

function QmintMainHomePage(
) {
    const dispatch = useAppDispatch()
    const { configDetails: configDetailsState, openToaster, scrollPosition, loading, mainHomePageData } = useAppSelector((state) => state.homePage)

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

    useAPIoneTime({ service: configDetails, endPoint: ENDPOINTS.getConfigStore })
    const keyWords = configDetailsState?.Store_Meta_Keywords?.value?.split(',')?.length > 0 ? configDetailsState?.Store_Meta_Keywords?.value?.split(',') : []
    return (
        <Suspense fallback={<Box id="HeaderWrapper">.</Box>}>
            <div className="flex flex-col min-h-screen">
                <MainLayout>
                    {loading && <Loader open={loading} />}
                    {openToaster && <Toaster />}
                    <Seo
                        keywords={[`gatsby`, `tailwind`, `react`, `tailwindcss`, 'Travel', 'Qmit', 'gold', 'metal', ...keyWords]}
                        lang="en"
                        description={configDetailsState?.Store_Meta_Description?.value}
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

export default QmintMainHomePage