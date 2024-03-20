import React, { useEffect, useState } from "react"
import { Box, Container } from "@mui/material"

// Componenets
import Layout from "@/components/common/Layout"
import Seo from "@/components/common/Seo"
import { PageTitle } from "@/components/common/Utils"
import { ProductCard } from "@/components/common/Card"
import RecordNotFound from "@/components/common/RecordNotFound"
import { useAppSelector } from "@/hooks"
import useAPIoneTime from "@/hooks/useAPIoneTime"
import useApiRequest from "@/hooks/useAPIRequest"
import { ENDPOINTS } from "@/utils/constants"
import { IpriceForEachId } from "@/components/partials/home/FeaturedProducts"

function RecentlyViewedProducts() {
  const { recentlyViewedProducts } = useAppSelector((state) => state.homePage)
  const [productIds, setProductId] = useState<any>(recentlyViewedProducts)
  const [priceForEachId, setPriceForEachId] = useState<IpriceForEachId | null>(null)

  console.log("🚀 ~ RecentlyViewedProducts ~ recentlyViewedProducts:", recentlyViewedProducts)
  
  useEffect(() => {
    setProductId({ productIds: recentlyViewedProducts })
  }, [recentlyViewedProducts])

  const { data }: any = useApiRequest(ENDPOINTS.recentlyViewdProducts, 'post',productIds);
  const { data: priceData, loading: priceLoading } = useApiRequest(ENDPOINTS.productPrices, 'post', productIds, 60);

  useEffect(() => {
    if (priceData?.data?.length > 0) {
      const idwithpriceObj: any = {}
      priceData?.data?.forEach((product: any) => idwithpriceObj[product?.productId] = product)
      setPriceForEachId(idwithpriceObj)
    }
  }, [priceData])
  return (
    <Layout>
      <Seo
        keywords={[`QMint RecentlyViewedProducts`]}
        title="RecentlyViewedProducts"
        lang="en"
      />
      <PageTitle title="Recently viewed products" />
      <Container id="PageRecentlyViewedProducts">
        <Box className="ProductList">
          {data?.data?.length > 0 ?
            data?.data?.map((product: any) => {
              product.priceWithDetails = priceForEachId ? priceForEachId[product?.productId] : null;
              return (
                <ProductCard key={product.productId} product={product} />
              )
            })
            : <RecordNotFound />}
        </Box>
      </Container>
    </Layout>
  )
}

export default RecentlyViewedProducts