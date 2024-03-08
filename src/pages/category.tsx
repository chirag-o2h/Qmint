import React, { useEffect, useState } from "react"
import { useMediaQuery, Theme, Container, Stack } from "@mui/material"

// Components
import Layout from "@/components/common/Layout"
import Seo from "@/components/common/Seo"
import CategoryFilters from "@/components/partials/category/filters/CategoryFilters"
import ProductList from "@/components/partials/category/ProductList"
import SortBy from "@/components/partials/category/filters/SortBy"
import useAPIoneTime from "@/hooks/useAPIoneTime"
import { getCategoryData, setPriceForEachItem, setSortedItems } from "@/redux/reducers/categoryReducer"
import { ENDPOINTS } from "@/utils/constants"
import { useAppDispatch, useAppSelector } from "@/hooks"
import useDebounce from "@/hooks/useDebounce"
import { categoryRequestBody } from "@/types/categoryRequestBody"
import { SortingOption } from "@/types/sortOptions"
import { sortByMostPopular } from "@/utils/itemsSorting"
import useApiRequest from "@/hooks/useAPIRequest"
import { IpriceForEachId } from "@/components/partials/home/FeaturedProducts"

export const pageSize = 12;
export const requestBodyDefault: categoryRequestBody = {
  search: "",
  pageNo: 1,
  pageSize: pageSize,
  sortBy: "",
  sortOrder: "",
  filters: {
    minPrice: 0,
    maxPrice: 100,
    specification: {}
  }
}

function Category() {
  const [page, setPage] = useState(1);

  const dispatch = useAppDispatch();

  const [selectedFilters, setSelectedFilters] = useState<{ [key: string]: string[] }>({});
  const [selectedPrice, setSelectedPrice] = useState<number[] | null>(null);

  // const [priceForEachId, setPriceForEachId] = useState<IpriceForEachId | null>(null)
  const [productIds, setProductIds] = useState({})
  const { data: priceData, loading: priceLoading } = useApiRequest(ENDPOINTS.productPrices, 'post', productIds, 60);
  const categoryData = useAppSelector(state => state.category);

  const debounce = useDebounce(selectedFilters, 700);

  useEffect(() => {
    if (Object.keys(selectedFilters).length || (selectedPrice)) {
      dispatch(getCategoryData(
        {
          url: ENDPOINTS.getCategoryData,
          body: { ...requestBodyDefault, pageNo: page, filters: { minPrice: selectedPrice?.[0], maxPrice: selectedPrice?.[1], specification: selectedFilters } }
        }) as any)
    }
  }, [debounce, selectedPrice]);

  useEffect(() => {
    dispatch(getCategoryData(
      {
        url: ENDPOINTS.getCategoryData,
        body: { ...requestBodyDefault, pageNo: page, filters: { minPrice: selectedPrice?.[0], maxPrice: selectedPrice?.[1], specification: selectedFilters } }
      }) as any)
  }, [page])


  useEffect(() => {
    if (priceData?.data?.length > 0) {
      // console.log("🚀 ~ useEffect ~ priceData:", priceData)
      const idwithpriceObj: any = {}
      priceData?.data?.forEach((product: any) => idwithpriceObj[product?.productId] = product)
      // setPriceForEachId(() => idwithpriceObj)
      dispatch(setPriceForEachItem(idwithpriceObj));
    }
  }, [priceData])

  useEffect(() => {
    if (categoryData?.items?.length > 0) {
      // console.log("🚀 ~ useEffect ~ categoryData:", categoryData)
      const productIds = categoryData?.items?.map((product: any) => product?.productId);
      setProductIds({ productIds })
    }
  }, [categoryData.specifications])

  // useAPIoneTime({
  //   service: getCategoryData, endPoint: ENDPOINTS.getCategoryData, body: {
  //     "search": "",
  //     "pageNo": 1,
  //     "pageSize": 12,
  //     "sortBy": "",
  //     "sortOrder": "",
  //     "filters": {
  //       "minPrice": 0,
  //       "maxPrice": 100,
  //       "specification": {}
  //     }
  //   }
  // })

  const isSmallScreen = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'))

  const categoryFilters = (
    <CategoryFilters selectedFilters={selectedFilters} setSelectedPrice={setSelectedPrice} setSelectedFilters={setSelectedFilters} />
  );

  return (
    <Layout>
      <Seo
        keywords={[`QMint categories`]}
        title="Category"
        lang="en"
      />
      <Container id="PageCategory">
        {isSmallScreen ? (
          <Stack className="CategoryHeader">
            <SortBy />
            {categoryFilters}
          </Stack>
        ) : null}
        <Stack className="MainContent">
          {!isSmallScreen ? categoryFilters : null}
          <ProductList page={page} setPage={setPage} />
        </Stack>
      </Container>
    </Layout>
  )
}

export default Category