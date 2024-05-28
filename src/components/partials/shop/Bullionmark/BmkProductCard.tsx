import {
    Link,
    Card,
    CardContent,
    CardActions, Stack,
    Typography,
    Button,
    IconButton,
    Box
} from '@mui/material'
import React, { useState } from 'react'
import { Link as ProducLink, navigate } from "gatsby"
import { BmkProductStockStatus } from '@/components/common/Utils'
import classNames from 'classnames'
import { AddToCartIcon } from '@/assets/icons'


function BmkProductCard() {
    const [isTopPick, setIsTopPick] = useState<boolean>(true)
    const [isOnSale, setIsOnSale] = useState<boolean>(false)
    const [isOnlyLeft, setIsOnlyLeft] = useState<boolean>(false)

    return (
        <Card className="BmkCommonProductCard">
            <Stack className="ImageWrapper">
                <ProducLink className="ImageLink" to="#">
                    <img src="https://qmintstoremedia.blob.core.windows.net/pictures/products/QMint-5oz-gold-Bar-min_120320242303333.png?sv=2018-03-28&sr=b&sig=AlHzQSegsAxWTVmKQuiGS9Yqgn5RkRSzEqNDHsHOtic%3D&st=2024-03-11T13%3A47%3A33Z&se=3024-03-12T13%3A47%3A33Z&sp=r&c=638458480533468802" alt="Product image" loading="lazy" />
                </ProducLink>
            </Stack>
            <CardContent>
                <BmkProductStockStatus availability={'instock'} />
                <Link className="ProductName">
                    <Typography component="h3">American & Australian Coin Clearance Pack (Scratch & Dent)</Typography>
                </Link>
                <Stack className="PriceContentWrapper">
                    <Box className="Top">
                        <Typography variant="overline" className="PriceMessage">As low As</Typography>
                    </Box>
                    <Stack className="Bottom">
                        <Typography variant="subtitle1" className="DiscountedPrice">$3,160.00</Typography>
                        <Typography variant="overline" className="ActualPrice">$6,757.70</Typography>
                    </Stack>
                </Stack>
                <Typography
                    className={classNames("OfferBadge", { "Blue": isTopPick }, { "Purple": isOnSale }, { "Red": isOnlyLeft })}
                >
                    Top pick
                </Typography>
            </CardContent>
            <CardActions>
                {/* {product?.priceWithDetails?.tierPriceList &&
                    product?.priceWithDetails?.tierPriceList?.length > 0 ? (
                    <ClickTooltip
                        open={open}
                        className="TooltipOfferTag"
                        placement="top-start"
                        onClose={handleTooltipClose}
                        onClickAway={handleClickAway}
                        renderComponent={
                            <Button
                                ref={tooltipRef}
                                className="OfferTag"
                                variant="outlined"
                                endIcon={open ? <ChevronUp /> : <ChevronDown />}
                                onClick={handleTooltipOpen}
                                aria-label='OfferTag'
                            >
                                <OfferTagIcon />
                            </Button>
                        }
                        lightTheme
                        disablePortal={true}
                        arrow
                    >
                        <Box className="Offers">
                            {product?.priceWithDetails?.tierPriceList?.map((price) => {
                                return (
                                    <Fragment
                                        key={`${price.fromQty} - ${price.toQty} ${price.price}`}
                                    >
                                        <Typography className="Item">
                                            {price.fromQty} - {price.toQty} Items
                                        </Typography>
                                        <Typography className="ItemPrice">
                                            ${price.price}
                                        </Typography>
                                    </Fragment>
                                );
                            })}
                        </Box>
                    </ClickTooltip>
                ) : null} */}
                <Button name='learnMore' aria-label='Learn More' variant="outlined" className="PrimaryAction" fullWidth>Learn More</Button>
                {/* {product.isBundle &&
                    <ClickTooltip
                        open={open}
                        className="TooltipStack"
                        placement="bottom-start"
                        onClose={handleTooltipClose}
                        onClickAway={handleClickAway}
                        renderComponent={
                            <IconButton
                                ref={tooltipRef}
                                aria-label='StackIcon'
                                className="Outlined Stack"
                                onClick={handleTooltipOpen}
                                title="Promo content"
                            >
                                <StackIcon />
                            </IconButton>
                        }
                        lightTheme
                        disablePortal={true}
                        arrow
                    >
                        <Stack className="Content">
                            {product?.bulkProduct?.map((product: any) => {
                                return (
                                    <Typography>
                                        <Typography variant="inherit" component="span">{product?.quantity} </Typography>
                                        x {product?.productName}
                                    </Typography>
                                )
                            })}
                        </Stack>
                    </ClickTooltip>
                } */}
                <IconButton title="Add to cart" aria-label="AddToCartButton" className="Outlined AddToCart"><AddToCartIcon /></IconButton>
            </CardActions >
        </Card >
    )
}

export default BmkProductCard