import { useAppSelector } from '@/hooks';
import { Skeleton, Stack } from '@mui/material'
import React, { Suspense, lazy, useEffect, useState, useTransition } from 'react'
import BullionmarkFrontFooter from '../footer/BullionmarkFrontFooter';
import { useLocation } from '@reach/router';
import { STORE_CODE, THEME_TYPE } from '@/axiosfolder';
import useAPIoneTime from '@/hooks/useAPIoneTime';
import { configDetails } from '@/redux/reducers/homepageReducer';
import { ENDPOINTS } from '@/utils/constants';

// import FrontHeader from '../header/FrontHeader';
import LazyFrontHeader from "../header/FrontHeader"
import RenderOnViewportEntry from './RenderOnViewportEntry';
// const BullionmarkFrontFooter = lazy(() => import('../footer/BullionmarkFrontFooter'));
// const LazyFrontHeader = lazy(() => import("../header/FrontHeader"));
const LazyFrontFooter = lazy(() => import('../footer/FrontFooter'));

interface MainLayout {
    children: any
    blackTheme?: boolean
}

const MainLayout = (props: MainLayout) => {
    const { children, blackTheme } = props
    const { configDetails: configDetailsState, isLoggedIn } = useAppSelector((state) => state.homePage)
    useEffect(() => {
        if (configDetailsState?.Store_FaviconURL?.value) {
            const faviconUrl = configDetailsState?.Store_FaviconURL?.value; // Assuming API response contains favicon URL
            // Update favicon dynamically
            const link: any = document.querySelector("link[rel='icon']") || document.createElement('link');
            link.rel = 'icon';
            link.href = faviconUrl;
            document.head.appendChild(link);
        }
    }, [configDetailsState])
    BullionmarkFrontFooter
    const location = useLocation();
    const [isBullionmarkHomePage, setIsBullionmarkHomePage] = useState<boolean>(false)
    useAPIoneTime({ service: configDetails, endPoint: ENDPOINTS.getConfigStore })
    useEffect(() => {

        if ( process.env.THEME_TYPE== "1") {
            setIsBullionmarkHomePage(true)
        }
    }, [process.env.THEME_TYPE])
    const [isRendering, setIsRendering] = useState(true);
    const [isPending, startTransition] = useTransition();
    useEffect(() => {
        startTransition(() => {
            // Simulating initial data fetch
            setTimeout(() => setIsRendering(false), 500);
        });
    }, [])
    return (
        <Stack id="PageLayout">
            {/* <Suspense fallback={<div
                className="CustomSkeleton"
                style={{
                    minHeight: '140px',
                    position: 'absolute',
                    top: 0
                }}
            ></div>}> */}
            {/* <LazyFrontHeader blackTheme={blackTheme} /> */}
            {/* </Suspense> */}
            {!isRendering && <Suspense fallback={
                <Skeleton
                    height={"124px"}
                    width={"100%"}
                    style={{ transform: "scale(1)", position: "sticky", top: '0px' }}
                />
            }><LazyFrontHeader blackTheme={blackTheme} /></Suspense>}
            {isRendering &&
                (
                    <Skeleton
                        height={"124px"}
                        width={"100%"}
                        style={{ transform: "scale(1)", zIndex: 9999 }}
                    />)}
            <main>
                {children}
            </main>
            <RenderOnViewportEntry
                rootMargin="380px"
                threshold={0.25}
                minHeight={800}
            >

                {isBullionmarkHomePage ? <BullionmarkFrontFooter /> : <LazyFrontFooter />}
            </RenderOnViewportEntry>
        </Stack>
    )
}

export default MainLayout