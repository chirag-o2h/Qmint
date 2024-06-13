import Loader from '@/components/common/Loader'
import MainLayout from '@/components/common/MainLayout'
import Seo from '@/components/common/Seo'
import { useAppSelector } from '@/hooks'
import useAPIoneTime from '@/hooks/useAPIoneTime'
import { configDetails, getBullionMarkPageAPI } from '@/redux/reducers/homepageReducer'
import { ENDPOINTS } from '@/utils/constants'
import { Box } from '@mui/material'
import React, { Suspense } from 'react'
import { Toaster } from 'react-hot-toast'
import BannerSlider from './BannerSlider'
import PlanningJourney from './PlanningJourney'
import BestAdventures from './BestAdventures'
import GetInspired from './GetInspired'
import ExclusiveJourneys from './ExclusiveJourneys'
import ExclusiveJourneysWithSlider from './ExclusiveJourneysWithSlider'
import TravelInspiration from './TravelInspiration'
import InspiringStories from './InspiringStories'
import Newsletter from './Newsletter'
import BestCategorySlider from "../../shop/Bullionmark/BestCategorySlider"

const BulliomarkMainHomePage = () => {
    const { configDetails: configDetailsState, openToaster, loading, bullionMarkPage } = useAppSelector((state) => state.homePage)
    const keyWords = configDetailsState?.Store_Meta_Keywords?.value?.split(',')?.length > 0 ? configDetailsState?.Store_Meta_Keywords?.value?.split(',') : []
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
                        title={configDetailsState?.Store_Title?.value}
                        lang="en"
                        description={configDetailsState?.Store_Meta_Description?.value}
                    />
                    <Box className="FrontPage BullionmarkFrontPage">
                        {configDetailsState?.Sliders_Homepage_Enable?.value === false ? null : <BannerSlider />}
                        <PlanningJourney />
                        {/* <BestAdventures /> */}
                        <BestCategorySlider />
                        <GetInspired />
                        <ExclusiveJourneys data={bullionMarkPage?.homepage_Section_4_Two_pics_and_content?.[0]?.overview} />
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

export default BulliomarkMainHomePage