import React from "react"
import { Box, Skeleton, Card, Pagination, Stack } from "@mui/material"

// Components
import { ProductCard } from "@/components/common/Card"
// Hooks
import { useAppSelector } from "@/hooks"
import { pageSize } from "@/pages/[category]"

function ProductList({ page, setPage }: { page: number, setPage: any }) {
  const categoryData = useAppSelector((state) => state.category);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  }

  return (
    <Box className="ProductList">
      <Box className="ProductListWrapper">
        {
          categoryData?.items?.length > 0 ? categoryData.items.map((product: any) => {
            // const updatedProduct = { ...product };
            // updatedProduct.priceWithDetails = priceForEachId ? priceForEachId[product?.productId] : null;
            return (
              <ProductCard key={product.productId} product={product} />
            );
          })
            :
            Array(6).fill(0).map((_, index) => {
              return (
                <Card className="ProductCard" key={index}>
                  <Skeleton animation="wave" height={500} style={{ borderRadius: "10px 10px 0 0", padding: "0px" }} />
                  <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                    <Skeleton animation="wave" height={95} width="95%" style={{ marginBottom: "4px" }} />
                    <Skeleton animation="wave" height={70} width="95%" />
                  </div>
                </Card>
              )
            })
        }
      </Box>
      <Stack className="Pagination">
        <Pagination count={Math.floor(categoryData.count / pageSize)} page={page} shape="rounded" onChange={handlePageChange} />
      </Stack>
    </Box>
  )
}

export default ProductList