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
import { IpriceForEachId } from "@/components/partials/shop/Qmint/FeaturedProducts"
import Loader from "@/components/common/Loader"
import Toaster from "@/components/common/Toaster"

function RecentlyViewedProducts() {
  const checkLoadingStatus = useAppSelector(state => state.homePage.loading)
  const openToaster = useAppSelector(state => state.homePage.openToaster)
  const { recentlyViewedProducts } = useAppSelector((state) => state.homePage)
  const [productIds, setProductId] = useState<any>(recentlyViewedProducts)
  const [priceForEachId, setPriceForEachId] = useState<IpriceForEachId | null>(null)
  const [dataWithId, setdataWithId] = useState<any>({})
  useEffect(() => {
    setProductId({ productIds: recentlyViewedProducts })
  }, [recentlyViewedProducts])

  const { data }: any = useApiRequest(ENDPOINTS.recentlyViewdProducts, 'post', productIds);
  const { data: priceData, loading: priceLoading } = useApiRequest(ENDPOINTS.productPrices, 'post', productIds, 60);

  useEffect(() => {
    if (data?.data?.length > 0) {
      const dataOfIds: any = {}
      data?.data?.forEach((product: any) => {
        dataOfIds[product.productId] = product
      })
      setdataWithId(() => dataOfIds)
    }
  }, [data])

  useEffect(() => {
    if (priceData?.data?.length > 0) {
      const idwithpriceObj: any = {}
      priceData?.data?.forEach((product: any) => idwithpriceObj[product?.productId] = product)
      setPriceForEachId(idwithpriceObj)
    }
  }, [priceData])

  return (
    <Layout>
      {openToaster && <Toaster />}
      {checkLoadingStatus && <Loader open={checkLoadingStatus} />}
      <Seo
        keywords={[`QMint RecentlyViewedProducts`]}
        title="RecentlyViewedProducts"
        lang="en"
      />
      <PageTitle title="Recently viewed products" />
      <Container id="PageRecentlyViewedProducts">
        <Box className="ProductList">
          {data?.data?.length > 0 && Object.keys(dataWithId)?.length > 0 && recentlyViewedProducts &&
            recentlyViewedProducts.map((productId: any) => {
              const product = dataWithId[productId]
              product.priceWithDetails = priceForEachId ? priceForEachId[productId] : null;
              return (
                <ProductCard key={product.productId} product={product} />
              )
            })}
        </Box>
        {recentlyViewedProducts && recentlyViewedProducts.length === 0 && <RecordNotFound />}
      </Container>
    </Layout>
  )
}

export default RecentlyViewedProducts