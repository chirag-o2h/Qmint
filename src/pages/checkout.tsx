import React, { useEffect, useState } from "react"
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
import { getCheckoutPageData, updateFinalDataForTheCheckout } from "@/redux/reducers/checkoutReducer"
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
import classNames from "classnames"
import { THEME_TYPE } from "@/axiosfolder"

function Checkout() {
  const { loadingForCheckingLogin } = useRequireLogin()
  const dispatch = useAppDispatch()
  const checkLoadingStatus = useAppSelector(state => state.checkoutPage.loading);
  const { checkoutPageData, isApiCalled } = useAppSelector((state) => state.checkoutPage)
  const cartItems = useAppSelector(state => state.shoppingCart.cartItems);
  const { configDetails: configDetailsState, openToaster, } = useAppSelector((state) => state.homePage)
  // console.log("🚀 ~ Checkout ~ configDetailsState:", configDetailsState)
  const [state, setState] = useState({ service: getCheckoutPageData, endPoint: ENDPOINTS.checkoutDetails })
  const [openSessionExpireDialog, toggleSessionExpireDialog] = useToggle(false)
  useEffect(() => {
    if (configDetailsState?.Checkout_TermsOfService_Enable?.value == false) {
      dispatch(updateFinalDataForTheCheckout({ termAndServiceIsRead: true }))
    }
  }, [configDetailsState?.Checkout_TermsOfService_Enable?.value])
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const isInstantBuy = urlParams.get('isInstantBuy')
    setState((prev: any) => ({ ...prev, params: { isInstantBuy: isInstantBuy ?? false } }))
  }, [window.location.search, cartItems?.length])
  useAPIoneTime(state)
  useAlertPopUp({ pageName: 'Checkout', openPopup: toggleSessionExpireDialog })
  if (configDetailsState?.Checkout_Enable?.value !== true) {
    navigate('/shop')
  }
  if (loadingForCheckingLogin) {
    return
  }
  return (
    <Layout>
      {checkLoadingStatus && <Loader open={checkLoadingStatus} />}
      <Seo
        keywords={[`QMint categories`]}
        title="Category"
        lang="en"
      />
      {openToaster && <Toaster />}
      <PageTitle title="Checkout" />
      <Container id="PageCheckout" className={classNames({ "BmkCheckoutPage": THEME_TYPE == '1' })}>
        {(checkoutPageData?.shoppingCartItems?.length && checkoutPageData?.shoppingCartItems?.length > 0) ?
          (<>
            <Stack className="AllSteps">
              <Step1 />
              <Step2 />
              <Step3 />
              {configDetailsState?.Checkout_TermsOfService_Enable?.value !== false && <TermsServices />}
            </Stack>
            <OrderSummary />
          </>) : null}
        {(!checkLoadingStatus && isApiCalled && checkoutPageData?.shoppingCartItems?.length === 0) ? <RecordNotFound message="No Items are available" /> : null}
      </Container>
      {
        openSessionExpireDialog && <SessionExpiredDialog
          open={openSessionExpireDialog}
          onClose={toggleSessionExpireDialog}
        />
      }
    </Layout >
  )
}

export default Checkout