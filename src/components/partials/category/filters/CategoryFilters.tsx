import React, { Fragment, useCallback } from "react"
import { useMediaQuery, Theme, ListItem, ListItemButton, ListItemText, Divider } from "@mui/material"

import SmallScreenFilters from "./SmallScreenFilters"
import LargerScreenFilters from "./LargerScreenFilters"
import { navigate } from "gatsby"
import { useAppSelector } from "@/hooks"
import { getlastPartOfPath } from "@/utils/common"

function CategoryFilters({ isPriceChanged, setIsPriceChanged }: { isPriceChanged: boolean, setIsPriceChanged: any }) {
  const isSmallScreen: boolean = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'))
  const pagesSelectedFilters = useAppSelector(state => state.category.pageSelectedFilters)
  const categoryData = useAppSelector(state => state.category)

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
    <Fragment>{((categoryData.items && categoryData.items.length > 0) || Object.keys(pagesSelectedFilters.specification[getlastPartOfPath(location.pathname)] || {}).length > 0 || isPriceChanged) ? (isSmallScreen ? (
      <SmallScreenFilters renderList={renderList} setIsPriceChanged={setIsPriceChanged} pagesSelectedFilters={pagesSelectedFilters} categoryData={categoryData} />
    ) : (
      <LargerScreenFilters renderList={renderList} setIsPriceChanged={setIsPriceChanged} pagesSelectedFilters={pagesSelectedFilters} categoryData={categoryData} />
    )) : null}</Fragment>
  )
}

export default React.memo(CategoryFilters)