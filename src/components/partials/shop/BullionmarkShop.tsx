import React, { Suspense } from "react"

import { useAppDispatch, useAppSelector, useToggle } from "@/hooks"


import Layout from "@/components/common/Layout";
import Loader from "@/components/common/Loader";
import Toaster from "@/components/common/Toaster";
import Seo from "@/components/common/Seo";
import BestCategorySlider from "./Bullionmark/BestCategorySlider";
import BmkFeaturedProductsSlider from "./Bullionmark/BmkFeaturedProductsSlider";
import BmkPopularProductSlider from "./Bullionmark/BmkPopularProductSlider";


function BullionmarkShop() {
  const { configDetails: configDetailsState, openToaster, loading } = useAppSelector((state) => state.homePage)

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
        <Suspense fallback={<></>}> <BestCategorySlider /></Suspense>
        <Suspense fallback={<></>}> <BmkFeaturedProductsSlider /></Suspense>
        <Suspense fallback={<></>}> <BmkPopularProductSlider /></Suspense>
      </>
    </Layout>)
}

export default BullionmarkShop