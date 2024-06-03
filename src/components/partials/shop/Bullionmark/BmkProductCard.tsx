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
import noImage from '@/assets/images/noImage.png'
import { IFeaturedProducts } from '../Qmint/FeaturedProducts'
import { useAppSelector } from '@/hooks'


function BmkProductCard({ product }: { product: IFeaturedProducts }) {
    const { configDetails: configDetailsState, isLoggedIn } = useAppSelector((state) => state.homePage)

    const renderStockStatus = isLoggedIn || configDetailsState?.AvailabilityForGuests_Enable?.value

    const handleAddToCart = () => {

    }

    return (
        <Card className="BmkCommonProductCard">
            <Stack className="ImageWrapper">
                <ProducLink className="ImageLink" to={`/product-details/${product?.friendlypagename}`}>
                    <img src={product?.imageUrl ?? noImage} alt="Product image" loading="lazy" />
                </ProducLink>
            </Stack>
            <CardContent>
                {(renderStockStatus) && <BmkProductStockStatus availability={product?.availability} />}
                <Link className="ProductName" onClick={() => {
                    navigate(`/product-details/${product?.friendlypagename}`) //friendlypagename
                }}>
                    <Typography component="h3">{product?.productName}</Typography>
                </Link>
                <Stack className="PriceContentWrapper">
                    <Box className="Top">
                        <Typography variant="overline" className="PriceMessage">{product?.priceWithDetails?.tierPriceList &&
                            product?.priceWithDetails?.tierPriceList?.length > 0
                            ? "As low As"
                            : "Best Price at"}</Typography>
                    </Box>
                    <Stack className="Bottom">
                    <Typography variant="overline" className="DiscountedPrice">${(product?.priceWithDetails?.tierPriceList && product?.priceWithDetails?.tierPriceList?.length > 0) ?
                            (product?.priceWithDetails?.productLowestPrice?.toFixed(2)) : product?.priceWithDetails?.price?.toFixed(2)}</Typography>
                        {(product?.priceWithDetails?.discount && product?.priceWithDetails?.discount !== 0)
                            ?
                            <Typography variant="subtitle1" className="ActualPrice">
                                $
                                {(
                                    product?.priceWithDetails?.price +
                                    product?.priceWithDetails?.discount
                                ).toFixed(2)}
                            </Typography>
                            : null}
                    </Stack>
                </Stack>
                <Typography
                    className={classNames("OfferBadge")}
                    sx={{ backgroundColor: product?.tagColor }}
                >
                    {product?.tagName}
                </Typography>
            </CardContent>
            <CardActions>
                <Button name='learnMore' aria-label='Learn More' variant="outlined" className="PrimaryAction" onClick={() => {
                    navigate(`/product-details/${product?.friendlypagename}`) //friendlypagename
                }} fullWidth>Learn More</Button>
                {product?.availability !== "Sold Out" && <IconButton title="Add to cart" aria-label="AddToCartButton" className="Outlined AddToCart" onClick={handleAddToCart}><AddToCartIcon /></IconButton>}
            </CardActions >
        </Card >
    )
}

export default BmkProductCard