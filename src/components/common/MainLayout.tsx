import { useAppSelector } from '@/hooks';
import { Stack } from '@mui/material'
import React, { Suspense, lazy, useEffect, useState } from 'react'
import BullionmarkFrontFooter from '../footer/BullionmarkFrontFooter';
import { useLocation } from '@reach/router';
import { STORE_CODE, THEME_TYPE } from '@/axiosfolder';
import useAPIoneTime from '@/hooks/useAPIoneTime';
import { configDetails } from '@/redux/reducers/homepageReducer';
import { ENDPOINTS } from '@/utils/constants';

// import FrontHeader from '../header/FrontHeader';
// import LazyFrontHeader from 
const LazyFrontHeader = lazy(() => import("../header/FrontHeader"));
const LazyFrontFooter = lazy(() => import('../footer/FrontFooter'));

interface MainLayout {
    children: any
    blackTheme?: boolean
}

const MainLayout = (props: MainLayout) => {
    const { children, blackTheme } = props
    const { configDetails: configDetailsState, isLoggedIn } = useAppSelector((state) => state.homePage)
    if (configDetailsState?.Store_FaviconURL?.value) {
        const faviconUrl = configDetailsState?.Store_FaviconURL?.value; // Assuming API response contains favicon URL
        // Update favicon dynamically
        const link: any = document.querySelector("link[rel='icon']") || document.createElement('link');
        link.rel = 'icon';
        link.href = faviconUrl;
        document.head.appendChild(link);
    }
    const location = useLocation();
    const [isBullionmarkHomePage, setIsBullionmarkHomePage] = useState<boolean>(false)
    useAPIoneTime({ service: configDetails, endPoint: ENDPOINTS.getConfigStore })
    useEffect(() => {

        if (THEME_TYPE == "1") {
            setIsBullionmarkHomePage(true)
        }
    }, [])
    return (
        <Stack id="PageLayout">
            <Suspense fallback={<div
                className="CustomSkeleton"
                style={{
                    minHeight: '140px',
                    position: 'absolute',
                    top: 0
                }}
            ></div>}>
                <LazyFrontHeader blackTheme={blackTheme} />
            </Suspense>
            <main>
                {children}
            </main>
            {<Suspense fallback={
                <div
                    className="CustomSkeleton"
                    style={{
                        minHeight: '380px',
                    }}
                ></div>
            }>
                {isBullionmarkHomePage ? <BullionmarkFrontFooter /> : <LazyFrontFooter />}
            </Suspense>}
        </Stack>
    )
}

export default MainLayout