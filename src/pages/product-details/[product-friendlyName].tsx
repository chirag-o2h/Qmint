import React, { useEffect, useMemo } from "react"
import { Button, Container } from "@mui/material"

// Components
import Layout from "@/components/common/Layout"
import Seo from "@/components/common/Seo"
import AboutProduct from "@/components/partials/productDetail/AboutProduct"
import RelatedProduct from "@/components/partials/productDetail/RelatedProduct"
import { Breadcrumb } from "@/components/common/Utils"
import useAPIoneTime from "@/hooks/useAPIoneTime"
import { getProductDetailsData, resetProductDetails } from "@/redux/reducers/categoryReducer"
import { ENDPOINTS } from "@/utils/constants"
import { useAppDispatch, useAppSelector } from "@/hooks"
import { setRecentlyViewedProduct } from "@/redux/reducers/homepageReducer"
import Toaster from "@/components/common/Toaster"
import Loader from "@/components/common/Loader"
import useShowToaster from "@/hooks/useShowToaster"
import PageNotFound from "@/components/partials/productDetail/PageNotFound"
import classNames from "classnames"
import { STORE_CODE, THEME_TYPE } from "@/axiosfolder"


function ProductDetail({ params }: any) {
  const configDetails = useAppSelector(state => state.homePage.configDetails)
  const { configDetails: configDetailsState } = useAppSelector((state) => state.homePage)
  const { showToaster } = useShowToaster();
  const checkLoadingStatus = useAppSelector(state => state.category.loading)
  const checkLoadingStatusOfTheGetWishlist = useAppSelector(state => state.wishList.loading)
  const { productDetailsData } = useAppSelector((state) => state.category)
  // console.log("🚀 ~ ProductDetail ~ productDetailsData:", productDetailsData)
  const dispatch = useAppDispatch()
  const endPoint = useMemo(() => {
    return ENDPOINTS.productDetails.replace('{{product-id}}', params?.["product-friendlyName"])
  }, [params])
  useAPIoneTime({ service: getProductDetailsData, endPoint, params: params })

  useEffect(() => {
    if (productDetailsData?.productId) {
      const res = dispatch(setRecentlyViewedProduct(productDetailsData?.productId))
    }
  }, [productDetailsData?.productId])
  useEffect(() => {
    if (productDetailsData?.errorMessage) {
      showToaster({
        message: productDetailsData?.errorMessage,
        severity: 'error'
      })
    }
  }, [productDetailsData])
  const keyWords = productDetailsData?.metaKeywords?.value?.split(',')?.length > 0 ? productDetailsData?.metaKeywords?.value?.split(',') : []
  return (
    <Layout>
      {checkLoadingStatus || checkLoadingStatusOfTheGetWishlist && <Loader open={checkLoadingStatus || checkLoadingStatusOfTheGetWishlist} />}
      <Seo
        title={productDetailsData?.metaTitle}
        keywords={[`gatsby`, `tailwind`, `react`, `tailwindcss`, 'Travel', 'Qmit', 'gold', 'metal', ...keyWords]}
        description={productDetailsData?.metaDescription}
        lang="en"
        isItShopPage={true}
      />
      {productDetailsData && !productDetailsData?.errorMessage ? (<><Breadcrumb arr={[{ navigate: '/shop', name: 'Shop' }, { navigate: '/product-details/' + params?.["product-friendlyName"], name: params?.["product-friendlyName"] }]} />
        <Container id="PageProductDetail" className={classNames({ "BmkPageProductDetail": THEME_TYPE == '1' })}>
          {productDetailsData?.productId && <AboutProduct productId={productDetailsData?.productId} />}
          {productDetailsData?.relatedProducts?.length > 0 && <RelatedProduct relatedProductsList={structuredClone(productDetailsData?.relatedProducts)} heading={configDetails["ProductDetails_RelatedProducts_SectionTitle"]?.value} description={configDetails["ProductDetails_RelatedProducts_SectionSubtitle"]?.value} />}
        </Container></>) : <PageNotFound />}
    </Layout>
  )
}

export default ProductDetail