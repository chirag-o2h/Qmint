import React, { Suspense, lazy, useEffect, useMemo, useState, useTransition } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks";
import Seo from "@/components/common/Seo";
import {
  setBmkShopPageSections,
  setConfigDetails,
} from "@/redux/reducers/homepageReducer";
const BannerSlider = lazy(
  () => import("../../landing-page/Bullionmark/BannerSlider")
);
// import BannerSlider from "../../landing-page/Bullionmark/BannerSlider"
import { Skeleton, useMediaQuery } from "@mui/material";
import useUserDetailsFromToken from "@/hooks/useUserDetailsFromToken";
import RenderOnViewportEntry from "@/components/common/RenderOnViewportEntry";

// const Layout = lazy(() => import("@/components/common/Layout"));
// const Loader = lazy(() => import("@/components/common/Loader"));
const Toaster = lazy(() => import("@/components/common/Toaster"));
const BestCategorySlider = lazy(() => import("./BestCategorySlider"));
const BmkFeaturedProductsSlider = lazy(() => import("./BmkFeaturedProductsSlider"));
// import BestCategorySlider from "./BestCategorySlider"
// import BmkFeaturedProductsSlider from "./BmkFeaturedProductsSlider"
import { ENDPOINTS } from "@/utils/constants";
import axiosInstance from "@/axiosfolder";
import { getShoppingCartData } from "@/redux/reducers/shoppingCartReducer";
import { bodyForGetShoppingCartData } from "@/utils/common";
import BestCategorySliderSkeleton from "./BestCategorySliderSkeleton";
// import BullionmarkHeader from "@/components/header/BullionmarkHeader";
// import Layout from "@/components/common/Layout";

const BullionmarkHeader = lazy(
  () => import("@/components/header/BullionmarkHeader")
);
const LazyBullionmarkFooter = lazy(
  () => import("@/components/footer/BullionmarkFooter")
);

