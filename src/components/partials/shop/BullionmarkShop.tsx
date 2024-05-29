import React, { Suspense } from "react"

import { useAppDispatch, useAppSelector, useToggle } from "@/hooks"


import Layout from "@/components/common/Layout";
import Loader from "@/components/common/Loader";
import Toaster from "@/components/common/Toaster";
import Seo from "@/components/common/Seo";
import BestCategorySlider from "./Bullionmark/BestCategorySlider";
import BmkFeaturedProductsSlider from "./Bullionmark/BmkFeaturedProductsSlider";
import BmkPopularProductSlider from "./Bullionmark/BmkPopularProductSlider";
import BannerSlider from "../home-bullionmark/BannerSlider";
import InspiringStories from "../home-bullionmark/InspiringStories";
import ExclusiveJourneys from "../home-bullionmark/ExclusiveJourneys";
import useAPIoneTime from "@/hooks/useAPIoneTime";
import { getBullionMarkShopPageSections } from "@/redux/reducers/homepageReducer";
import ThreePicsRow from "./Bullionmark/ThreePicsRow";
import OneBigPicSlider from "./Bullionmark/OneBigPicSlider";


function BullionmarkShop() {
  const { openToaster, loading, bmkShopPageSections } = useAppSelector((state) => state.homePage)
  useAPIoneTime({ service: getBullionMarkShopPageSections })

  return (
    <Layout>
      <>
        <Loader open={loading} />
        {openToaster && <Toaster />}
        <Seo
          keywords={[`gatsby`, `tailwind`, `react`, `tailwindcss`]}
          title="Home"
          lang="en"
        />
        <Suspense fallback={<></>}><BannerSlider /></Suspense>
        <Suspense fallback={<></>}> <BestCategorySlider /></Suspense>
        <Suspense fallback={<></>}> <BmkFeaturedProductsSlider /></Suspense>
        <Suspense fallback={<></>}> <ThreePicsRow /></Suspense>
        <Suspense fallback={<></>}> <OneBigPicSlider /></Suspense>
        <Suspense fallback={<></>}> <BmkPopularProductSlider /></Suspense>
        <Suspense fallback={<></>}><ExclusiveJourneys data={bmkShopPageSections?.shopHomepage_Section_6_Two_pics_and_content
        } /></Suspense>
        <Suspense fallback={<></>}><InspiringStories data={bmkShopPageSections?.shopHomepage_Section_7_Two_pics_in_a_rows} /></Suspense>
      </>
    </Layout>)
}

export default BullionmarkShop