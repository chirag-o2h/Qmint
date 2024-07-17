import React, { Fragment, useCallback, useMemo } from "react"
import { useMediaQuery, Theme, ListItem, ListItemButton, ListItemText, Divider } from "@mui/material"

import SmallScreenFilters from "./SmallScreenFilters"
import LargerScreenFilters from "./LargerScreenFilters"
import { navigate } from "gatsby"
import { useAppSelector } from "@/hooks"
import { getlastPartOfPath } from "@/utils/common"
import { useLocation } from "@reach/router"

function CategoryFilters({ isPriceChanged, setIsPriceChanged,categoryData:categoryDataFromServer }: { isPriceChanged: boolean, setIsPriceChanged: any,categoryData:any }) {
  const location = useLocation()
  const isSmallScreen: boolean = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'))
  const pagesSelectedFilters = useAppSelector(state => state.category.pageSelectedFilters)
  const categoryData = useAppSelector(state => state.category)
  const currentCategoryData = useMemo(()=>{
    return (!!(categoryData?.items?.length) ? categoryData : categoryDataFromServer)},[categoryData,categoryDataFromServer])
  const renderList = useCallback((data: any) => {
    return (
      <>
        {
          data.map((item: any, index: number) => (
            <Fragment key={item.categoryId}>
              <ListItem>
                <ListItemButton onClick={() => navigate(`/category/${item.searchEngineFriendlyPageName}`)} selected={false}>
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
    <Fragment>{((currentCategoryData.items && currentCategoryData.items.length > 0) || Object.keys(pagesSelectedFilters.specification[getlastPartOfPath(location.pathname)] || {}).length > 0 || isPriceChanged) ? (isSmallScreen ? (
      <SmallScreenFilters renderList={renderList} setIsPriceChanged={setIsPriceChanged} pagesSelectedFilters={pagesSelectedFilters} categoryData={currentCategoryData} />
    ) : (
      <LargerScreenFilters renderList={renderList} setIsPriceChanged={setIsPriceChanged} pagesSelectedFilters={pagesSelectedFilters} categoryData={currentCategoryData} />
    )) : null}</Fragment>
  )
}

export default React.memo(CategoryFilters)