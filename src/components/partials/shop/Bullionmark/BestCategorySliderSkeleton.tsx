import React, { useEffect, useState } from "react";
import { Box, Card, useMediaQuery, Container, Typography } from "@mui/material";

import { Link } from "gatsby";

import { Navigation, Autoplay, Pagination, A11y } from "swiper/modules";
import { BullionmarkSectionHeading } from "@/components/common/Utils";
import LazyImage from "@/hooks/LazyImage";
import noImage from "../../../../assets/images/noImage.png";
import useUnloadMinHeight from "@/hooks/useUnloadMinHeight";

function BestCategorySliderSkeleton(props: any) {
  const removeMinHeight = useUnloadMinHeight();
  const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down("md"));

  const [isRendering, setIsRendering] = useState(isMobile);

  useEffect(() => {
    setTimeout(() => setIsRendering(false), 3500);
  }, []);
  return (
    <Box
      id="BestCategorySlider"
      component="section"
      className={props.PaddingClass}
      style={removeMinHeight ? { minHeight: isMobile ? 720 : 650 } : {}}
    >
      <Container>
        <BullionmarkSectionHeading title={props?.title} />
        <Box className="BmkProductsSliderWrapper">
          <Box className="SwiperContainer CircleSwiperPagination">
            {isRendering && isMobile && (
              <>
                {props?.pageData?.quickCategoryLinks?.map(
                  (category: any, index: number) => {
                    if (isRendering && index > 0) {
                      return;
                    }
                    return (
                      <Link
                        to={category.linkUrl}
                        className="BmkProductCardLink"
                      >
                        <Card className="BmkProductCard">
                          <Box
                            key="productImage"
                            className="ProductImageWrapper"
                          >
                            <LazyImage
                              key={category.id}
                              src={category.imageUrl}
                              placeholder={noImage}
                              alt={category.name}
                              style={{
                                minHeight: isMobile ? "430px" : "350px",
                              }}
                              className="ProductImage"
                            />
                          </Box>
                          <Box key="productTitle" className="ProductTitle">
                            <Typography variant="h4">
                              {category.name}
                            </Typography>
                          </Box>
                        </Card>
                      </Link>
                    );
                  }
                )}
              </>
            )}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default BestCategorySliderSkeleton;
