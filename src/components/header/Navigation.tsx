import React, { Fragment, Suspense, lazy, useEffect, useMemo, useState } from "react"
import { Container, Stack, Divider, Button, Box, Typography, IconButton, useMediaQuery, Theme } from "@mui/material"
import classNames from "classnames"
import { STORE_CODE, THEME_TYPE } from "@/axiosfolder";

// Components
import { HoverTooltip } from "../common/CustomTooltip"
import { ConstantApiLoader, PageLoader } from "./Loader"
const ChartMenu = lazy(() => import('./ChartMenu'))
const CartMenu = lazy(() => import('./CartMenu'))
const CartDropdownMenu = lazy(() => import('../common/CartDropdownMenu'))

import ActionMenu from "./ActionMenu"
import MegaMenu from "./MegaMenu"
import { useAppDispatch, useAppSelector } from "@/hooks"
import Badge from '@mui/material/Badge';

// Utils
import { chartMenuData, subMenuItems } from "../../utils/data"
import { Link, navigate } from "gatsby"
import { ProductUpdateCountdown } from "../common/Utils"
import { updateSubTotal } from "@/redux/reducers/shoppingCartReducer"
import { ENDPOINTS } from "@/utils/constants"
import useAPIoneTime from "@/hooks/useAPIoneTime"
import { bodyForGetShoppingCartData, formatCategoryUrl, getLengthOfThePaths, getlastPartOfPath } from "@/utils/common"
import { CategoriesListDetails, getLiveDashboardChartData } from "@/redux/reducers/homepageReducer"
import useApiRequest from "@/hooks/useAPIRequest"
import { CartItem } from "@/types/shoppingCart"
import { CartItemsWithLivePriceDetails } from "../partials/shopping-cart/CartDetails"
import SearchField from "./SearchField";
import { Call } from "@/assets/icons";


