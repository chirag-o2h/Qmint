import React, { lazy, Suspense, useEffect, useMemo, useState, useTransition } from "react"
import { Button, Container, Skeleton, useMediaQuery } from "@mui/material"

// Components
import Layout from "@/components/common/Layout"
import Seo from "@/components/common/Seo"
import AboutProduct from "@/components/partials/productDetail/AboutProduct"
// import RelatedProduct from "@/components/partials/productDetail/RelatedProduct"
const RelatedProduct = lazy(() => import("@/components/partials/productDetail/RelatedProduct"))
import { Breadcrumb } from "@/components/common/Utils"
import useAPIoneTime from "@/hooks/useAPIoneTime"
import { getProductDetailsData, resetProductDetails, setProductDetails } from "@/redux/reducers/categoryReducer"
import { ENDPOINTS } from "@/utils/constants"
import { useAppDispatch, useAppSelector } from "@/hooks"
import { setConfigDetails, setRecentlyViewedProduct } from "@/redux/reducers/homepageReducer"
import Toaster from "@/components/common/Toaster"
import Loader from "@/components/common/Loader"
import useShowToaster from "@/hooks/useShowToaster"
// import PageNotFound from "@/components/partials/productDetail/PageNotFound"
const PageNotFound = lazy(() => import("@/components/partials/productDetail/PageNotFound"))
import classNames from "classnames"
import axiosInstance from "@/axiosfolder"
const BullionmarkHeader = lazy(() => import("@/components/header/BullionmarkHeader"))
const LazyHeader = lazy(() => import("@/components/header/index"))

import RenderOnViewportEntry from "@/components/common/RenderOnViewportEntry"
import useragent from 'express-useragent';
import useRedirectTo404 from "@/hooks/useRedirectTo404"
import { wrapPromise } from "@/utils/common"
const LazyBullionmarkFooter = lazy(() => import("@/components/footer/BullionmarkFooter"));
const LazyFooter = lazy(() => import('@/components/footer/index'));

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
  isMobile: boolean
}
function ProductDetail({ serverData, params }: { serverData: ServerData, params: any }) {
  // client side render code
  // const serverData?.configDetails = useAppSelector(state => state.homePage.serverData?.configDetails)
  // const { serverData?.productDetailsData } = useAppSelector((state) => state.category)
  // const endPoint = useMemo(() => {
  //   return ENDPOINTS.productDetails.replace('{{product-id}}', params?.["product-friendlyName"])
  // }, [params])
  // useAPIoneTime({ service: getProductDetailsData, endPoint, params: params })

  const { showToaster } = useShowToaster();
  const checkLoadingStatus = useAppSelector(state => state.category.loading)
  const checkLoadingStatusOfTheGetWishlist = useAppSelector(state => state.wishList.loading)

  const dispatch = useAppDispatch()
  const [isRendering, setIsRendering] = useState(true);

  useEffect(() => {
    dispatch(setProductDetails(serverData?.productDetailsData))
  }, [serverData])
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
  const keyWords = serverData?.productDetailsData?.metaKeywords?.split(',')?.length > 0 ? serverData?.productDetailsData?.metaKeywords?.split(',') : []
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
  // useRedirectTo404(serverData)
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
            height={"115px"}
            width={"100%"}
            style={{ marginBottom: !serverData?.isMobile ? "32px" : "24px", transform: "scale(1)" }}
          /></>)}
      {!isRendering && <Suspense fallback={
        <Skeleton
          height={"115px"}
          width={"100%"}
          style={{ marginBottom: !serverData?.isMobile ? "32px" : "24px", transform: "scale(1)" }} />}>
        {process.env.THEME_TYPE === "1" ? <BullionmarkHeader /> : <LazyHeader />}
      </Suspense>}

      {checkLoadingStatus || checkLoadingStatusOfTheGetWishlist && <Loader open={checkLoadingStatus || checkLoadingStatusOfTheGetWishlist} />}

      {serverData?.productDetailsData && !serverData?.productDetailsData?.errorMessage ?
        (<>
          <Breadcrumb arr={[{ navigate: '/category/buy', name: 'Buy' }, { navigate: '/product-details/' + params?.["product-friendlyName"], name: serverData?.productDetailsData?.name }]} />
          <Container id="PageProductDetail" className={classNames({ "BmkPageProductDetail": process.env.THEME_TYPE == '1' })}>

            {serverData?.productDetailsData?.productId && <AboutProduct productId={serverData?.productDetailsData?.productId} productDetailsData={serverData?.productDetailsData} configDetailsState={serverData?.configDetails} />}

            {serverData?.productDetailsData?.relatedProducts?.length > 0 && <Suspense fallback={<></>}><RelatedProduct relatedProductsList={structuredClone(serverData?.productDetailsData?.relatedProducts)} heading={serverData?.configDetails["ProductDetails_RelatedProducts_SectionTitle"]?.value} description={serverData?.configDetails["ProductDetails_RelatedProducts_SectionSubtitle"]?.value} /></Suspense>}
          </Container></>) :
        <Suspense fallback={<></>}><PageNotFound /></Suspense>}
      <RenderOnViewportEntry
        rootMargin="200px"
        threshold={0.25}
        minHeight={800}
      >
        {process.env.THEME_TYPE === "1" ? <LazyBullionmarkFooter /> : <LazyFooter />}
      </RenderOnViewportEntry>
    </>
  )
}

export default ProductDetail

export async function getServerData(context: {
  headers: any, params: any;
}) {
  try {
    const { params } = context;
    const ua = useragent.parse(context.headers.get('user-agent'));
    const isMobile = ua.isMobile ? true : false;
    const productFriendlyName = params['product-friendlyName'];
    console.log("before fatching ", Date.now())
    // const [
    //   configDetailsResponse,
    //   productDetailsDataResponse,
    // ] = await Promise.all([
    //   axiosInstance.get(ENDPOINTS.getConfigStore),
    //   axiosInstance.get(ENDPOINTS.productDetails.replace('{{product-id}}', productFriendlyName)),
    // ]);
    // const configDetails = configDetailsResponse.data.data;
    // const productDetailsData = productDetailsDataResponse.data.data;
    // console.log("🚀 ~ getServerData ~ productDetailsData:", productDetailsData)
    // ================================================================================
    const promises = [
      wrapPromise(axiosInstance.get<Record<string, any>>(ENDPOINTS.getConfigStore)),
      wrapPromise(axiosInstance.get<Record<string, any>>(ENDPOINTS.productDetails.replace('{{product-id}}', productFriendlyName))),
    ];

    // Wait for all promises to settle
    const results = await Promise.all(promises);

    // Extract the results
    const configDetailsResult = results[0];
    const productDetailsDataResult = results[1];

    // Handle results
    const configDetails = configDetailsResult.status === 'fulfilled' ? configDetailsResult?.value?.data?.data : null;
    const productDetailsData = productDetailsDataResult.status === 'fulfilled' ? productDetailsDataResult?.value?.data?.data : null;
    // ================================================================================




    return {
      props: {
        configDetails: configDetails?.reduce((acc: any, curr: any) => {
          acc[curr.key] = curr
          return acc
        }, {}),
        configDetailsForRedux: configDetails,
        productDetailsData: productDetailsData,
        isMobile,
      },
    };
  } catch (error) {
    console.error("🚀 ~ getServerData ~ error:", error);
    console.log("getServerData -- inside catch block", Date.now());
    return {
      status: 500,
      headers: {},
      props: {
        redirectTo404: true
      },
    };
  }
}
