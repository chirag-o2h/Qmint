import React, { useEffect, useLayoutEffect, useState } from "react"
import { Box, Container, Stack } from "@mui/material"

// Componenets
import Layout from "@/components/common/Layout"
import Seo from "@/components/common/Seo"
import { PageTitle } from "@/components/common/Utils"

// Data
import TermsServices from "@/components/partials/checkout/TermsServices"
import Step1 from "@/components/partials/checkout/Step1"
import Step2 from "@/components/partials/checkout/Step2"
import Step3 from "@/components/partials/checkout/Step3"
import OrderSummary from "@/components/partials/checkout/OrderSummary"
import useAPIoneTime from "@/hooks/useAPIoneTime"
import { getCheckoutPageData } from "@/redux/reducers/checkoutReducer"
import { ENDPOINTS } from "@/utils/constants"
import { useAppDispatch, useAppSelector, useToggle } from "@/hooks"
import useDeviceDetails from "@/hooks/useDeviceDetails"
import { navigate } from "gatsby"
import Toaster from "@/components/common/Toaster"
import Loader from "@/components/common/Loader"
import useAlertPopUp from "@/hooks/useAlertPopUp"
import SessionExpiredDialog from "@/components/header/SessionExpiredDialog"
import useRequireLogin from "@/hooks/useRequireLogin"
import RecordNotFound from "@/components/common/RecordNotFound"

function Checkout() {
  const { loadingForCheckingLogin } = useRequireLogin()
  const dispatch = useAppDispatch()
  const checkLoadingStatus = useAppSelector(state => state.checkoutPage.loading);
  const { checkoutPageData } = useAppSelector((state) => state.checkoutPage)
  const cartItems = useAppSelector(state => state.shoppingCart.cartItems);
  const openToaster = useAppSelector(state => state.homePage.openToaster)
  const [state, setState] = useState({ service: getCheckoutPageData, endPoint: ENDPOINTS.checkoutDetails })
  const [openSessionExpireDialog, toggleSessionExpireDialog] = useToggle(false)

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const isInstantBuy = urlParams.get('isInstantBuy')
    setState((prev: any) => ({ ...prev, params: { isInstantBuy: isInstantBuy ?? false } }))
  }, [window.location.search, cartItems?.length])
  useAPIoneTime(state)
  useAlertPopUp({ pageName: 'Checkout', openPopup: toggleSessionExpireDialog })
  if (loadingForCheckingLogin) {
    return
  }
  return (

    <Layout>
      <Loader open={checkLoadingStatus} />
      <Seo
        keywords={[`QMint categories`]}
        title="Category"
        lang="en"
      />
      {openToaster && <Toaster />}
      <PageTitle title="Checkout" />
      <Container id="PageCheckout">
        {(checkoutPageData?.shoppingCartItems?.length && checkoutPageData?.shoppingCartItems?.length > 0) ?
          <>
            <Stack className="AllSteps">
              <Step1 />
              <Step2 />
              <Step3 />
              <TermsServices />
            </Stack>
            <OrderSummary />
          </> : <RecordNotFound message="No Items are available" />}
      </Container>
      {openSessionExpireDialog && <SessionExpiredDialog
        open={openSessionExpireDialog}
        onClose={toggleSessionExpireDialog}
      />}
    </Layout>
  )
}

export default Checkout