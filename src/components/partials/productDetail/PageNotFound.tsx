import React, { Suspense, lazy, useEffect, useState } from "react"
import { Box, Container, Typography, Button, ToggleButtonGroup, Card, Skeleton, Stack } from "@mui/material/"
import { SectionHeading } from "@/components/common/Utils"
import { useAppSelector } from "@/hooks"
import { ENDPOINTS } from "@/utils/constants"
import { Idata, IpriceForEachId } from "@/components/partials/shop/Qmint/FeaturedProducts"
import useApiRequest from "@/hooks/useAPIRequest"
import { ProductCard } from "@/components/common/Card"
import { navigate } from "gatsby"
import Toaster from "../../common/Toaster"
import PageNotFoundText from "../PageNotFoundText"

// Components
// import Layout from "../components/common/Layout"
// import Seo from "../components/common/Seo"
const Layout = lazy(() => import("../../common/Layout"))
const Seo = lazy(() => import("../../common/Seo"))

const defaultData = {
  "search": "",
  "pageNo": 0,
  "pageSize": -1,
  "sortBy": "",
  "sortOrder": "",
  "filters": {
    "showOnHomepage": true
  }
}

function PageNotFound() {
  const openToaster = useAppSelector(state => state.homePage.openToaster)
  // const configDetails = useAppSelector(state => state.homePage.configDetails)
  const [priceForEachId, setPriceForEachId] = useState<IpriceForEachId | null>(null)
  const [dataforbody, setDataforbody] = useState<any>(defaultData)
  const [productIds, setProductIds] = useState({})
  const { data }: Idata = useApiRequest(ENDPOINTS.getProduct, 'post', dataforbody);
  const { data: priceData, loading: priceLoading } = useApiRequest(ENDPOINTS.productPrices, 'post', productIds, 60);

  useEffect(() => {
    setDataforbody({ ...dataforbody, filters: { ...dataforbody.filters } })
  }, [])

  useEffect(() => {
    if (priceData?.data?.length > 0) {
      const idwithpriceObj: any = {}
      priceData?.data?.forEach((product: any) => idwithpriceObj[product?.productId] = product)
      setPriceForEachId(idwithpriceObj)
    }
  }, [priceData])

  useEffect(() => {
    if (data?.data?.items?.length > 0) {
      const productIds = data?.data?.items?.map(product => product?.productId);
      setProductIds({ productIds })
    }
  }, [data])

  return (
    // <Suspense fallback={<Box sx={{ height: '100vh', width: '100%' }}></Box>}>
    //   <Layout>
    //     <Seo
    //       title="404"
    //     />
    <>
      {openToaster && <Toaster />}

      {/* Related products */}
      <Box>
        <Container id="PopularProducts" component="section" style={{ paddingTop: "0px" }}>
          <PageNotFoundText showMoreTextQuestion={true}/>
          <Typography sx={{ textAlign: 'center', fontWeight: '500', fontSize: '20px' }} component="p" variant="subtitle1">We hope you strike better luck with this popular product</Typography>

          <Box className="ProductsWrapper">
            <Box className="Wrapper">
              {
                data?.data?.items?.length > 0 ? data?.data?.items?.map((product) => {
                  product.priceWithDetails = priceForEachId ? priceForEachId[product?.productId] : null;
                  return (
                    <ProductCard key={product.productId} product={product} />
                  )
                })
                  :
                  Array(12).fill(0).map((_, index) => {
                    return (
                      <Card className="ProductCard" key={index}>
                        <Skeleton animation="wave" height={500} style={{ borderRadius: "10px 10px 0 0", padding: "0px" }} />
                        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                          <Skeleton animation="wave" height={95} width="95%" style={{ marginBottom: "4px" }} />
                          <Skeleton animation="wave" height={70} width="95%" />
                        </div>
                      </Card>
                    );
                  })
              }
            </Box>
            <Stack className="Action">
              <Button className="DiscoverMore" name='DiscoverMore' aria-label="DiscoverMore" variant="contained" onClick={() => {
                navigate('/shop')
              }}>Discover More</Button>
            </Stack>
          </Box>
        </Container>
      </Box>
    </>
    //   </Layout>
    // </Suspense>
  )
}

export default React.memo(PageNotFound)