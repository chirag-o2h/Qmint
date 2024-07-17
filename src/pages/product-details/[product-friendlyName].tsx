import React, { lazy, Suspense, useEffect, useMemo, useState, useTransition } from "react"
import { Button, Container, Skeleton, useMediaQuery } from "@mui/material"

// Components
import Layout from "@/components/common/Layout"
import Seo from "@/components/common/Seo"
import AboutProduct from "@/components/partials/productDetail/AboutProduct"
import RelatedProduct from "@/components/partials/productDetail/RelatedProduct"
import { Breadcrumb } from "@/components/common/Utils"
import useAPIoneTime from "@/hooks/useAPIoneTime"
import { getProductDetailsData, resetProductDetails, setProductDetails } from "@/redux/reducers/categoryReducer"
import { ENDPOINTS } from "@/utils/constants"
import { useAppDispatch, useAppSelector } from "@/hooks"
import { setConfigDetails, setRecentlyViewedProduct } from "@/redux/reducers/homepageReducer"
import Toaster from "@/components/common/Toaster"
import Loader from "@/components/common/Loader"
import useShowToaster from "@/hooks/useShowToaster"
import PageNotFound from "@/components/partials/productDetail/PageNotFound"
import classNames from "classnames"
import axiosInstance, { STORE_CODE, THEME_TYPE } from "@/axiosfolder"
import BullionmarkHeader from "@/components/header/BullionmarkHeader"
import RenderOnViewportEntry from "@/components/common/RenderOnViewportEntry"
const LazyBullionmarkFooter = lazy(
  () => import("@/components/footer/BullionmarkFooter")
);