export interface Icategory {
  url: string,
  isurl: boolean,
  type: number,
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
function Navigation({ frontPage = false, showNavigation = false }: { frontPage?: boolean, showNavigation?: boolean }) {
  const dispatch = useAppDispatch()
  const { configDetails: configDetailsState, categoriesList, needToShowProgressLoader, isLoggedIn } = useAppSelector((state) => state.homePage)
  const { cartItems } = useAppSelector((state) => state.shoppingCart)
  const [currententlySelected, setCurrententlySelected] = useState('')
  useEffect(() => {
    setCurrententlySelected(getlastPartOfPath(window?.location?.pathname?.toLocaleLowerCase())?.replace(/[\s/]/g, ''))
  }, [window?.location?.pathname])

  const [productIds, setProductIds] = useState({})
  const [cartItemsWithLivePrice, setCartItemsWithLivePrice] = useState<CartItemsWithLivePriceDetails[]>([]);
  const { data: priceData, loading: priceLoading } = useApiRequest(ENDPOINTS.productPrices, 'post', productIds, 60);
  useEffect(() => {
    if (priceData?.data?.length > 0) {
      const idwithpriceObj: any = {}
      priceData?.data?.forEach((product: any) => idwithpriceObj[product?.productId] = product)

      let subTotal = 0;
      const cartItemsWithLivePrice = cartItems?.map((item: CartItem) => {
        subTotal += (idwithpriceObj?.[item.productId]?.price * item.quantity)
        return {
          ...item,
          LivePriceDetails: idwithpriceObj[item.productId]
        }
      })

      dispatch(updateSubTotal(subTotal))

      if (cartItemsWithLivePrice) {
        setCartItemsWithLivePrice(cartItemsWithLivePrice)
      }
    }
  }, [priceData])

  useEffect(() => {
    const productIds = cartItems?.length !== undefined ? cartItems?.map((item: CartItem) => item.productId) : [];
    setProductIds({ productIds })
    if (productIds?.length == 0) {
      setCartItemsWithLivePrice([])
    }
  }, [cartItems])
  const isThisInsideCategory = getLengthOfThePaths(window?.location?.pathname?.toLocaleLowerCase()).length == 2
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'))
  return (
    <Box className="NavigationHeader">
      <Container>
        <Stack className="NavigationHeader__Wrapper">
          {THEME_TYPE === "1" && !showNavigation ? (configDetailsState?.Search_MenuIcon_Enable?.value && <SearchField />) : <Stack
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
                          <Link
                            // to={frontPage ? `${formatCategoryUrl(category.searchEngineFriendlyPageName == "shop" ?'/category/shop' :category.searchEngineFriendlyPageName)}` : `/category${formatCategoryUrl(category.searchEngineFriendlyPageName)}`}
                            to={category?.type == 2 ? formatCategoryUrl(category.searchEngineFriendlyPageName) : category?.type == 1 ? '/category' + formatCategoryUrl(category.searchEngineFriendlyPageName) : category?.isurl && category?.url}
                            aria-label={category?.searchEngineFriendlyPageName ?? category.name}
                            className={classNames("MenuLink", { "Active": getlastPartOfPath(category?.searchEngineFriendlyPageName?.toLocaleLowerCase())?.replace(/[\s/]/g, '') === currententlySelected && isThisInsideCategory })}
                          >
                            {category.name}
                          </Link>
                        }
                        disablePortal
                        lightTheme
                      >
                        <MegaMenu subCategorys={category.subCategories} category={category} />
                      </HoverTooltip>
                      </Fragment>
                      : <Fragment key={category.name}><Link
                        // to={frontPage ? `${formatCategoryUrl(category.searchEngineFriendlyPageName == "shop" ?'/category/shop' :category.searchEngineFriendlyPageName)}` : `/category${formatCategoryUrl(category.searchEngineFriendlyPageName)}`}
                        to={category?.type == 2 ? formatCategoryUrl(category.searchEngineFriendlyPageName) : category?.type == 1 ? '/category' + formatCategoryUrl(category.searchEngineFriendlyPageName) : category?.isurl && category?.url}
                        aria-label={category?.searchEngineFriendlyPageName ?? category.name}
                        className={classNames("MenuLink", { "Active": getlastPartOfPath(category?.searchEngineFriendlyPageName?.toLocaleLowerCase())?.replace(/[\s/]/g, '') === currententlySelected && isThisInsideCategory })}
                      >
                        {category.name}
                      </Link></Fragment>
                  )
                })
                : null
            }
          </Stack>
          }

          {!frontPage && !showNavigation && (
            <Stack className="RightPart">
              {needToShowProgressLoader &&
                <ProductUpdateCountdown needToShowText={false} />
              }
              {(THEME_TYPE === "1" && !isMobile) && (<IconButton color="secondary" title='Call us' className={classNames("MenuButton", { "Active": false })} href={"tel:" + configDetailsState?.["StorePhoneNumber_AU"]?.value}><Call /></IconButton>)}
              {configDetailsState?.Chart_MenuIcon_Enable?.value && (configDetailsState.Chart_MenuIcon_Enable_Guests.value || isLoggedIn) ?
                <Suspense fallback={<></>}> <ChartMenu /></Suspense>
                : null}
              {configDetailsState?.Cart_MenuIcon_Enable?.value ?
                <Suspense fallback={<></>}>
                  <HoverTooltip
                    className="CartHoverList"
                    placement="bottom-start"
                    renderComponent={
                      <Link area-label="shopping-cart-link" to="/shopping-cart">
                        <Badge badgeContent={cartItems?.length?.toString()} color="primary" max={99}>
                          <CartMenu />
                        </Badge>
                      </Link>
                    }
                    disablePortal
                    lightTheme
                  >
                    {configDetailsState?.Cart_Popup_Enable?.value !== false && <CartDropdownMenu cartItemsWithLivePrice={cartItemsWithLivePrice} howManyProductToShow={configDetailsState?.Cart_Popup_MaxProducts?.value ?? 3} />}
                  </HoverTooltip>
                </Suspense>
                : null}
              <ActionMenu />
            </Stack>
          )}
        </Stack>
      </Container>
      {THEME_TYPE !== "1" && (<ConstantApiLoader />)}
    </Box>
  )
}

export default Navigation