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
import useRequireLogin from "@/hooks/useRequireLogin";
import RecordNotFound from "@/components/common/RecordNotFound";
import Toaster from "@/components/common/Toaster";
import useShowToaster from "@/hooks/useShowToaster";
import { openNewTab } from "@/utils/common";

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
  const openToaster = useAppSelector(state => state.homePage.openToaster)
  const { showToaster } = useShowToaster()
  const { loadingForCheckingLogin } = useRequireLogin()
  const { myVaultHomePageData, myVaultHomePageChartData } = useAppSelector((state) => state.myVault)
  // console.log("🚀 ~ Vault ~ myVaultHomePageData:", myVaultHomePageData)
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
  const reOrderFunction = useCallback(async (orderId: any) => {
    try {
      const res = await ConfigServices.reOrderAPI(orderId)
      if (res.data.data) {
        navigate('/shopping-cart')
        return;
      } else {
        showToaster({ message: res.data.message, severity: "error" })
      }
    } catch (error) {
      // console.log("🚀 ~ reOrderFunction ~ res:", error)
    }
  }, [])
  if (loadingForCheckingLogin) {
    return
  }
  return (
    <Layout>
      {openToaster && <Toaster />}
      <Box className="VaultPage">
        <Breadcrumb arr={[{ navigate: '/my-vault', name: 'My Vault' }]} />
        <Box className="HeroSection">
          <Container>
            <Box className="HeroSectionWrapper">
              <Box className="Left">
                {/* <Typography variant="subtitle2" component="h2"  sx={{ mb: 3.25 }}>
                  Good Morning Steve!
                </Typography> */}
                {/* @ts-ignore */}
                <Typography variant="body1" dangerouslySetInnerHTML={{
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
                <Button size="large" variant="contained" sx={{ mt: 5 }} onClick={() => {
                  navigate('/shop')
                }}>
                  Shop Now
                </Button>
                <Box className="VaultStats">
                  <StatsCard onClick={() => { navigate('/my-vault/accounts/') }} title="Accounts" statsNumber={myVaultHomePageData?.Customers} icon={<AccountsIcon />} bgColor="rgb(52 145 250 / 6%)" />
                  <StatsCard onClick={() => { navigate('/my-vault/addresses/') }} title="Addresses" statsNumber={myVaultHomePageData?.Addresses} icon={<AddressesIcon />} bgColor="rgb(234 162 43 / 6%)" />
                  <StatsCard onClick={() => { navigate('/my-vault/order-history/') }} title="View Orders" statsNumber={myVaultHomePageData?.Order} icon={<OrdersIcon />} bgColor="rgb(52 145 250 / 6%)" />
                  <StatsCard onClick={() => { navigate('/my-vault/buy-back-order-history/') }} title="Buyback Orders" statsNumber={myVaultHomePageData?.["Buyback Order"]} icon={<BuyBackOrderIcon />} bgColor="rgb(0 128 1 / 6%)" />

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
                                    <Box className="Content">
                                      <img
                                        className="BannerImage"
                                        rel="prefetch"
                                        loading="lazy"
                                        src={
                                          isLargeScreen
                                            ? item.cdnUrlLarge
                                            : item.cdnUrlSmall
                                        }
                                        alt="background"
                                        onClick={() => {
                                          if (item.isImgUrl) {
                                            openNewTab(item.url)
                                          }
                                        }}
                                      />
                                      <Box className="BannerImageContent"
                                        dangerouslySetInnerHTML={{
                                          __html: item.htmlcode,
                                        }}
                                      >
                                      </Box>
                                    </Box>
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
              <UserStatsCard title="My Silver" icon={<MySilverIcon />} bgColor="rgb(255 31 31 / 5%)" currentPrice={myVaultHomePageChartData?.silverValueFacturation?.current} movevalue={myVaultHomePageChartData?.silverValueFacturation?.move} movePercentage={myVaultHomePageChartData?.silverValueFacturation?.percentage} />
              <LineChartCard title="My Vault" currentPrice={myVaultHomePageChartData?.totalValueFacturation?.current} low={myVaultHomePageChartData?.totalValueFacturation?.low} high={myVaultHomePageChartData?.totalValueFacturation?.high} valueForChart={myVaultHomePageChartData?.totalValueFacturation?.linechartdata} />
              <LineChartCard title="My Gold" currentPrice={myVaultHomePageChartData?.goldValueFacturation?.current} low={myVaultHomePageChartData?.goldValueFacturation?.low} high={myVaultHomePageChartData?.goldValueFacturation?.high} valueForChart={myVaultHomePageChartData?.goldValueFacturation?.linechartdata} />
              <LineChartCard title="My Silver" currentPrice={myVaultHomePageChartData?.silverValueFacturation?.current} low={myVaultHomePageChartData?.silverValueFacturation?.low} high={myVaultHomePageChartData?.silverValueFacturation?.high} valueForChart={myVaultHomePageChartData?.silverValueFacturation?.linechartdata} />
            </Box>
          </Container>
        </Box>
        <Box className="UserInfo">
          <Container>
            <Box className="UserInfoWrapper">
              <Box className="Left">
                <StatsCard onClick={() => { navigate('/topic/allocated-holdings/') }} title="Allocated Holdings" statsNumber="Coming Soon" icon={<AllotedHldingIcon />} bgColor="rgb(255 31 31 / 6%)" />
                <StatsCard onClick={() => { navigate('/my-vault/private-holding/') }} title="Private Holding" icon={<PrivateHoldingIcon />} statsNumber={myVaultHomePageData?.["Private Holdings"]} bgColor="rgb(234 162 43 / 6%)" />
                <StatsCard onClick={() => { navigate('/topic/smart-metals/') }} title="Smart Metals" statsNumber="Coming Soon" icon={<SmartMetalsIcon />} bgColor="rgb(0 128 1 / 6%)" />
                <StatsCard onClick={() => { navigate('/rewardpoints/history') }} title="Rewards Points" statsNumber={myVaultHomePageData?.["Reward Point"]} icon={<RewardPointsIcon />} bgColor="rgb(255 31 31 / 6%)" />
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
                                    <Box className="Content">
                                      <img
                                        className="BannerImage"
                                        rel="prefetch"
                                        loading="lazy"
                                        src={
                                          isLargeScreen
                                            ? item.cdnUrlLarge
                                            : item.cdnUrlSmall
                                        }
                                        alt="background"
                                        onClick={() => {
                                          if (item.isImgUrl) {
                                            openNewTab(item.url)
                                          }
                                        }}
                                      />
                                      <Box className="BannerImageContent"
                                        dangerouslySetInnerHTML={{
                                          __html: item.htmlcode,
                                        }}
                                      >
                                      </Box>
                                    </Box>
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
              {(myVaultHomePageData?.recentOrders?.length && myVaultHomePageData?.recentOrders?.length > 0) ? <RecentOrderTable recentOrders={myVaultHomePageData?.recentOrders!} reOrderFunction={reOrderFunction} /> : <RecordNotFound message="No orders are available" />}
            </Box>
          </Container>
        </Box>
        {/* @info:: below newsletter is commneted it will be use in future */}
        {/* <Box className="RewardSection" sx={{ mt: 7.5 }}>
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
                  {myVaultHomePageData?.customerInformation?.firstName + ' ' + myVaultHomePageData?.customerInformation?.lastName}
                </Typography>
                <Typography variant="body2" sx={{ mt: 0.6 }}>
                  {myVaultHomePageData?.customerInformation?.email}
                </Typography>
                <Typography variant="body2" sx={{ mt: 0.6 }}>
                  {myVaultHomePageData?.customerInformation?.phoneNumber}
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
                <Typography variant="body2" sx={{ mt: 1.5 }} dangerouslySetInnerHTML={{ __html: myVaultHomePageData?.newsLetterDescription ?? "" }}>
                </Typography>
              </Card>
            </Box>
          </Container>
        </Box> */}
      </Box>
    </Layout>
  );
}

export default Vault;
