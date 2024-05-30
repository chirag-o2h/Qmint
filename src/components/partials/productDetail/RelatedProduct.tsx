import React, { useState, useEffect } from "react"
import { Box, Card, Skeleton } from "@mui/material"

// Componenets
import { SectionHeading } from "@/components/common/Utils"
import { ProductCard } from "@/components/common/Card"

// Type
import type { Idata, IpriceForEachId } from "../shop/Qmint/FeaturedProducts"

// Utils
import { ENDPOINTS } from "@/utils/constants"

// Hooks
import useApiRequest from "@/hooks/useAPIRequest"

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

function RelatedProduct({relatedProductsList, heading, description}:any) {
  const [priceForEachId, setPriceForEachId] = useState<IpriceForEachId | null>(null)
  const [productIds, setProductIds] = useState({})
  const [dataforbody, setDataforbody] = useState<any>(defaultData)
  // const { data }: Idata = useApiRequest(ENDPOINTS.getProduct, 'post', dataforbody);
  const { data: priceData, loading: priceLoading } = useApiRequest(ENDPOINTS.productPrices, 'post', productIds, 60);

  useEffect(() => {
    if (priceData?.data?.length > 0) {
      const idwithpriceObj: any = {}
      priceData?.data?.forEach((product: any) => idwithpriceObj[product?.productId] = product)
      setPriceForEachId(idwithpriceObj)
    }
  }, [priceData])

  useEffect(() => {
    if (relatedProductsList?.length > 0) {
      const productIds = relatedProductsList?.map((product:any) => product?.productId);
      setProductIds({ productIds })
    }
  }, [relatedProductsList])

  return (
    <Box className="RelatedProduct">
      <SectionHeading
        title={heading ?? "Related Products"}
        description={description ?? "Lorem Ipsum is simply dummy text of the printing and typesetting industry."}
      />
      <Box className="ProductList">
        {
          relatedProductsList?.length > 0 ? relatedProductsList?.map((product:any) => {
            product.priceWithDetails = priceForEachId ? priceForEachId[product?.productId] : null;
            return (
              <ProductCard key={product.productId} product={product} />
            )
          })
            : 'No data found page upcoming'
            // Array(12).fill(0).map((_, index) => {
            //   return (
            //     <Card className="ProductCard" key={index}>
            //       <Skeleton animation="wave" height={500} style={{ borderRadius: "10px 10px 0 0", padding: "0px" }} />
            //       <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            //         <Skeleton animation="wave" height={95} width="95%" style={{ marginBottom: "4px" }} />
            //         <Skeleton animation="wave" height={70} width="95%" />
            //       </div>
            //     </Card>
            //   );
            // })
        }
      </Box>
    </Box>
  )
}

export default RelatedProduct