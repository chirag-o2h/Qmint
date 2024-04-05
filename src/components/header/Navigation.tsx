import React, { Fragment, Suspense, lazy, useEffect, useState } from "react"
import { Container, Stack, Divider, Button, Box } from "@mui/material"
import classNames from "classnames"

// Components
import { HoverTooltip } from "../common/CustomTooltip"
import { ConstantApiLoader, PageLoader } from "./Loader"
const ChartMenu = lazy(() => import('./ChartMenu'))
const CartMenu = lazy(() => import('./CartMenu'))
import ActionMenu from "./ActionMenu"
import MegaMenu from "./MegaMenu"
import { useAppDispatch, useAppSelector } from "@/hooks"
import Badge from '@mui/material/Badge';

// Utils
import { chartMenuData, subMenuItems } from "../../utils/data"
import { Link, navigate } from "gatsby"
import { ProductUpdateCountdown } from "../common/Utils"
import { getShoppingCartData } from "@/redux/reducers/shoppingCartReducer"
import { ENDPOINTS } from "@/utils/constants"
import useAPIoneTime from "@/hooks/useAPIoneTime"
import { bodyForGetShoppingCartData } from "@/utils/common"
import { getLiveDashboardChartData } from "@/redux/reducers/homepageReducer"


export interface Icategory {
  categoryId: number,
  name: string,
  description: any,
  parentCategoryId: number,
  showOnHomepage: Boolean,
  includeInTopMenu: Boolean,
  displayOrder: number,
  searchEngineFriendlyPageName: string,
  subCategories: Icategory[],
  categoryImages: any[]
}
function Navigation() {
  const dispatch = useAppDispatch()
  const { configDetails: configDetailsState, categoriesList, needToShowProgressLoader, isLoggedIn } = useAppSelector((state) => state.homePage)
  const { cartItems } = useAppSelector((state) => state.shoppingCart)
  const [currententlySelected, setCurrententlySelected] = useState('')
  useEffect(() => {
    setCurrententlySelected(window?.location?.pathname?.toLocaleLowerCase()?.replace(/[\s/]/g, ''))
  }, [window?.location?.pathname])
  useEffect(() => {
    dispatch(getShoppingCartData({ url: ENDPOINTS.getShoppingCartData, body: bodyForGetShoppingCartData }))
  }, [isLoggedIn])
  useEffect(() => {
    dispatch(getLiveDashboardChartData({ url: ENDPOINTS.getLiveDashboardChartData }))
  }, [])
  return (
    <Box className="NavigationHeader">
      <Container>
        <Stack className="NavigationHeader__Wrapper">
          <Stack
            className="LeftPart"
            divider={<Divider orientation="vertical" flexItem />}
          >
            {
              categoriesList?.items?.length > 0 ?
                categoriesList?.items?.map((category: Icategory) => {
                  return (
                    category?.subCategories?.length > 0 ?
                      <Fragment key={category.name}><HoverTooltip
                        className="PopoverMegaMenu"
                        placement="bottom-start"
                        renderComponent={
                          <Button
                            aria-label={category?.searchEngineFriendlyPageName ?? category.name}
                            color="secondary"
                            onClick={() => navigate(`/${category.searchEngineFriendlyPageName}`)}
                            className={classNames("MenuLink", { "Active": category?.name?.toLocaleLowerCase()?.replace(/[\s/]/g, '') === currententlySelected })}
                            disableRipple
                            name={category?.searchEngineFriendlyPageName ?? category.name}
                          >
                            {category.name}
                          </Button>
                        }
                        disablePortal
                        lightTheme
                      >
                        <MegaMenu subCategorys={category.subCategories} category={category} />
                      </HoverTooltip></Fragment>
                      : <Fragment key={category.name}><Button
                        onClick={() => navigate(`/${category.searchEngineFriendlyPageName}`)}
                        color="secondary"
                        aria-label={category?.searchEngineFriendlyPageName ?? category.name}
                        name={category?.searchEngineFriendlyPageName ?? category.name}
                        className={classNames("MenuLink", { "Active": category?.name?.toLocaleLowerCase()?.replace(/[\s/]/g, '') === currententlySelected })}
                        disableRipple
                      >
                        {category.name}
                      </Button></Fragment>
                  )
                })
                : null
            }
          </Stack>
          <Stack className="RightPart">
            {needToShowProgressLoader && <ProductUpdateCountdown needToShowText={false} />}
            {configDetailsState?.enablechart?.value ? <Suspense fallback={<></>}> <ChartMenu /></Suspense> : null}
            {configDetailsState?.enablecart?.value ? <Suspense fallback={<></>}>
              <Link area-label="shopping-cart-link" to="/shopping-cart">
                <Badge badgeContent={cartItems?.length?.toString()} color="primary">
                  <CartMenu />
                </Badge>
              </Link>
            </Suspense> : null}
            <ActionMenu />
          </Stack>
        </Stack>
      </Container>
      <ConstantApiLoader />
    </Box>
  )
}

export default Navigation