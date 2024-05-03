import React, { Fragment, useCallback, useEffect, useRef, useState } from "react"
import { useMediaQuery, Theme, ListItem, ListItemButton, ListItemText, Divider } from "@mui/material"

import SmallScreenFilters from "./SmallScreenFilters"
import LargerScreenFilters from "./LargerScreenFilters"
import { navigate } from "gatsby"
import useDebounce from "@/hooks/useDebounce"
import { ENDPOINTS } from "@/utils/constants"
import { requestBodyDefault } from "@/pages/category/[category]"
import { getCategoryData, setClearFilters, setPageSelectedFilters, setPageSortOrder } from "@/redux/reducers/categoryReducer"
import { useAppDispatch, useAppSelector } from "@/hooks"
import { getlastPartOfPath } from "@/utils/common"
let timeOut: any;

function CategoryFilters({ page, searchParams, setPage }: { setPage: any, page: number, searchParams: URLSearchParams }) {
  const isSmallScreen: boolean = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'))
  const pagesSelectedFilters = useAppSelector(state => state.category.pageSelectedFilters)
  const [selectedFilters, setSelectedFilters] = useState<{ [key: string]: string[] }>({});
  const [selectedPrice, setSelectedPrice] = useState<number[] | null>(null);
  // console.log("🚀 ~ selectedPrice:", selectedPrice)
  const categoryItems = useAppSelector(state => state.category.items)
  const [isPriceChanged, setIsPriceChanged] = useState<boolean>(false);
  const clearFilters = useAppSelector(state => state.category.clearFilters)
  const dispatch = useAppDispatch();
  const firstUpdate = useRef(true);

  const debounceFilter = useDebounce(selectedFilters, 700);
  const debouncePrice = useDebounce(selectedPrice, 700);

  useEffect(() => {
    // dispatch(setPageSelectedFilters({ key: getlastPartOfPath(location.pathname), value: selectedFilters }));
    dispatch(setPageSelectedFilters({ key: getlastPartOfPath(location.pathname), value: { price: selectedPrice, specification: selectedFilters } }));
  }, [selectedFilters, selectedPrice]);

  useEffect(() => {
    if (setPage) {
      // if (parseInt(searchParams.get("page")!) == 1) {
      fetchData()
      // }
      setPage(() => searchParams.has("page") ? parseInt(searchParams.get("page")!) : 1)
    }
    setSelectedFilters(pagesSelectedFilters.specification[getlastPartOfPath(location.pathname)] || {});
    setSelectedPrice(pagesSelectedFilters.price[getlastPartOfPath(location.pathname)] || null);
  }, [window.location, searchParams]);

  useEffect(() => {
    if (Object.keys(debounceFilter).length === 0 && !isPriceChanged) {
      return;
    }
    searchParams.set('page', "1");
    navigate(`?${searchParams.toString()}`, { replace: true });
    if (page === 1) {
      fetchData();
    }
    return () => {
      firstUpdate.current = true;
    }
  }, [debounceFilter, debouncePrice])

  useEffect(() => {
    fetchData();
  }, [page])

  useEffect(() => {
    if (clearFilters) {
      const apiCall = async () => {
        const commonArgument = {
          pageNo: 1, filters: { specification: {} }
        };

        const argumentForService = {
          url: searchParams.has("keyword") ? ENDPOINTS.search : ENDPOINTS.getCategoryData + `/${getlastPartOfPath(location.pathname)}`,
          body: searchParams.has("keyword") ? { ...requestBodyDefault, search: searchParams.get("keyword")!, ...commonArgument } : { ...requestBodyDefault, ...commonArgument }
        }

        // if (selectedFilters && Object.keys(selectedFilters)?.length || (selectedPrice)) {
        await dispatch(getCategoryData(
          argumentForService) as any)
      }
      setSelectedFilters({});
      setSelectedPrice(null);
      dispatch(setPageSortOrder({ key: getlastPartOfPath(location.pathname), value: null }));
      apiCall();
      dispatch(setClearFilters(false));
    }
  }, [clearFilters])

  const navigatePageHandler = (categoryId: number, searchEngineFriendlyPageName: string) => {
    navigate(`/${searchEngineFriendlyPageName}`, { state: { categoryId: categoryId } })
  }

  const fetchData = async () => {
    const commonArgument = {
      pageNo: page - 1, filters: { minPrice: selectedPrice?.[0], maxPrice: selectedPrice?.[1], specification: selectedFilters }
    };

    const argumentForService = {
      url: searchParams.has("keyword") ? ENDPOINTS.search : ENDPOINTS.getCategoryData + `/${getlastPartOfPath(location.pathname)}`,
      body: searchParams.has("keyword") ? { ...requestBodyDefault, search: searchParams.get("keyword")!, ...commonArgument } : { ...requestBodyDefault, ...commonArgument }
    }
    if (timeOut) {
      clearTimeout(timeOut)
    }
    timeOut = setTimeout(() => {
      dispatch(getCategoryData(
        argumentForService) as any)
    }, 1000);
    // if (selectedFilters && Object.keys(selectedFilters)?.length || (selectedPrice)) {
    // await dispatch(getCategoryData(
    //   argumentForService) as any)
    // }
  }

  const renderList = useCallback((data: any) => {
    return (
      <>
        {
          data.map((item: any, index: number) => (
            <Fragment key={item.categoryId}>
              <ListItem>
                <ListItemButton onClick={() => navigatePageHandler(item.categoryId, item.searchEngineFriendlyPageName)} selected={false}>
                  <ListItemText primary={item.name} primaryTypographyProps={{ variant: "body2" }} />
                </ListItemButton>
              </ListItem>
              {(index !== data.length - 1) && <Divider key={`Divider-${item}`} />}
            </Fragment>
          ))
        }
      </>
    )
  }, [])

  return (
    // ensure that filtrs and price are not empty before hiding the all filters section
    <Fragment>{((categoryItems && categoryItems.length > 0) || Object.keys(selectedFilters).length > 0 || isPriceChanged) ? (isSmallScreen ? (
      <SmallScreenFilters renderList={renderList} setSelectedFiltersMobile={setSelectedFilters} setSelectedPriceMobile={setSelectedPrice} setIsPriceChanged={setIsPriceChanged} />
    ) : (
      <LargerScreenFilters renderList={renderList} setSelectedFilters={setSelectedFilters} setSelectedPrice={setSelectedPrice} selectedFilters={selectedFilters} setIsPriceChanged={setIsPriceChanged} selectedPrice={selectedPrice} />
    )) : null}</Fragment>
  )
}

export default React.memo(CategoryFilters)