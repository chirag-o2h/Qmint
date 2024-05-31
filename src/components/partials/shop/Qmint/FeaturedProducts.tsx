import React from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Box, Card, Skeleton, useMediaQuery, Container } from "@mui/material"

import { Autoplay, Pagination, A11y } from 'swiper/modules'

// Utils
import { SectionHeading } from "../../../common/Utils"
import { ProductCard } from "../../../common/Card"
import { useAppSelector } from "@/hooks"
import useGetFeaturesProductaData from "@/hooks/useGetFeaturedProductaData"
export interface IFeaturedProducts {
  productId: number,
  categoryId: number,
  productName: string,
  shortDescription: string,
  friendlypagename: string,
  disableBuyButton: boolean,
  displayOrder: number,
  imageUrl: string,
  parentProductId: number,
  isFeatureProduct: true,
  productPrice: number,
  premiumDiscount: number,
  productWeight: number,
  showOnHomepage: boolean,
  colorClass: string,
  iconClass: string,
  availability: string,
  stock: number,
  isBundle: boolean,
  marketingTagId: 1,
  tagName: string,
  tagColor: string,
  metalId: number,
  tierpriceapply: boolean,
  priceWithDetails: null | IproductPrice,
  bulkProduct: any
  productPremium: string | number
}
export interface Idata {
  data: {
    data: {
      items: IFeaturedProducts[]
    }
  }
}
export interface ItickerPrice {
  fromQty: number
  toQty: number
  price: number,
  discount: number,
  taxPrice: number
}
export interface IproductPrice {
  productId: number,
  price: number,
  discount: number,
  productLowestPrice: number,
  tierOff: number,
  taxPrice: number,
  tierPriceList: ItickerPrice[]
}
export interface IpriceForEachId {
  [key: number]: IproductPrice
}

function FeaturedProducts() {
  const { configDetails } = useAppSelector((state) => state.homePage)
  const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down('md'))

  const { data, priceForEachId } = useGetFeaturesProductaData();

  const config = {
    slidesPerView: 1.3,
    spaceBetween: 16,
    pagination: {
      clickable: true,
    },
    centeredSlides: isMobile,
    loop: true,
    speed: 500,
    modules: [Autoplay, Pagination, A11y],
    scrollbar: {
      draggable: true
    },
    grabCursor: true,
    autoplay: {
      delay: 8000,
    },
    breakpoints: {
      475: {
        slidesPerView: 1.5,
        spaceBetween: 20,
      },
      600: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      900: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
      1200: {
        slidesPerView: 4,
        spaceBetween: 20,
      },
      1440: {
        slidesPerView: 5,
        spaceBetween: 40,
      },
    },
  }

  return (
    <Box id="FeaturedProducts" component="section">
      <Container>
        <SectionHeading
          title={configDetails?.["ShopHomepage_Section_2_Featured_Products_Title"]?.value ?? "Featured Products*"}
          description={configDetails?.["ShopHomepage_Section_2_Featured_Products_Subtitle"]?.value ?? "description*"}
        />
      </Container>
      <Box className="ProductsWrapper">
        <Box className="SwiperContainer">
          <Swiper {...config}>
            {
              data?.data?.items?.length > 0 ? data?.data?.items?.map((product) => {
                product.priceWithDetails = priceForEachId ? priceForEachId[product?.productId] : null;
                return (<SwiperSlide key={product.productId}>
                  <ProductCard product={product} />
                </SwiperSlide>)
              })
                :
                <>
                  {!isMobile ? Array(6).fill(0).map((_, index) => {
                    return (
                      <SwiperSlide key={index}>
                        <Card className="ProductCard">
                          <Skeleton animation="wave" height={500} style={{ padding: "0px" }} />
                          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                            <Skeleton animation="wave" height={95} width="100%" style={{ marginBottom: "4px" }} />
                            <Skeleton animation="wave" height={70} width="100%" />
                          </div>
                        </Card>
                      </SwiperSlide>
                    );
                  }) : Array(4).fill(0).map((_, index) => {
                    return (
                      <SwiperSlide key={index}>
                        <Card className="ProductCard">
                          <Skeleton animation="wave" height={320} style={{ padding: "0px" }} />
                          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                            <Skeleton animation="wave" height={100} width="100%" style={{ marginBottom: "4px" }} />
                            <Skeleton animation="wave" height={70} width="100%" />
                          </div>
                        </Card>
                      </SwiperSlide>
                    );
                  })}
                </>
            }
          </Swiper>
        </Box>

      </Box>
    </Box>
  )
}

export default React.memo(FeaturedProducts)