interface ServerData {
  configDetails: any;
  configDetailsForRedux: any;
  topicPageData: {
    body: string;
    metaTitle: string;
    metaKeywords: string;
    metaDescription: string;
    systemName: string;
  };
  productDetailsData: any
}
function ProductDetail({ serverData, params }: { serverData: ServerData, params: any }) {
  // client side render code
  // const serverData?.configDetails = useAppSelector(state => state.homePage.serverData?.configDetails)
  // const { serverData?.productDetailsData } = useAppSelector((state) => state.category)
  // const endPoint = useMemo(() => {
  //   return ENDPOINTS.productDetails.replace('{{product-id}}', params?.["product-friendlyName"])
  // }, [params])
  // useAPIoneTime({ service: getProductDetailsData, endPoint, params: params })

  const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down("sm"));

  const { showToaster } = useShowToaster();
  const checkLoadingStatus = useAppSelector(state => state.category.loading)
  const checkLoadingStatusOfTheGetWishlist = useAppSelector(state => state.wishList.loading)

  const dispatch = useAppDispatch()
  const [isRendering, setIsRendering] = useState(true);

  useEffect(() => {
    dispatch(setProductDetails(serverData?.productDetailsData))
  }, [serverData])
    console.log("🚀 ~ useEffect ~ serverData?.productDetailsData:", serverData?.productDetailsData)
  useEffect(() => {
    if (serverData?.productDetailsData?.productId) {
      const res = dispatch(setRecentlyViewedProduct(serverData?.productDetailsData?.productId))
    }
  }, [serverData?.productDetailsData?.productId])
  useEffect(() => {
    if (serverData?.productDetailsData?.errorMessage) {
      showToaster({
        message: serverData?.productDetailsData?.errorMessage,
        severity: 'error'
      })
    }
  }, [serverData?.productDetailsData])
  const keyWords = serverData?.productDetailsData?.metaKeywords?.value?.split(',')?.length > 0 ? serverData?.productDetailsData?.metaKeywords?.value?.split(',') : []
  useEffect(() => {
    dispatch(setConfigDetails(serverData?.configDetailsForRedux));

    if (serverData?.configDetails?.Store_FaviconURL?.value) {
      const faviconUrl = serverData?.configDetails?.Store_FaviconURL?.value; // Assuming API response contains favicon URL
      // Update favicon dynamically
      const link: any =
        document.querySelector("link[rel='icon']") ||
        document.createElement("link");
      link.rel = "icon";
      link.href = faviconUrl;
      document.head.appendChild(link);
    }
  }, [serverData]);
  const [isPending, startTransition] = useTransition();
  useEffect(() => {
    startTransition(() => {
      // Simulating initial data fetch
      setTimeout(() => setIsRendering(false), 3500);
    });
  }, [])
  return (
    <>
          <Seo
        title={serverData?.productDetailsData?.metaTitle}
        keywords={[`gatsby`, `tailwind`, `react`, `tailwindcss`, 'Travel', 'Qmit', 'gold', 'metal', ...keyWords]}
        description={serverData?.productDetailsData?.metaDescription}
        lang="en"
        isItShopPage={true}
        configDetailsState={serverData?.configDetails}
      />
       {isRendering && (
          <>
            <Skeleton
              height={"124px"}
              width={"100%"}
              style={{ marginBottom: !isMobile ? "32px" : "24px", transform: "scale(1)" }}
            /></>)}
      {!isRendering && <Suspense fallback={
        <Skeleton
          height={"124px"}
          width={"100%"}
          style={{ marginBottom: !isMobile ? "32px" : "24px", transform: "scale(1)" }} />}>
        <BullionmarkHeader />
      </Suspense>}

      {checkLoadingStatus || checkLoadingStatusOfTheGetWishlist && <Loader open={checkLoadingStatus || checkLoadingStatusOfTheGetWishlist} />}

      {serverData?.productDetailsData && !serverData?.productDetailsData?.errorMessage ? (<>
        <Breadcrumb arr={[{ navigate: '/shop', name: 'Shop' }, { navigate: '/product-details/' + params?.["product-friendlyName"], name: serverData?.productDetailsData?.name }]} />
        <Container id="PageProductDetail" className={classNames({ "BmkPageProductDetail": THEME_TYPE == '1' })}>

          {serverData?.productDetailsData?.productId && <AboutProduct productId={serverData?.productDetailsData?.productId} productDetailsData={serverData?.productDetailsData}/>}

          {serverData?.productDetailsData?.relatedProducts?.length > 0 && <RelatedProduct relatedProductsList={structuredClone(serverData?.productDetailsData?.relatedProducts)} heading={serverData?.configDetails["ProductDetails_RelatedProducts_SectionTitle"]?.value} description={serverData?.configDetails["ProductDetails_RelatedProducts_SectionSubtitle"]?.value} />}
        </Container></>) : <PageNotFound />}
        <RenderOnViewportEntry
          rootMargin="200px"
          threshold={0.25}
          minHeight={800}
        >
          <LazyBullionmarkFooter />
        </RenderOnViewportEntry>
    </>
      )
}

export default ProductDetail

export async function getServerData(context: { params: any; }) {
  try {
    const { params } = context;
    const productFriendlyName = params['product-friendlyName'];
    console.log("before fatching ", Date.now())
    const [
      configDetailsResponse,
      productDetailsDataResponse,
    ] = await Promise.all([
      axiosInstance.get(ENDPOINTS.getConfigStore),
      axiosInstance.get(ENDPOINTS.productDetails.replace('{{product-id}}', productFriendlyName)),
    ]);
    const configDetails = configDetailsResponse.data.data;
    const productDetailsData = productDetailsDataResponse.data;
    console.log("🚀 ~ getServerData ~ productDetailsData:", productDetailsData)

    return {
      props: {
        configDetails:configDetails?.reduce((acc: any, curr: any) => {
          acc[curr.key] = curr
          return acc
        }, {}),
        configDetailsForRedux: configDetails,
        productDetailsData: productDetailsData.data,
      },
    };
  } catch (error) {
    console.error("🚀 ~ getServerData ~ error:", error);
    console.log("getServerData -- inside catch block", Date.now());
    return {
      status: 500,
      headers: {},
      props: {},
    };
  }
}
