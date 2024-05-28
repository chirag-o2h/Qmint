import { useAppSelector } from '@/hooks';
import { Stack } from '@mui/material'
import React, { Suspense, lazy, useEffect, useState } from 'react'
import BullionmarkFrontFooter from '../footer/BullionmarkFrontFooter';
import { useLocation } from '@reach/router';
import { STORE_CODE } from '@/axiosfolder';

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
    if (configDetailsState?.storefaviconiconurl?.value) {
        const faviconUrl = configDetailsState?.storefaviconiconurl?.value; // Assuming API response contains favicon URL
        // Update favicon dynamically
        const link: any = document.querySelector("link[rel='icon']") || document.createElement('link');
        link.rel = 'icon';
        link.href = faviconUrl;
        document.head.appendChild(link);
    }
    const location = useLocation();
    const [isBullionmarkHomePage, setIsBullionmarkHomePage] = useState<boolean>(false)
    useEffect(() => {
        console.log(location.pathname);

        if (STORE_CODE == "7") {
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