const ThreePicsRow = lazy(() => import("./ThreePicsRow"));
const OneBigPicAndContent = lazy(() => import("./OneBigPicAndContent"));
const BmkPopularProductSlider = lazy(() => import("./BmkPopularProductSlider"));
const ExclusiveJourneys = lazy(
  () => import("../../landing-page/Bullionmark/ExclusiveJourneys")
);
const InspiringStories = lazy(
  () => import("../../landing-page/Bullionmark/InspiringStories")
);
import useragent from 'express-useragent';
import useSetConfigAndFavicon from "@/hooks/useSetConfigAndFavicon";
const BullionmarkShop = (props: any) => {
  const { serverData } = props;
  const [isRendering, setIsRendering] = useState(true);
  const dispatch = useAppDispatch();
  const {
    configDetails: configDetailsState,
    openToaster,
    loading,
    bmkShopPageSections,
    isLoggedIn
  } = useAppSelector((state) => state.homePage);
  useSetConfigAndFavicon(serverData)
  // }, []);
  const [isPending, startTransition] = useTransition();
  useEffect(() => {
    startTransition(() => {
      // Simulating initial data fetch
      setTimeout(() => setIsRendering(false), 3500);
    });
  }, [])

  // useAPIoneTime({ service: getBullionMarkShopPageSections });
  useUserDetailsFromToken();
  const isMobile = serverData?.isMobile // useMediaQuery((theme: any) => theme.breakpoints.down("sm"));
  const keyWords = useMemo(() => {
    return (
      serverData?.configDetails?.Store_ShopPage_Meta_Keywords?.value?.split(",") || []
    );
  }, [serverData?.configDetails]);
  // useAPIoneTime({
  //   service: configDetails,
  //   endPoint: ENDPOINTS.getConfigStore,
  //   // conditionalCall: !isItMainPage,
  // });
  useEffect(() => {
    const x = setTimeout(() => {
      dispatch(
        getShoppingCartData({
          url: ENDPOINTS.getShoppingCartData,
          body: bodyForGetShoppingCartData,
        })
      );
    }, 3000);
    return () => {
      clearTimeout(x)
    }
  }, [isLoggedIn]);
  return (
    <>
      <>
        <Seo
          keywords={[
            "gatsby",
            "tailwind",
            "react",
            "tailwindcss",
            "Travel",
            "Qmit",
            "gold",
            "metal",
            ...keyWords,
          ]}
          lang="en"
          isItShopPage={true}
          description={
            serverData?.configDetails?.Store_ShopPage_Meta_Description?.value
          }
          configDetailsState={serverData?.configDetails}
        />
        {!isRendering && <Suspense fallback={
          <Skeleton
            height={"124px"}
            width={"100%"}
            style={{ marginBottom: !isMobile ? "0px" : "0px", transform: "scale(1)", position: "sticky", top: '0px' }}
          />
        }><BullionmarkHeader /></Suspense>}
        {
          isRendering &&
          (
            <>
              <Skeleton
                height={"124px"}
                width={"100%"}
                style={{ marginBottom: !isMobile ? "0px" : "0px", transform: "scale(1)", zIndex: 9999, background: "gray" }}
              />

              {/* {isMobile && (
              <BestCategorySliderSkeleton
                pageData={serverData?.bmkShopPageSections}
                PaddingClass={
                  !isMobile &&
                  serverData?.configDetails?.Sliders_ShopHomepage_Enable?.value
                    ? ""
                    : "TopBannerAbsent"
                }
                title={
                  serverData?.configDetails?.[
                    "ShopHomepage_Section_1_Featured_Categories_Title"
                  ]?.value
                }
              />
            )} */}
            </>
          )}
        {!isMobile && !isRendering && serverData?.configDetails?.Sliders_ShopHomepage_Enable?.value == true && (
          <Suspense fallback={<Skeleton height={"500px"}></Skeleton>}>
            <BannerSlider isItShopPage={true} bannerSliderData={serverData?.bannerSliderData} />
          </Suspense>
        )}

        <RenderOnViewportEntry
          rootMargin="200px"
          threshold={0.25}
          minHeight={900}
          skeletonMargin={-220}
        >
        <BestCategorySlider
          pageData={serverData?.bmkShopPageSections}
          PaddingClass={
            !isMobile &&
              serverData?.configDetails?.Sliders_ShopHomepage_Enable?.value
              ? ""
              : "TopBannerAbsent"
          }
          title={
            serverData?.configDetails?.[
              "ShopHomepage_Section_1_Featured_Categories_Title"
            ]?.value
          }
          isMobile={isMobile}
        />
        </RenderOnViewportEntry>
        <RenderOnViewportEntry
          rootMargin="200px"
          threshold={0.25}
          minHeight={950}
          skeletonMargin={-220}
        >
          <BmkFeaturedProductsSlider
            title={
              serverData?.configDetails?.[
                "ShopHomepage_Section_2_Featured_Products_Title"
              ]?.value
            }
            description={
              serverData?.configDetails?.[
                "ShopHomepage_Section_2_Featured_Products_Subtitle"
              ]?.value
            }
            needToCallProductAPI={false}
            productData={serverData?.productData}
            isMobile = {serverData?.isMobile}
          // priceForEachId={serverData?.priceForEachId}
          />
        </RenderOnViewportEntry>
        <RenderOnViewportEntry
          rootMargin="200px"
          threshold={0.25}
          minHeight={600}
        >
          <ThreePicsRow />
        </RenderOnViewportEntry>
        <RenderOnViewportEntry
          rootMargin="200px"
          threshold={0.25}
          minHeight={550}
        >
          <OneBigPicAndContent />
        </RenderOnViewportEntry>
        <RenderOnViewportEntry
          rootMargin="200px"
          threshold={0.25}
          minHeight={750}
        >
          <BmkPopularProductSlider
            title={
              serverData?.configDetails?.[
                "ShopHomepage_Section_5_Popular_Products_Title"
              ]?.value
            }
            description={
              serverData?.configDetails?.[
                "ShopHomepage_Section_5_Popular_Products_Subtitle"
              ]?.value
            }
          />
        </RenderOnViewportEntry>
        <RenderOnViewportEntry
          rootMargin="200px"
          threshold={0.25}
          minHeight={800}
        >
          <ExclusiveJourneys
            data={
              bmkShopPageSections?.shopHomepage_Section_6_Two_pics_and_content
            }
          />
        </RenderOnViewportEntry>
        <RenderOnViewportEntry
          rootMargin="200px"
          threshold={0.25}
          minHeight={800}
        >
          <InspiringStories
            title={
              serverData?.configDetails?.[
                "ShopHomepage_Section_7_Two_pics_in_a_rows_Title"
              ]?.value
            }
            data={
              bmkShopPageSections?.shopHomepage_Section_7_Two_pics_in_a_rows
            }
            className="ShopInspiringStories"
          />
        </RenderOnViewportEntry>
        {openToaster && (
          <Suspense fallback={<></>}>
            <Toaster />
          </Suspense>
        )}
        <RenderOnViewportEntry
          rootMargin="200px"
          threshold={0.25}
          minHeight={800}
        >
          <LazyBullionmarkFooter />
        </RenderOnViewportEntry>
      </>
    </>
  );
};
// Implement getServerData for BullionmarkShop
BullionmarkShop.getServerData = async (context: any) => {
  try {
    console.log("getServerData -- starting", context.headers.get('user-agent'), Date.now());
    // Parse the user-agent from the context
    const ua = useragent.parse(context.headers.get('user-agent'));
    const isMobile = ua.isMobile ? true : false;
    const dataforbody = {
      search: "",
      pageNo: 0,
      pageSize: -1,
      sortBy: "",
      sortOrder: "",
      filters: {
        isFeatureProduct: true,
      },
    };

    console.log("getServerData -- before fetching data", Date.now());
    const [
      configDetailsResponse,
      bmkShopPageSectionsResponse,
      productResponse,
      bannerSliderResponse
    ] = await Promise.all([
      axiosInstance.get(ENDPOINTS.getConfigStore),
      axiosInstance.get(ENDPOINTS.bullionMarkShopSections),
      axiosInstance.post(ENDPOINTS.getProduct, dataforbody),
      axiosInstance.get(ENDPOINTS.getSlider.replace('typeEnum', '1'))
    ]);

    const configDetails = configDetailsResponse.data.data;
    const bmkShopPageSections = bmkShopPageSectionsResponse.data.data;
    const productData = productResponse.data.data;
    const bannerSliderData = bannerSliderResponse?.data
    // let priceForEachId = null;

    // if (productData?.data?.items?.length > 0) {
    //     const ids = productData.data.items.map((product:any) => product.productId);
    //     const priceResponse = await axiosInstance.post(ENDPOINTS.productPrices, { productIds: ids });
    //     const priceData = priceResponse.data;

    //     priceForEachId = {};
    //     priceData?.data?.forEach((product:any) => {
    //         priceForEachId[product.productId] = product;
    //     });
    // }

    console.log("getServerData -- before returning props", isMobile, Date.now());

    return {
      props: {
        isMobile,
        configDetails: configDetails?.reduce((acc: any, curr: any) => {
          acc[curr.key] = curr
          return acc
        }, {}),
        configDetailsForRedux: configDetails,
        bmkShopPageSections,
        productData: productData,
        bannerSliderData: bannerSliderData
        // priceForEachId,
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
};
export default BullionmarkShop;
