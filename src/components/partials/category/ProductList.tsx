import React, { useEffect, useState } from "react"
import { Box, Skeleton, Card, Pagination, Stack, Typography } from "@mui/material"

// Components
import { ProductCard } from "@/components/common/Card"
// Hooks
import { useAppDispatch, useAppSelector } from "@/hooks"
import { pageSize } from "@/pages/category/[category]"
import Toaster from "@/components/common/Toaster"
import { navigate } from "gatsby"
import { SortingOption } from "@/types/enums"
import { setPriceForEachItem, setSortedItems } from "@/redux/reducers/categoryReducer"
import { sortByMostPopular, sortByPriceHighToLow, sortByPriceLowToHigh } from "@/utils/itemsSorting"
import { getlastPartOfPath } from "@/utils/common"
import useApiRequest from "@/hooks/useAPIRequest"
import { ENDPOINTS } from "@/utils/constants"
import { THEME_TYPE } from "@/axiosfolder"
import BmkProductCard from "../shop/Bullionmark/BmkProductCard"

function ProductList({ page, setPage }: { page: number, setPage: any }) {
  const categoryData = useAppSelector((state) => state.category);
  const pageSortOrder = useAppSelector((state) => state.category.pageSortOrder);
  const dispatch = useAppDispatch();
  const [productIds, setProductIds] = useState({})
  const { data: priceData, loading: priceLoading } = useApiRequest(ENDPOINTS.productPrices, 'post', productIds, 60);
  const { openToaster } = useAppSelector(state => state.homePage)

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    const pageQuery = new URLSearchParams(location.search);
    pageQuery.set('page', value.toString());
    navigate(`?${pageQuery.toString()}`, { replace: true });
  }

  useEffect(() => {
    const sortByValue = pageSortOrder[getlastPartOfPath(location.pathname)];
    // console.log("🚀 ~ useEffect ~ sortByValue:", sortByValue)
    if (!sortByValue) return;
    if (!categoryData.items) return;
    if (sortByValue === SortingOption.Popular) {
      dispatch(setSortedItems(sortByMostPopular(categoryData.items)));
    }
    else if (sortByValue === SortingOption.PriceHighToLow) {
      dispatch(setSortedItems(sortByPriceHighToLow(categoryData.items)));
    }
    else if (sortByValue === SortingOption.PriceLowToHigh) {
      dispatch(setSortedItems(sortByPriceLowToHigh(categoryData.items)));
    }
  }, [categoryData?.items, pageSortOrder, page, location.pathname]);

  useEffect(() => {
    if (categoryData.items?.length ?? 0 > 0) {
      const productIds = categoryData?.items?.map((product: any) => product?.productId);
      setProductIds({ productIds })
    }
  }, [categoryData.specifications])

  useEffect(() => {
    if (priceData?.data?.length > 0) {
      const idwithpriceObj: any = {}
      priceData?.data?.forEach((product: any) => idwithpriceObj[product?.productId] = product)
      // setPriceForEachId(() => idwithpriceObj)
      dispatch(setPriceForEachItem(idwithpriceObj));
    }
  }, [priceData])

  return (
    <Box className="ProductList">
      {openToaster && <Toaster />}
      <Box className="ProductListWrapper">
        {
          !categoryData.loading ? (
            categoryData.sortedItems?.map((product: any) => {
              return (
               THEME_TYPE == '1' ? <BmkProductCard product={product} key={product.productId}/>: <ProductCard key={product.productId} product={product} stickyProduct={false} />
              );
            })
          ) : (
            <>
              {/* <Box className="CategoryFilters">
                <Skeleton animation="wave" height="100vh" width="100%" style={{ margin: "0px", padding : "0px" , transform:"none" }} />
              </Box> */}
              {Array(6).fill(0).map((_, index) => {
                return (
                  <Card className="ProductCard" key={index}>
                    <Skeleton animation="wave" height={350} width="100%" style={{ borderRadius: "10px 10px 0 0", padding: "0px" }} />
                    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                      <Skeleton animation="wave" height={95} width="95%" style={{ marginBottom: "4px" }} />
                      <Skeleton animation="wave" height={70} width="95%" />
                    </div>
                  </Card>
                )
              })}
            </>
          )
        }
      </Box>
      {!categoryData.loading && categoryData.items && categoryData.items.length === 0 && <Typography variant="h6" component="p">There are no products in this category or filters you have selected.</Typography>}
      {categoryData?.count > 0 && <Stack className="Pagination">
        <Pagination count={Math.ceil(categoryData?.count / pageSize)} page={page} shape="rounded" onChange={handlePageChange} />
      </Stack>}
    </Box>
  )
}

export default ProductList