import React, { useEffect, useState } from "react"
import { Box, Container, Divider } from "@mui/material"
import { PageTitle } from "@/components/common/Utils"
import OrderDateStatusSelector from "@/components/partials/my-vault/OrderDateStatusSelector"
import OrderDetailsCard from "@/components/partials/my-vault/OrderDetailsCard"
import Seo from "@/components/common/Seo"
import useAPIoneTime from "@/hooks/useAPIoneTime"
import { ENDPOINTS } from "@/utils/constants"
import { useAppDispatch, useAppSelector } from "@/hooks"
import Layout from "@/components/common/Layout"
import Loader from "@/components/common/Loader"
import { getBuyBackOrderHistory, getConfigDropdowns } from "@/redux/reducers/myVaultReducer"
import { requestBodyDefault } from "../category/[category]"
import { navigate } from "gatsby"
import Toaster from "@/components/common/Toaster"
import useRequireLogin from "@/hooks/useRequireLogin"

export const requestBodyOrderHistory = {
    ...requestBodyDefault, filters: {
        fromDate: "",
        toDate: "",
        orderStatusId: "",
        orderCustomerId: ""
    },
    pageSize: -1
}

function BuyBackOrderHistory() {
    const { loadingForCheckingLogin } = useRequireLogin()
    const orderBuypackHistoryDetails = useAppSelector(state => state.myVault.buyBackOrderHistory)
    const loading = useAppSelector(state => state.myVault.loading)
    const dispatch = useAppDispatch()
    const openToaster = useAppSelector(state => state.homePage.openToaster)
    const { checkoutPageData } = useAppSelector((state) => state.checkoutPage)

    useEffect(() => {
        dispatch(
            getBuyBackOrderHistory({
                url: ENDPOINTS.getBuyBackOrderHistory,
                body: { ...requestBodyOrderHistory, filters: {} },
            })
        );
    }, []);
    useAPIoneTime({
        service: getConfigDropdowns,
        endPoint: ENDPOINTS.getConfigDropdown
    })
    if (loadingForCheckingLogin) {
        return
    }
    return (
        <>
            {loading &&  <Loader open={loading} />}
            {openToaster && <Toaster />}
            <Layout>
                <Seo
                    keywords={[`QMint BuyBackOrderHistory`]}
                    title="Buyback orders"
                    lang="en"
                />
                <PageTitle title="Buyback orders" backToDashboard={true} />
                <Box id="BuybackOrderHistoryPage" className='BuybackOrderHistoryPage' component="section">
                    <Container>
                        <Box className="Content OrderHistoryContent">
                            <Divider />
                            <OrderDateStatusSelector orderHistoryType="buy-back" />
                            <Divider />
                            <Box className="OrderDetailsCardsWrapper">
                                <OrderDetailsCard orderHistoryDetails={orderBuypackHistoryDetails} needToShowDetails={false} />
                            </Box>
                        </Box>
                    </Container>
                </Box>
            </Layout>
        </>
    )
}

export default BuyBackOrderHistory
