import React from 'react'
import { Container, Stack, Box, Button, Skeleton, Card } from "@mui/material"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Pagination, A11y } from 'swiper/modules'

// Utils
import { SectionHeading } from "../../../common/Utils"
import { TravelCard } from "../../../common/Card"
import useApiRequest from '@/hooks/useAPIRequest'
import { ENDPOINTS } from '@/utils/constants'
import { navigate } from 'gatsby'

// Components
import RecordNotFound from '@/components/common/RecordNotFound'
import { useAppSelector } from '@/hooks'

const dataforbody = {
    "search": "",
    "pageNo": 0,
    "pageSize": -1,
    "sortBy": "",
    "sortOrder": "",
    "filters": {
    }
}
interface ItravelDestinations {
    id: number
    title: string,
    body: string,
    bodyOverview: string,
    allowComments: boolean,
    includeInSitemap: boolean,
    tags: any,
    startDateUtc: Date,
    endDateUtc: Date,
    metaKeywords: string,
    metaDescription: string,
    metaTitle: string,
    commentCount: number,
    friendlyName: string,
    stores: string,
    isActive: boolean,
    imageUrl: string,
}
interface Idata {
    data: {
        data: {
            items: ItravelDestinations[]
        }
    },
    loading: boolean,
}

function TheJournal() {
    const { mainHomePageData, configDetails } = useAppSelector((state) => state.homePage)

    return (
        (mainHomePageData && mainHomePageData?.homepage_Section_8_Two_posts_in_two_rows_each?.length > 0) ?
            <Box id="TheJournal">
                <Container component="section">
                    <SectionHeading title={configDetails?.["Homepage_Section_8_Two_posts_in_two_rows_each_Title"]?.value} description={configDetails?.["Homepage_Section_8_Two_posts_in_two_rows_each_Subtitle"]?.value} />
                    <Container className="TheJounalPostWrapperContainer" maxWidth="lg">
                        <Box className="TheJounalPostWrapper">
                            {mainHomePageData?.homepage_Section_8_Two_posts_in_two_rows_each?.map((item) => (
                                <Box className="TheJounalPost" key={item.title}>
                                    <TravelCard
                                        friendlyName={item?.friendlyName}
                                        place={item.title}
                                        description={item.overview}
                                        imageUrl={item.imageUrl}
                                    />
                                </Box>
                            ))
                            }
                        </Box>
                    </Container>
                </Container>
            </Box> : null
    )
}

export default React.memo(TheJournal)
