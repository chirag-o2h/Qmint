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
import useUserDetailsFromToken from '@/hooks/useUserDetailsFromToken'
import RenderOnViewportEntry from "@/components/common/RenderOnViewportEntry"

const BulliomarkMainHomePage = () => {
    const { configDetails: configDetailsState, openToaster, loading, bullionMarkPage } = useAppSelector((state) => state.homePage)
    const keyWords = configDetailsState?.Store_Meta_Keywords?.value?.split(',')?.length > 0 ? configDetailsState?.Store_Meta_Keywords?.value?.split(',') : []
    useAPIoneTime({ service: getBullionMarkPageAPI })
    useAPIoneTime({ service: configDetails, endPoint: ENDPOINTS.getConfigStore })
    useUserDetailsFromToken()
    return (
        <>
            <Suspense fallback={<Box id="HeaderWrapper">.</Box>}>
                <MainLayout>
                    {loading && <Loader open={loading} />}
                    {openToaster && <Toaster />}
                    <Seo
                        keywords={[`gatsby`, `tailwind`, `react`, `tailwindcss`, 'Travel', 'Qmit', 'gold', 'metal', ...keyWords]}
                        lang="en"
                        description={configDetailsState?.Store_Meta_Description?.value}
                    />
                    <Box className="FrontPage BullionmarkFrontPage">
                        {configDetailsState?.Sliders_Homepage_Enable?.value === false ? null : <BannerSlider />}
                        <RenderOnViewportEntry rootMargin={'200px'} threshold={0.25} minHeight={774}>
                            <PlanningJourney />
                        </RenderOnViewportEntry>
                        {/* <BestAdventures /> */}
                        <RenderOnViewportEntry rootMargin={'200px'} threshold={0.25} minHeight={774}>
                            <BestCategorySlider pageData={bullionMarkPage} title={configDetailsState?.["Homepage_Section_2_Featured_Categories_Title"]?.value} />
                        </RenderOnViewportEntry>
                        <RenderOnViewportEntry rootMargin={'200px'} threshold={0.25} minHeight={774}>
                            <GetInspired title={configDetailsState?.["Homepage_Section_3_Three_posts_in_a_row_Title"]?.value} description={configDetailsState?.["Homepage_Section_3__Three_posts_in_a_row_Subtitle"]?.value} />
                        </RenderOnViewportEntry>
                        <RenderOnViewportEntry rootMargin={'200px'} threshold={0.25} minHeight={774}>
                            <ExclusiveJourneys data={bullionMarkPage?.homepage_Section_4_Two_pics_and_content?.[0]?.overview} />
                        </RenderOnViewportEntry>
                        <RenderOnViewportEntry rootMargin={'200px'} threshold={0.25} minHeight={774}>
                            <ExclusiveJourneysWithSlider />
                        </RenderOnViewportEntry>
                        <RenderOnViewportEntry rootMargin={'200px'} threshold={0.25} minHeight={774}>
                            <TravelInspiration title={configDetailsState?.["Homepage_Section_6_Three_posts_in_wavy_layout_Title"]?.value} />
                        </RenderOnViewportEntry>
                        <RenderOnViewportEntry rootMargin={'200px'} threshold={0.25} minHeight={774}>
                            <InspiringStories title={configDetailsState?.["Homepage_Section_7_Two_posts_in_a_row_Title"]?.value} data={bullionMarkPage?.homepage_Section_7_Two_posts_in_a_row} />
                        </RenderOnViewportEntry>
                        <RenderOnViewportEntry rootMargin={'200px'} threshold={0.25} minHeight={774}>
                            <Newsletter title={configDetailsState?.["Homepage_Section_9_Subscribe_Title"]?.value} />
                        </RenderOnViewportEntry>
                    </Box>
                </MainLayout>
            </Suspense>
        </>
    )
}

export default BulliomarkMainHomePage