import React, { useEffect, useState } from "react"
import { Container, Stack, Box, ToggleButtonGroup, ToggleButton, Button, Card, Skeleton } from "@mui/material"

// Utils
import { SectionHeading } from "../../../common/Utils"
import { ProductCard } from "../../../common/Card"
import useApiRequest from "@/hooks/useAPIRequest"
import { Idata, IpriceForEachId } from "./FeaturedProducts"
import { ENDPOINTS } from "@/utils/constants"
import { navigate } from "gatsby"
import { useAppSelector } from "@/hooks"
import useGetPopulurProductsData from "@/hooks/useGetPopulurProductsData"
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
function SkeletonPopularProducts({ index }: { index: number | string }) {
  return (<Card className="ProductCard">
    <Skeleton animation="wave" height={500} style={{ borderRadius: "10px 10px 0 0", padding: "0px" }} />
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
      <Skeleton animation="wave" height={95} width="95%" style={{ marginBottom: "4px" }} />
      <Skeleton animation="wave" height={70} width="95%" />
    </div>
  </Card>)
}
function PopularProducts() {
  const { configDetails } = useAppSelector((state) => state.homePage)
  const { data, priceForEachId, productType, setProductType } = useGetPopulurProductsData()

  const handleChange = (event: any, newProductType: any) => {
    if (newProductType !== null) {
      setProductType(newProductType)
    }
  }
  return (
    <Container id="PopularProducts" component="section">
      <SectionHeading
        title={configDetails?.["ShopHomepage_Section_4_Popular_Products_Title"]?.value ?? "Popular Products*"}
        description={configDetails?.["ShopHomepage_Section_4_Popular_Products_Subtitle"]?.value ?? "description*"}
      />
      <Stack className="ToggleWrapper">
        <ToggleButtonGroup
          color="primary"
          value={productType}
          onChange={handleChange}
          aria-label="Products toggle"
          exclusive
        >
          <ToggleButton value="all">All</ToggleButton>
          <ToggleButton value="gold">Gold</ToggleButton>
          <ToggleButton value="silver">Silver</ToggleButton>
        </ToggleButtonGroup>
      </Stack>
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
  )
}

export default React.memo(PopularProducts)