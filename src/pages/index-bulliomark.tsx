import Loader from '@/components/common/Loader'
import Seo from "../components/common/Seo"
import BannerSlider from '@/components/partials/home-bulliomark/BannerSlider'
import React, { Suspense, lazy, useEffect, useState } from 'react'
import { Toaster } from 'react-hot-toast'
import { useAppDispatch, useAppSelector } from "@/hooks"
import { Box } from '@mui/material'
import PlanningJourney from '@/components/partials/home-bulliomark/PlanningJourney'
import BestAdventures from '@/components/partials/home-bulliomark/BestAdventures'
import GetInspired from '@/components/partials/home-bulliomark/GetInspired'
import ExclusiveJourneys from '@/components/partials/home-bulliomark/ExclusiveJourneys'
import ExclusiveJourneysWithSlider from '@/components/partials/home-bulliomark/ExclusiveJourneysWithSlider'
import InspiringStories from '@/components/partials/home-bulliomark/InspiringStories'
import TravelInspiration from '@/components/partials/home-bulliomark/TravelInspiration'
import Newsletter from '@/components/partials/home-bulliomark/Newsletter'


const MainLayout = lazy(() => import("@/components/common/MainLayout"))


function indexBulliomark() {

    const { configDetails: configDetailsState, openToaster, scrollPosition, loading, mainHomePageData } = useAppSelector((state) => state.homePage)
    const keyWords = configDetailsState?.storemetakeywords?.value?.split(',')?.length > 0 ? configDetailsState?.storemetakeywords?.value?.split(',') : []


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
                        <ExclusiveJourneys />
                        <ExclusiveJourneysWithSlider />
                        <TravelInspiration />
                        <InspiringStories />
                        <Newsletter />
                    </Box>
                </MainLayout>
            </Suspense>
        </>
    )
}

export default indexBulliomark
