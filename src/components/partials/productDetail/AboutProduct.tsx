import React, { useEffect, useMemo, useState } from "react"
import { Box, Stack, Tabs, Tab, Typography, Slider, Select, MenuItem, Divider, Button, IconButton, TextField, Icon, Accordion, AccordionDetails, AccordionSummary, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, createStyles } from "@mui/material"
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

// Type
import type { SyntheticEvent } from "react"
import type { SelectChangeEvent } from "@mui/material"

// Componenets
import TabPanel from "@/components/common/TabPanel"
import RenderFields from "@/components/common/RenderFields"
import { PriceChangeReturn, ProductStockStatus, ProductUpdateCountdown, TextFlipAnimation } from "@/components/common/Utils"
import ProductImages from "./ProductImages"

// Assets
import { AddToCartIcon, AlarmIcon, CameraIcon, CartIcon, CompareIcon, DeleteIcon, FacebookIcon, HeartIcon, InstagramIcon1, MinusIcon, PlusIcon, TwitterIcon, WishlistIcon, YoutubeIcon } from "@/assets/icons"
import WhatsappIcon from "@/assets/icons/WhatsappIcon";
import { FacebookShareButton, TwitterShareButton, WhatsappShareButton } from "react-share";

// Data
import { qmintRating } from "@/utils/data"
import { useAppDispatch, useAppSelector } from "@/hooks"
import useApiRequest from "@/hooks/useAPIRequest"
import { ENDPOINTS } from "@/utils/constants"
import { bodyForGetShoppingCartData, calculationOfThePremiumAndDiscount, getDefaultOption, hasFulfilled, roundOfThePrice, valueChangeForPrice } from "@/utils/common"
import useCallAPI from "@/hooks/useCallAPI"
import { navigate } from "gatsby"
import { addProductToCompare } from "@/redux/reducers/compareProductsReducer"
import { addToWishList, getWishListData } from "@/redux/reducers/wishListReducer"
import Toaster from "@/components/common/Toaster"
import { setToasterState } from "@/redux/reducers/homepageReducer"
import { resetProductDetails } from "@/redux/reducers/categoryReducer"

import noImage from '../../../assets/images/noImage.png'
import useShowToaster from "@/hooks/useShowToaster"
import { getShoppingCartData } from "@/redux/reducers/shoppingCartReducer"
import { THEME_TYPE } from "@/axiosfolder"

function createData(
  quantity: string,
  price: string,
) {
  return { quantity, price };
}
const rows = [
  createData('1 - 24', "$3084.15"),
  createData('24 - 49', "$3082.15"),
  createData('50 - 99', "$3079.15"),
  createData('100+', "$3076.15"),
];
enum timeRangeEnum {
  hour = 1,
  week = 2,
  month = 3,
  year = 4
}
interface ProductInputs {
  Quantity: string
}

const schema = yup.object().shape({
  Quantity: yup.string(),
})


