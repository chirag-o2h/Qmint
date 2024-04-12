import React, { useCallback, useEffect, useState } from "react";
import {
  Box,
  Grid,
  Container,
  Typography,
  Stack,
  TextField,
  Button,
  Tabs,
  Tab,
  useMediaQuery,
  Theme,
  Skeleton,
  Card,
} from "@mui/material";

import TabPanel from "@/components/common/TabPanel";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination, A11y } from "swiper/modules";
import useApiRequest from "@/hooks/useAPIRequest";
import { Url } from "url";
import { ENDPOINTS, changePasswordURL } from "@/utils/constants";
import { SwiperNavigation } from "@/components/common/Utils";

// Components
import Layout from "@/components/common/Layout";
import RecentOrderTable from "@/components/common/RecentOrderTable";
import {
  StatsCard,
  UserStatsCard,
  LineChartCard,
} from "@/components/common/Card";

// Utils
import { Breadcrumb } from "@/components/common/Utils";

// Assets
import { ArrowRight, OrdersIcon, PrivateHoldingIcon, AllotedHldingIcon, SmartMetalsIcon, AccountsIcon, AddressesIcon, RewardPointsIcon, BuyBackOrderIcon, MyVaultIcon, MyGoldIcon, MySilverIcon } from "../../assets/icons/index";
import useAPIoneTime from "@/hooks/useAPIoneTime";
import { getMyVaultHomePageChartData, getMyVaultHomePageData } from "@/redux/reducers/myVaultReducer";
import { useAppSelector } from "@/hooks";
import { navigate } from "gatsby";
import ConfigServices from "@/apis/services/ConfigServices";

interface VaultProps {
  id: number;
  storeCode: number;
  url: Url;
  displayOrder: number;
  sliderTime: number;
  htmlCode: any;
  isImgUrl: boolean;
  cdnUrlLarge: any;
  cdnUrlSmall: any;
}

