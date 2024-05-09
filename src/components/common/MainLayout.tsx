import { Stack } from '@mui/material'
import React, { Suspense, lazy } from 'react'
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
                <LazyFrontFooter />
            </Suspense>}
        </Stack>
    )
}

export default MainLayout