function AboutProduct({ productId }: any) {
  const dispatch = useAppDispatch();
  const styles: any = createStyles({
    tableBody: {
      // border: '1px solid #ddd', // border around the table body
    },
    tableRow: {
      '&:nth-of-type(odd)': {
        backgroundColor: '#f2f2f2', // alternate row background color
      },
    },
    tableCell: {
      padding: '8px', // cell padding
      borderBottom: '1px solid #ddd', // bottom border for each cell
      wordWrap: 'break-word',
    },
  });
  const { cartItems } = useAppSelector((state) => state.shoppingCart)
  const { productDetailsData } = useAppSelector((state) => state.category)
  const { configDetails: configDetailsState, isLoggedIn, openToaster } = useAppSelector((state) => state.homePage)
  const { productIds: compareProducts } = useAppSelector((state) => state.compareProducts)
  const [quantityCount, setQuantityCount] = useState<number>(productDetailsData?.minimumCartQty ?? 1)
  const [productIds, setProductIds] = useState({ productIds: [Number(productId)] })
  const [urlForThePriceRange, setUrlForThePriceRange] = useState(ENDPOINTS.priceForprogressbar.replace('{{product-id}}', productId).replace('{{timeinterval}}', '1'))
  const defaultTabValue = useMemo(() => {
    const defaultTabValue = getDefaultOption([
      { enabled: productDetailsData?.isProductDescriptionShow, value: 0 },
      { enabled: productDetailsData?.isAdditionalInformationShow, value: 1 },
      { enabled: productDetailsData?.isRatingReviewShow, value: 2 },
    ], 0);
    return defaultTabValue
  }, [productDetailsData]);
  const [tabValue, setTabValue] = useState<number>(defaultTabValue)
  const [priceHistoryDuration, setPriceHistoryDuration] = useState<string>('hour')
  const { showToaster } = useShowToaster();

  const { data: priceData, loading: priceLoading } = useApiRequest(ENDPOINTS.productPrices, 'post', productIds, 60);
  const { data: progressData } = useApiRequest(urlForThePriceRange, 'get');
  const { loading: loadingForAddToCart, error: errorForAddToCart, apiCallFunction } = useCallAPI()
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<ProductInputs>({
    resolver: yupResolver(schema),
    defaultValues: {},
  })

  const handleTabChange = (event: SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }

  useEffect(() => {
    setProductIds({ productIds: [Number(productId)] })
    setUrlForThePriceRange(ENDPOINTS.priceForprogressbar.replace('{{product-id}}', productId).replace('{{timeinterval}}', '1'))
  }, [productId])

  const handlePriceHistoryDuration = (event: SelectChangeEvent) => {
    setPriceHistoryDuration(event.target.value as string);
    setUrlForThePriceRange(ENDPOINTS.priceForprogressbar.replace('{{product-id}}', productId).replace('{{timeinterval}}', timeRangeEnum[event?.target?.value as any]))
  }

  const renderRatingSlider = (name: string, percentage: number) => {
    return (
      <Stack className="RatingSliderWrapper" key={name}>
        <Stack className="LabelWrapper">
          <Typography>{name}</Typography>
          <Typography variant="titleLarge">{percentage}%</Typography>
        </Stack>
        <Slider
          value={percentage}
        />
      </Stack>
    )
  }

  const handleQuentityUpdate = (type: 'plus' | 'minus') => {
    switch (type) {
      case "minus":
        if (productDetailsData?.minimumCartQty !== quantityCount) {
          setQuantityCount((prev) => prev - 1 < 1 ? 1 : prev - 1)
        }
        break;

      case "plus":
        if (productDetailsData?.maximumCartQty !== quantityCount) {
          setQuantityCount((prev) => prev + 1)
        }
        break;
      default:
        break;
    }
  }
  const addIntoComapreProduct = (id: any) => {
    if (!compareProducts.includes(productId) && compareProducts.length < 5) {
      dispatch(addProductToCompare(id))
      showToaster({
        message: 'The Product has been added to the',
        buttonText: 'compare product list',
        redirectButtonUrl: 'compare-products',
        severity: 'success'
      })
    } else {
      let message = '';
      if (compareProducts.includes(productId)) {
        message = 'The product is already in the';
        showToaster({
          message: message,
          buttonText: 'compare product list',
          redirectButtonUrl: 'compare-products',
          severity: 'info'
        });
      } else {
        message = 'You can compare up to 5 products at a time. Remove some products to add new ones in';
        showToaster({
          message: message,
          buttonText: 'compare product list',
          redirectButtonUrl: 'compare-products',
          severity: 'error'
        });

      }

    }

  }
  const addToWatchList = async (id: any) => {
    const responseOFCurrentCount: any = await dispatch(getWishListData({
      body: {
        "search": "",
        "pageNo": 0,
        "pageSize": -1,
        "sortBy": "",
        "sortOrder": "", "filters": {}
      }, url: ENDPOINTS.getWishListData
    }))
    if (responseOFCurrentCount?.payload?.data?.data?.items?.length >= configDetailsState?.Watchlist_MaxItems?.value) {
      showToaster({
        message: `Can not add more than ${configDetailsState?.Shoppingcart_MaxItems?.value} items to Watchlist.`,
        severity: 'error'
      })
      return
    }
    const response = await dispatch(addToWishList({
      url: ENDPOINTS.addToWishList,
      body: {
        productId: productId,
        quantity: quantityCount
      }
    }) as any)
    // console.log("response", response);

    if (hasFulfilled(response?.type)) {
      showToaster({
        message: response?.payload?.data?.message,
        buttonText: 'watchlist',
        redirectButtonUrl: 'watchlist',
        severity: 'success'
      })
    }
    else {
      showToaster({
        message: "Error occurred while adding to the watchlist",
        severity: "error"
      })
    }
  }
  useEffect(() => {
    return () => {
      dispatch(resetProductDetails())
    }
  }, [])
  const addToCartFunction = async (isInstantBuy: any) => {
    if (quantityCount === 0) {
      showToaster({
        message: 'Quantity can not be zero',
        severity: 'error'
      })
    }
    if (cartItems?.length && (cartItems?.length >= configDetailsState?.Shoppingcart_MaxItems?.value)) {
      showToaster({
        message: `Can not add more than ${configDetailsState?.Shoppingcart_MaxItems?.value} items to cart.`,
        severity: 'error'
      })
      return
    }
    const response = await apiCallFunction(ENDPOINTS.addToCartProduct, 'POST', {
      "productId": productId,
      "quantity": quantityCount,
      "IsInstantBuy": isInstantBuy
    } as any)

    if (response?.code === 200 && !isInstantBuy) {
      dispatch(getShoppingCartData({ url: ENDPOINTS.getShoppingCartData, body: bodyForGetShoppingCartData }))
      // const responseMessage = response
      if (response.data === true) {
        showToaster({
          message: response?.message,
          buttonText: 'cart',
          redirectButtonUrl: 'shopping-cart',
          severity: 'success'
        })
      } else {
        showToaster({
          message: response.message,
          severity: 'warning'
        })
      }
    }
  }
  const handleBuyNow = async () => {
    if (!isLoggedIn) {
      navigate('/login')
      return
    }
    if (quantityCount === 0) {
      showToaster({
        message: "Quantity can not be zero",
        severity: "error"
      })
      return;
    }

    const response = await apiCallFunction(ENDPOINTS.addToCartProduct, 'POST', {
      "productId": productId,
      "quantity": quantityCount,
      "IsInstantBuy": true
    } as any)

    if (response.code === 200) {
      if (response.data === true) {
        navigate('/checkout/?isInstantBuy=true')
      } else {
        showToaster({
          message: response.message,
          severity: 'warning'
        })
      }
    }
    else {
      showToaster({
        message: "Error occurred while buy now",
        severity: 'error'
      })
    }
  }
  const renderProductSpecification = (property: string, value: string) => {
    return (
      <Stack className="ProductSpecification">
        <Typography>{property}</Typography>
        <Typography className="Value">{value}</Typography>
      </Stack>
    )
  }
  return (
    <Box className="AboutProduct">
      {openToaster && <Toaster />}
      <Stack className="AboutWrapper">
        <ProductImages
          productImages={productDetailsData?.imageUrls?.length > 0 ? productDetailsData?.imageUrls : [noImage]}
          offerBadge={
            <Typography
              variant="titleLarge"
              className="OfferBadge"
              sx={{ backgroundColor: productDetailsData?.tagColor }}
            >
              {productDetailsData?.tagName}
            </Typography>
          }
        />
        <Box className="ProductAbout">
          <form>
            <Box className="Heading">
              <Typography className="ProductName" variant="h4">{productDetailsData?.name}</Typography>
              <Stack className="Wrapper">
                <Typography>{productDetailsData?.shortDescription}</Typography>
              </Stack>
            </Box>
            <Divider />
            <Box className="PricingDetails">
              {(isLoggedIn || configDetailsState?.ProductPricing_Guests_Enable?.value) ? <>
                <Stack className="Top">
                  <Stack className="Left">
                    <Box className="PriceWrapper">
                      {priceData?.data?.[0]?.discount > 0 && <Typography className="ProductOriginalValue" variant="titleLarge">${roundOfThePrice(
                        priceData?.data?.[0]?.price +
                        priceData?.data?.[0]?.discount
                      )}</Typography>}
                      <Typography className="ProductValue" variant="subtitle2">${roundOfThePrice(priceData?.data?.[0]?.price)}</Typography>
                    </Box>
                    {priceData?.data?.[0]?.discount !== 0 && calculationOfThePremiumAndDiscount(productDetailsData?.productPremium, productDetailsData?.premiumDiscount) ?
                      <Stack className="DiscountWrapper">
                        <Typography className="SaveMessage">SAVE</Typography>
                        <TextFlipAnimation
                          frontValue={calculationOfThePremiumAndDiscount(productDetailsData?.productPremium, productDetailsData?.premiumDiscount)!}
                          backValue={'$' + roundOfThePrice(productDetailsData?.premiumDiscount) + ' Off'}
                        /></Stack>
                      : null}
                    {/* valueChangeForPrice({ currentprice: priceData?.data?.[0]?.price, min:progressData?.data?.minPrice, max:progressData?.data?.maxPrice}) */}
                  </Stack>
                  <Stack className="Right">
                    <ProductUpdateCountdown />
                  </Stack>
                </Stack>
                <Stack className="Bottom">
                  <Stack className="SliderWrapper">
                    <Stack className="PriceMinMax">
                      <Typography>Low: <Typography variant="titleLarge">${roundOfThePrice(progressData?.data?.minPrice)}</Typography></Typography>
                      <Typography>High: <Typography variant="titleLarge">${roundOfThePrice(progressData?.data?.maxPrice)}</Typography></Typography>
                    </Stack>
                    <Slider
                      className="Slider"
                      value={Number(priceData?.data?.[0]?.price)}
                      min={Number(progressData?.data?.minPrice)}
                      max={Number(progressData?.data?.maxPrice)}
                      disabled
                    />
                  </Stack>
                  <PriceChangeReturn percentage={valueChangeForPrice({ currentprice: priceData?.data?.[0]?.price, yesterdayprice: progressData?.data?.yesterdayPrice })} />
                  <Select
                    color="secondary"
                    className="PriceHistorySelect"
                    value={priceHistoryDuration}
                    onChange={handlePriceHistoryDuration}
                  >
                    <MenuItem value="hour">24H</MenuItem>
                    <MenuItem value="week">1W</MenuItem>
                    <MenuItem value="month">1M</MenuItem>
                    <MenuItem value="year">1Y</MenuItem>
                  </Select>
                </Stack></> : <Button size="large" variant="outlined" onClick={() => {
                  navigate('/login')
                }}>Activate Live Price</Button>}
            </Box>
            <Box className="FixWrapper">
              <Box className="PricingDetails">
                {(isLoggedIn || configDetailsState?.ProductPricing_Guests_Enable?.value) ? <>
                  <Stack className="Top">
                    <Stack className="Left">
                      <Stack className="PriceWrapper">
                        <Typography className="ProductValue" variant="subtitle2">${roundOfThePrice(priceData?.data?.[0]?.price)}</Typography>
                        {priceData?.data?.[0]?.discount > 0 && <Typography className="ProductOriginalValue" variant="titleLarge">${roundOfThePrice(
                          priceData?.data?.[0]?.price +
                          priceData?.data?.[0]?.discount
                        )}
                        </Typography>}
                      </Stack>
                      {priceData?.data?.[0]?.discount !== 0 && calculationOfThePremiumAndDiscount(productDetailsData?.productPremium, productDetailsData?.premiumDiscount) ?
                        <Stack className="DiscountWrapper">
                          <Typography className="SaveMessage">SAVE</Typography>
                          <TextFlipAnimation
                            frontValue={calculationOfThePremiumAndDiscount(productDetailsData?.productPremium, productDetailsData?.premiumDiscount)!}
                            backValue={'$' + roundOfThePrice(productDetailsData?.premiumDiscount) + ' Off'}
                          /></Stack>
                        : null}
                      {/* <PriceChangeReturn percentage={valueChangeForPrice({ currentprice: priceData?.data?.[0]?.price, yesterdayprice: progressData?.data?.yesterdayPrice })} /> */}
                      {/* valueChangeForPrice({ currentprice: priceData?.data?.[0]?.price, min:progressData?.data?.minPrice, max:progressData?.data?.maxPrice}) */}
                    </Stack>
                    <Stack className="Right">
                      <ProductUpdateCountdown />
                    </Stack>
                  </Stack>
                  <Stack className="Bottom">
                    <Stack className="SliderWrapper">
                      <Stack className="PriceMinMax">
                        <Typography>Low: <Typography variant="titleLarge">${roundOfThePrice(progressData?.data?.minPrice)}</Typography></Typography>
                        <Typography>High: <Typography variant="titleLarge">${roundOfThePrice(progressData?.data?.maxPrice)}</Typography></Typography>
                      </Stack>
                      <Slider
                        className="Slider"
                        value={Number(priceData?.data?.[0]?.price)}
                        min={Number(progressData?.data?.minPrice)}
                        max={Number(progressData?.data?.maxPrice)}
                        disabled
                      />
                    </Stack>
                    <Select
                      color="secondary"
                      className="PriceHistorySelect"
                      value={priceHistoryDuration}
                      onChange={handlePriceHistoryDuration}
                    >
                      <MenuItem value="hour">24H</MenuItem>
                      <MenuItem value="week">1W</MenuItem>
                      <MenuItem value="month">1M</MenuItem>
                      <MenuItem value="year">1Y</MenuItem>
                    </Select>
                  </Stack></> : <Button size="large" variant="outlined" onClick={() => {
                    navigate('/login')
                  }}>Activate Live Price</Button>}
              </Box>
              <Divider />
              <Box className="Mobileflex">
                <Stack className="OrderDetails">
                  {isLoggedIn || configDetailsState?.AvailabilityForGuests_Enable?.value ?
                    <><ProductStockStatus availability={productDetailsData?.availability} colorClass={productDetailsData?.colorClass} iconClass={productDetailsData?.iconClass} />
                      {productDetailsData?.condition && <Typography className="ProductMessage">{productDetailsData?.condition}</Typography>}
                      <Typography className="ShipmentDetail">{productDetailsData?.description}</Typography></>
                    :
                    <Typography className="ProductMessage">{configDetailsState?.ProductDetails_Text_Guests?.value}</Typography>
                  }
                </Stack>
                {productDetailsData?.availability !== "Sold Out" &&
                  <>
                    <Divider />
                    <Stack className="OrderActions">
                      {(isLoggedIn || configDetailsState?.BuyButtonsForGuests_Enable?.value) ? (!productDetailsData?.disableBuyButton && <><Stack className="QuantityWrapper">
                        <IconButton id='minus' className="Minus" onClick={(e) => {
                          e.stopPropagation()
                          handleQuentityUpdate('minus')
                        }}><MinusIcon /></IconButton>
                        <Box className="InputRow">
                          <TextField type="number" value={quantityCount} onChange={(event) => {
                            setQuantityCount(Number(event?.target?.value))
                          }} name="Quantity" />
                        </Box>
                        {/* <RenderFields
                          color="primary"
                          register={register}
                          error={errors.Quantity}
                          control={control}
                          name="Quantity"
                          type="number"
                          onChange={(event) => {
                            setQuantityCount(Number(event.target.value));
                          }}
                          margin='none'
                          fullWidth={false}
                          value={quantityCount as any}
                        /> */}
                        <IconButton id='plus' className="Plus" onClick={(e) => {
                          e.stopPropagation()
                          handleQuentityUpdate('plus')
                        }}><PlusIcon /></IconButton>
                      </Stack>
                        <Button color={THEME_TYPE === '1' ? 'primary' : 'success'} variant="contained" endIcon={<AddToCartIcon />} onClick={async () => {
                          await addToCartFunction(false)
                          // navigate('/shopping-cart')
                        }} disabled={loadingForAddToCart}>Add to cart</Button>
                        <Button variant="outlined" onClick={() => {
                          handleBuyNow()
                        }}>Buy now</Button>
                      </>)
                        :
                        <Button color="success" variant="contained" onClick={() => {
                          navigate('/login')
                        }}>Register to Buy</Button>}
                    </Stack>
                  </>}
              </Box>
              <Divider />
            </Box>
            <Stack className="SocialConnects">
              <Button color="secondary" className="IconWithText" onClick={async () => {
                addToWatchList(productId)
              }} >
                <Box className="IconWrapper Watchlist"><WishlistIcon /></Box>
                <Typography>Watchlist</Typography>
              </Button>
              <Button color="secondary" className="IconWithText" onClick={() => { addIntoComapreProduct(productId) }}>
                <Box className="IconWrapper"><CompareIcon /></Box>
                <Typography>Compare</Typography>
              </Button>
              {/* <Button color="secondary" className="IconWithText">
                <Box className="IconWrapper"><AlarmIcon /></Box>
                <Typography>Price Alert</Typography>
              </Button> */}

              <FacebookShareButton url={window.location.href} hashtag="qmint" title="Qmint Product Detail">
                <IconButton className="IconWrapper" aria-label="Facebook Icon" >
                  <FacebookIcon />
                </IconButton>
              </FacebookShareButton>
              <TwitterShareButton url={window.location.href} title="Qmint Product Detail" hashtags={["qmint", "productDetail"]}>
                <IconButton className="IconWrapper" aria-label="Twitter Icon">
                  <TwitterIcon />
                </IconButton>
              </TwitterShareButton>
              <WhatsappShareButton url={window.location.href} title="Qmint Product Detail">
                <IconButton className="IconWrapper" aria-label="Whatsapp Icon">
                  <WhatsappIcon />
                </IconButton>
              </WhatsappShareButton>

              {/* <IconButton href={configDetailsState?.SocialLinks_Youtube?.value ?? window?.location?.href} target="_blank" className="IconWrapper"><YoutubeIcon /></IconButton>
              <IconButton href={configDetailsState?.SocialLinks_Facebook?.value ?? window?.location?.href} target="_blank" className="IconWrapper"><FacebookIcon /></IconButton>
              <IconButton href={configDetailsState?.SocialLinks_Twitter?.value ?? window?.location?.href} target="_blank" className="IconWrapper"><TwitterIcon /></IconButton> */}
            </Stack>
            <Divider />
            {(priceData?.data?.[0]?.tierPriceList?.length > 0 || productDetailsData?.isGradingShow) ? <Stack className="AdditionalDetails">
              {priceData?.data?.[0]?.tierPriceList?.length > 0 ? <><Accordion defaultExpanded>
                <AccordionSummary>
                  <Typography variant="titleLarge">Discounts Available</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <TableContainer className="GreyTable">
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell><Typography variant="titleLarge">Quantity</Typography></TableCell>
                          <TableCell><Typography variant="titleLarge">Price</Typography></TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {priceData?.data?.[0]?.tierPriceList.map((priceData: {
                          discount: number,
                          fromQty: number,
                          price: number,
                          taxPrice: number,
                          toQty: number,
                        }, index: any) => (
                          <TableRow key={`pricedata-${index}`} >
                            <TableCell>
                              <Stack className="Content">
                                <Typography>{priceData?.fromQty + '-' + priceData?.toQty}</Typography>
                              </Stack>
                              <Divider />
                            </TableCell>
                            <TableCell>
                              <Stack className="Content">
                                <Typography>{priceData?.price}</Typography>
                              </Stack>
                              <Divider />
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </AccordionDetails>
              </Accordion></> : null}
              {productDetailsData?.isGradingShow ? <><Accordion defaultExpanded>
                <AccordionSummary>
                  <Typography variant="titleLarge">QMINT Rating</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Stack className="RatingsList">
                    {productDetailsData?.parentProductGradings?.map((grading: any) => (
                      renderRatingSlider(grading.gradeType, grading.productGradingPercentage)
                    ))}
                  </Stack>
                </AccordionDetails>
              </Accordion> <Divider /></> : null}
            </Stack> : null}
            {productDetailsData?.bulkProduct?.length > 0 ? <>
              <Box className="PromotionalDetails">
                <Accordion defaultExpanded>
                  <AccordionSummary>
                    <Typography variant="titleLarge">Promo Pack Content</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <TableContainer className="GreyTable">
                      <Table size="small">
                        <TableHead>
                          <TableRow>
                            <TableCell><Typography variant="titleLarge">Product Name</Typography></TableCell>
                            <TableCell><Typography variant="titleLarge">Quantity</Typography></TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {productDetailsData?.bulkProduct.map((bulkProduct: { quantity: number, productName: any }) => (
                            <TableRow key={bulkProduct.quantity} >
                              <TableCell>
                                <Stack className="Content">
                                  <Typography>{bulkProduct.productName}</Typography>
                                </Stack>
                                <Divider />
                              </TableCell>
                              <TableCell>
                                <Stack className="Content">
                                  <Typography>{bulkProduct.quantity}</Typography>
                                </Stack>
                                <Divider />
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </AccordionDetails>
                </Accordion>
              </Box>
              <Divider /></> : null}
            {!!productDetailsData?.imageConditionEnable && <Stack className="InfoMessage">
              <CameraIcon />
              <Typography variant="body2">{configDetailsState?.ProductDetails_ConditionText?.value}</Typography>
            </Stack>}
          </form>
        </Box>
      </Stack>
      <Stack className="TabsWrapper">
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          className="ProductDescriptionTabs"
          aria-label="Product description tabs"
        // variant="scrollable"
        // allowScrollButtonsMobile
        >
          {productDetailsData?.isProductDescriptionShow ? <Tab label="Product Description" value={0} /> : null}
          {productDetailsData?.isAdditionalInformationShow ? <Tab label="Specifications" value={1} /> : null}
          {productDetailsData?.isRatingReviewShow ? <Tab label="Rating & Reviews" value={2} /> : null}
        </Tabs>
        {productDetailsData?.isProductDescriptionShow ? <TabPanel value={tabValue} index={0}>
          <Typography variant="h4" className="TabTitle">Product Description</Typography>
          <Box className="ScrollbarWrapper">
            <Box className="Content ScrollbarBlue" dangerouslySetInnerHTML={{
              __html: productDetailsData?.fullDescription
            }}>
            </Box>
          </Box>
        </TabPanel> : null}
        {productDetailsData?.isAdditionalInformationShow ? <TabPanel className="AdditionalInformation" value={tabValue} index={1}>
          <Typography variant="h4" className="TabTitle">Specifications</Typography>
          <Box className="ScrollbarWrapper">
            <Box className="Content ScrollbarBlue">
              <Box className="Wrapper">
                {Object.entries(productDetailsData?.specifications)?.map((bulkProduct: any, index) => (
                  renderProductSpecification(bulkProduct[0], bulkProduct[1])
                ))}
              </Box>
            </Box>
          </Box>
        </TabPanel> : null}
        {productDetailsData?.isRatingReviewShow ? <TabPanel value={tabValue} index={2}>
          <Typography variant="h4" className="TabTitle">Rating & Reviews</Typography>
          <Box className="ScrollbarWrapper">
            <Box className="Content ScrollbarBlue">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod itaque atque dolorum culpa. Doloribus labore, nulla iste distinctio provident, quasi impedit consequatur aperiam sapiente repudiandae eum doloremque explicabo. In, atque!Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod itaque atque dolorum culpa. Doloribus labore, nulla iste distinctio provident, quasi impedit consequatur aperiam sapiente repudiandae eum doloremque explicabo. In, atque!Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod itaque atque dolorum culpa. Doloribus labore, nulla iste distinctio provident, quasi impedit consequatur aperiam sapiente repudiandae eum doloremque explicabo. In, atque!Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod itaque atque dolorum culpa. Doloribus labore, nulla iste distinctio provident, quasi impedit consequatur aperiam sapiente repudiandae eum doloremque explicabo. In, atque!Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod itaque atque dolorum culpa. Doloribus labore, nulla iste distinctio provident, quasi impedit consequatur aperiam sapiente repudiandae eum doloremque explicabo. In, atque!Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod itaque atque dolorum culpa. Doloribus labore, nulla iste distinctio provident, quasi impedit consequatur aperiam sapiente repudiandae eum doloremque explicabo. In, atque!Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod itaque atque dolorum culpa. Doloribus labore, nulla iste distinctio provident, quasi impedit consequatur aperiam sapiente repudiandae eum doloremque explicabo. In, atque!Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod itaque atque dolorum culpa. Doloribus labore, nulla iste distinctio provident, quasi impedit consequatur aperiam sapiente repudiandae eum doloremque explicabo. In, atque!Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod itaque atque dolorum culpa. Doloribus labore, nulla iste distinctio provident, quasi impedit consequatur aperiam sapiente repudiandae eum doloremque explicabo. In, atque!Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod itaque atque dolorum culpa. Doloribus labore, nulla iste distinctio provident, quasi impedit consequatur aperiam sapiente repudiandae eum doloremque explicabo. In, atque!Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod itaque atque dolorum culpa. Doloribus labore, nulla iste distinctio provident, quasi impedit consequatur aperiam sapiente repudiandae eum doloremque explicabo. In, atque!Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod itaque atque dolorum culpa. Doloribus labore, nulla iste distinctio provident, quasi impedit consequatur aperiam sapiente repudiandae eum doloremque explicabo. In, atque!Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod itaque atque dolorum culpa. Doloribus labore, nulla iste distinctio provident, quasi impedit consequatur aperiam sapiente repudiandae eum doloremque explicabo. In, atque!Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod itaque atque dolorum culpa. Doloribus labore, nulla iste distinctio provident, quasi impedit consequatur aperiam sapiente repudiandae eum doloremque explicabo. In, atque!Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod itaque atque dolorum culpa. Doloribus labore, nulla iste distinctio provident, quasi impedit consequatur aperiam sapiente repudiandae eum doloremque explicabo. In, atque!Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod itaque atque dolorum culpa. Doloribus labore, nulla iste distinctio provident, quasi impedit consequatur aperiam sapiente repudiandae eum doloremque explicabo. In, atque!Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod itaque atque dolorum culpa. Doloribus labore, nulla iste distinctio provident, quasi impedit consequatur aperiam sapiente repudiandae eum doloremque explicabo. In, atque!Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod itaque atque dolorum culpa. Doloribus labore, nulla iste distinctio provident, quasi impedit consequatur aperiam sapiente repudiandae eum doloremque explicabo. In, atque!
            </Box>
          </Box>
        </TabPanel> : null}
      </Stack>
    </Box>
  )
}

export default React.memo(AboutProduct)