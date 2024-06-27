import React from "react"
import Seo from "../components/common/Seo"
import Layout from "@/components/common/Layout";
import { Box, Grid, Container, Typography } from "@mui/material"

// Utils
import { PageTitle } from "@/components/common/Utils"
import MembershipCard from "@/components/partials/memberships/MembershipCard";
import * as  variable from '../scss/settings/variables.module.scss'
import useAPIoneTime from "@/hooks/useAPIoneTime";
import { membershipPlanDetails, upgradePlaneOfMembership } from "@/redux/reducers/homepageReducer";
import { ENDPOINTS } from "@/utils/constants";
import { useAppDispatch, useAppSelector } from "@/hooks";
import Loader from "@/components/common/Loader";
import { navigate } from "gatsby";
import ConfigServices from "@/apis/services/ConfigServices";
import useShowToaster from "@/hooks/useShowToaster";
import Toaster from "@/components/common/Toaster";


const colourForMembership: any = {
    gold: 'goldTips',
    palladium: 'palladium',
    platinum: 'mercury',
    silver: 'silver',
    copper: 'copper',
}
export const MembershipPlanEnum = {
    copper: { displayName: "Copper", value: 5 },
    silver: { displayName: "Silver", value: 1 },
    gold: { displayName: "Gold", value: 2 },
    platinum: { displayName: "Platinum", value: 3 },
    palladium: { displayName: "Palladium", value: 4 },
};
function Memberships() {
    const openToaster = useAppSelector(state => state.homePage.openToaster)
    const { mebershipPlanDetailsData, loading } = useAppSelector((state) => state.homePage)
    const { showToaster } = useShowToaster();
    useAPIoneTime({ service: membershipPlanDetails, endPoint: ENDPOINTS.membership })
    const isLoggedIn = useAppSelector(state => state.homePage.isLoggedIn)
    const dispatch = useAppDispatch()

    const handleUpgradPlan = async (title: keyof typeof MembershipPlanEnum) => {
        const res = await dispatch(upgradePlaneOfMembership({ FkqHBCX: MembershipPlanEnum?.[title].value }))
        showToaster({
            message: res?.payload?.data?.message,
            severity: 'success'
        })
        if (res?.payload?.data?.code == 200) {
            navigate('/checkout')
        }
    }
    if (!isLoggedIn) {
        navigate('/login', { replace: true })
        return;
    }
    return (
        <Layout>
            <>
                {openToaster && <Toaster />}
                {loading && <Loader open={loading} />}
                <Seo
                    keywords={[`gatsby`, `tailwind`, `react`, `tailwindcss`]}
                    title="Home"
                    lang="en"
                />
                <Box id="MembershipsPage" component="section">
                    <Box className="TitleWrapper">
                        <PageTitle title="Memberships" />
                    </Box>
                    <Container>
                        <Box className="MembershipCardWrapper">
                            {
                                Object.entries(mebershipPlanDetailsData).flatMap((item: any, index) => {
                                    return (
                                        item[0] !== 'currentMemberShip' ? [<MembershipCard handleUpgradPlan={handleUpgradPlan} bgcolor={variable[colourForMembership[item[0]]] === 'silver' ? '#c0c0c0' : variable[colourForMembership[item[0]]]} cardtitle={item[0] as string} details={item[1]} />] : []
                                    )
                                })
                            }
                        </Box>
                    </Container>
                </Box>
            </>
        </Layout>
    )
}

export default Memberships