function Vault() {
  const { data }: any = useApiRequest(ENDPOINTS.getSlider);
  const { myVaultHomePageData, myVaultHomePageChartData } = useAppSelector((state) => state.myVault)
  console.log("🚀 ~ Vault ~ myVaultHomePageChartData:", myVaultHomePageChartData)
  const isLargeScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.up("lg")
  );
  const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down("sm"));
  const [tempImgHide, setTempImgHide] = useState(true);
  const config = {
    slidesPerView: 1,
    spaceBetween: 30,
    navigation: {
      nextEl: ".SwiperButtonNext",
      prevEl: ".SwiperButtonPrev",
      disabledClass: "SwiperButtonDisabled",
    },
    pagination: {
      clickable: true,
    },
    loop: true,
    speed: 300,
    modules: [Navigation, Autoplay, Pagination, A11y],
    scrollbar: {
      draggable: true,
    },
    grabCursor: true,
    autoplay: {
      delay: 8000,
    },
  };
  const [state,] = useState({ service: getMyVaultHomePageData })
  const [state2,] = useState({ service: getMyVaultHomePageChartData })
  useAPIoneTime(state)
  useAPIoneTime(state2)
  const reOrderFunction = useCallback(async(orderId:any) => {
   const res = await ConfigServices.reOrderAPI(orderId)
   console.log("🚀 ~ reOrderFunction ~ res:", res)
   if('1'){
    navigate('/shopping-cart')
   }
  }, [])
  return (
    <Layout>
      <Box className="VaultPage">
        <Breadcrumb arr={[{ navigate: '/vault', name: 'vault' }]} />
        <Box className="HeroSection">
          <Container>
            <Box className="HeroSectionWrapper">
              <Box className="Left">
                {/* <Typography variant="subtitle2" component="h2">
                  Good Morning Steve!
                </Typography> */}
                {/* @ts-ignore */}
                <Typography variant="body1" sx={{ mt: 3.25 }} dangerouslySetInnerHTML={{
                  __html: myVaultHomePageData?.customerGreeting
                }}>
                  {/* Monitor real time performance and valuations of your
                  collection or investment portfolio even if you purchased
                  elsewhere. My Vault enables you to see the value of your
                  portfolio in real time, add private holdings, check your
                  reward points and create sub accounts. Please note new orders
                  placed with us will automatically appear in My Vault once the
                  order is fully complete. Allocated Vault Storage holdings will
                  ve migrated to this platform on july 1st. In the interim
                  Allocated Vault Storage clients can request holding statements
                  by calling our office during business hours. */}
                </Typography>
                <Button size="large" variant="contained" sx={{ mt: 5 }}>
                  Shop Now
                </Button>
                <Box className="VaultStats">
                  <StatsCard onClick={() => { navigate('/my-vault/ordres/') }} title="View Orders" statsNumber={myVaultHomePageData?.Order} icon={<OrdersIcon />} bgColor="rgb(52 145 250 / 6%)" />
                  <StatsCard onClick={() => { navigate('/my-vault/private-holding/') }} title="Private Holding" icon={<PrivateHoldingIcon />} statsNumber="35" bgColor="rgb(234 162 43 / 6%)" />
                  <StatsCard onClick={() => { navigate('/my-vault/private-holding/') }} title="Allocated Holdings" statsNumber="8" icon={<AllotedHldingIcon />} bgColor="rgb(255 31 31 / 6%)" />
                  <StatsCard onClick={() => { navigate('/my-vault/smart-metals/') }} title="Smart Metals" statsNumber="460" icon={<SmartMetalsIcon />} bgColor="rgb(0 128 1 / 6%)" />
                </Box>
              </Box>
              <Box className="Right">
                <Box id="Banner" component="section" key={"banner"}>
                  <Box className="SwiperContainer">
                    {myVaultHomePageData?.sliders?.length ? (
                      <Swiper {...config}>
                        <>
                          {myVaultHomePageData?.sliders?.map((item, index: number) => {
                            return (
                              <SwiperSlide key={`BannerSlider-${index}`}>
                                <Box
                                  className="Wrapper"
                                  sx={{
                                    position: "relative",
                                    width: "100%",
                                    height: "100%",
                                  }}
                                >
                                  {
                                    <>
                                      <img
                                        className="BannerImage"
                                        rel="prefetch"
                                        loading="eager"
                                        src={
                                          isLargeScreen
                                            ? item.cdnUrlLarge
                                            : item.cdnUrlSmall
                                        }
                                        alt="background"
                                      />
                                    </>
                                  }
                                </Box>
                              </SwiperSlide>
                            );
                          }
                          )}
                        </>
                      </Swiper>
                    ) : (
                      <>
                        {!isMobile ? (
                          <Skeleton
                            animation="wave"
                            height="75vh"
                            width="100%"
                            style={{
                              transform: "none",
                              margin: "auto",
                              borderRadius: "0px",
                            }}
                          />
                        ) : (
                          <Skeleton
                            animation="wave"
                            height="300px"
                            width="100%"
                            style={{
                              transform: "none",
                              margin: "auto",
                              borderRadius: "0px",
                            }}
                          />
                        )}
                      </>
                    )}
                  </Box>
                </Box>
              </Box>
            </Box>
          </Container>
        </Box>
        <Box className="UserStats" sx={{ mt: 9.625 }}>
          <Container>
            <Box className="UserStatsWrapper">
              <UserStatsCard title="My Vault" icon={<MyVaultIcon />} bgColor="#3491fa14" currentPrice={myVaultHomePageChartData?.totalValueFacturation?.current} movevalue={myVaultHomePageChartData?.totalValueFacturation?.move} movePercentage={myVaultHomePageChartData?.totalValueFacturation?.percentage} />
              <UserStatsCard title="My Gold" icon={<MyGoldIcon />} bgColor="rgb(234 162 43 / 5%)" currentPrice={myVaultHomePageChartData?.goldValueFacturation?.current} movevalue={myVaultHomePageChartData?.goldValueFacturation?.move} movePercentage={myVaultHomePageChartData?.goldValueFacturation?.percentage} />
              <UserStatsCard title="My Silver" icon={<MySilverIcon />} bgColor="rgb(255 31 31 / 5%)" currentPrice={myVaultHomePageChartData?.silverValueFacturation?.percentage} movevalue={myVaultHomePageChartData?.silverValueFacturation?.move} movePercentage={myVaultHomePageChartData?.silverValueFacturation?.percentage} />
              <LineChartCard currentPrice={myVaultHomePageChartData?.totalDayRangeValueFacturation?.current} low={myVaultHomePageChartData?.totalDayRangeValueFacturation?.low} high={myVaultHomePageChartData?.totalDayRangeValueFacturation?.high} valueForChart={myVaultHomePageChartData?.totalDayRangeValueFacturation?.linechartdata} />
              <LineChartCard currentPrice={myVaultHomePageChartData?.goldDayRangeValueFacturation?.current} low={myVaultHomePageChartData?.goldDayRangeValueFacturation?.low} high={myVaultHomePageChartData?.goldDayRangeValueFacturation?.high} valueForChart={myVaultHomePageChartData?.goldDayRangeValueFacturation?.linechartdata} />
              <LineChartCard currentPrice={myVaultHomePageChartData?.silverDayRangeValueFacturation?.current} low={myVaultHomePageChartData?.silverDayRangeValueFacturation?.low} high={myVaultHomePageChartData?.silverDayRangeValueFacturation?.high} valueForChart={myVaultHomePageChartData?.silverDayRangeValueFacturation?.linechartdata} />
            </Box>
          </Container>
        </Box>
        <Box className="UserInfo">
          <Container>
            <Box className="UserInfoWrapper">
              <Box className="Left">
                <StatsCard onClick={() => { navigate('/my-vault/smart-metals/') }} title="Smart Metals" statsNumber="5" icon={<AccountsIcon />} bgColor="rgb(52 145 250 / 6%)" />
                <StatsCard onClick={() => { navigate('/my-vault/addresses/') }} title="Addresses" statsNumber={myVaultHomePageData?.Addresses} icon={<AddressesIcon />} bgColor="rgb(234 162 43 / 6%)" />
                <StatsCard onClick={() => { navigate('/my-vault/rewards-poins/') }} title="Rewards Points" statsNumber={myVaultHomePageData?.["Reward Point"]} icon={<RewardPointsIcon />} bgColor="rgb(255 31 31 / 6%)" />
                <StatsCard onClick={() => { navigate('/my-vault/private-holding') }} title="Buyback Orders" statsNumber={myVaultHomePageData?.["Buyback Order"]} icon={<BuyBackOrderIcon />} bgColor="rgb(0 128 1 / 6%)" />
              </Box>
              <Box className="Right">
                <Box id="Banner" component="section" key={"banner"}>
                  <Box className="SwiperContainer">
                    {myVaultHomePageData?.discoverSliders?.length ? (
                      <Swiper {...config}>
                        <>
                          {myVaultHomePageData?.discoverSliders?.map((item, index: number) => {
                            return (
                              <SwiperSlide key={`BannerSlider-${index}`}>
                                <Box
                                  className="Wrapper"
                                  sx={{
                                    position: "relative",
                                    width: "100%",
                                    height: "100%",
                                  }}
                                >
                                  {
                                    <>
                                      <img
                                        className="BannerImage"
                                        rel="prefetch"
                                        loading="eager"
                                        src={
                                          isLargeScreen
                                            ? item.cdnUrlLarge
                                            : item.cdnUrlSmall
                                        }
                                        alt="background"
                                      />
                                    </>
                                  }
                                </Box>
                              </SwiperSlide>
                            );
                          }
                          )}
                        </>
                      </Swiper>
                    ) : (
                      <>
                        {!isMobile ? (
                          <Skeleton
                            animation="wave"
                            height="75vh"
                            width="100%"
                            style={{
                              transform: "none",
                              margin: "auto",
                              borderRadius: "0px",
                            }}
                          />
                        ) : (
                          <Skeleton
                            animation="wave"
                            height="300px"
                            width="100%"
                            style={{
                              transform: "none",
                              margin: "auto",
                              borderRadius: "0px",
                            }}
                          />
                        )}
                      </>
                    )}
                  </Box>
                </Box>
              </Box>
            </Box>
          </Container>
        </Box>
        <Box className="RecentOrders">
          <Container>
            <Box className="RecentOrdersWrapper">
              <Stack className="RecentOrdersTitleWrapper">
                <Typography variant="h4">Recent Orders</Typography>
                <Button endIcon={<ArrowRight />} onClick={() => {
                  navigate('/my-vault/order-history/')
                }}>View All</Button>
              </Stack>
              <RecentOrderTable recentOrders={myVaultHomePageData?.recentOrders!} reOrderFunction={reOrderFunction} />
            </Box>
          </Container>
        </Box>
        <Box className="RewardSection" sx={{ mt: 7.5 }}>
          <Container>
            <Stack className="RewardWrapper">
              <Typography className="rewardText">Your Rewards Points: </Typography>
              <Typography variant="h4" className="rewardPoints">{myVaultHomePageData?.availableRewardPoints}</Typography>
            </Stack>

          </Container>
        </Box>
        <Box className="AccountInformation" sx={{ mt: 2.5 }}>
          <Container>
            <Typography className="AccountInformationText">
              Account Information
            </Typography>
            <Box sx={{ mt: 4.5 }}>
              <Card className="AccountInformationCard">
                <Typography variant="subtitle2">Contact Information</Typography>
                <Typography variant="body2" sx={{ fontWeight: 500, mt: 1.5 }}>
                  Steve Test
                </Typography>
                <Typography variant="body2" sx={{ mt: 0.6 }}>
                  stevetest@123.com
                </Typography>
                <Button
                  variant="text"
                  sx={{ mt: 2, color: "#000", fontWeight: 600 }}
                  onClick={() => {
                    navigate(changePasswordURL)
                  }}
                >
                  Change password
                </Button>
              </Card>
              <Card className="AccountInformationCard">
                <Typography variant="subtitle2">Newsletters</Typography>
                <Typography variant="body2" sx={{ mt: 1.5 }}>
                  You are currently not subscribed to any newsletter.
                </Typography>
              </Card>
            </Box>
          </Container>
        </Box>
      </Box>
    </Layout>
  );
}

export default Vault;
