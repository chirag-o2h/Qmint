import React, { useEffect } from "react";
import { Box, Container, Divider } from "@mui/material";
import { PageTitle } from "@/components/common/Utils";
import Seo from "@/components/common/Seo";
import { useAppDispatch, useAppSelector } from "@/hooks";
import Layout from "@/components/common/Layout";
import MetalChartsTitle from "@/components/partials/charts/MetalChartsTitle";
import MetalCard from "@/components/partials/charts/MetalCard";
import { THEME_TYPE } from "@/axiosfolder";
import { getLiveDashboardChartData } from "@/redux/reducers/homepageReducer";
import { ENDPOINTS } from "@/utils/constants";
import useAPIRequestWithService from "@/hooks/useAPIRequestWithService";
import { getConfigData, IconfigDataFromServer } from "@/utils/getConfigData";
import * as  variable from '../scss/settings/variables.module.scss'


const colourForMembership: any = {
  gold: "#FFCC00",
  silver: "#CCCCCC",
  platinum: "#99CCFF",
  palladium: "#CC99CC",
  goldSilverratio: "#ffe478",
  audusDcross: "#33CCCC",
  default: THEME_TYPE === '1' ? `${variable.pumpkinOrange}` : `${variable.yellowFuel}`,
};

const modifiedName: any = {
  goldSilverratio: "Gold/Silver",
  audusDcross: "AUD/USD",
};

function ChartPage({ serverData }: { serverData: IconfigDataFromServer }) {
  const chartData = useAppSelector((state) => state.homePage.liveDashboardChartData);

  return (
    <>
      <Seo keywords={[`BMk Topics`, ...(serverData?.keywords || [])]} title="Charts" lang="en" configDetailsState={serverData?.configDetails} />
      <Layout>
        <PageTitle title={"Charts"} />
        {Object.entries(chartData).map(([key, value]: any) => {
          const color = colourForMembership[key] || colourForMembership["default"];
          const cardName = modifiedName[key] || key;
          return (
            <Container id="PageTopics">
              <Box className="MetalContentWrapper">
                <MetalChartsTitle title={`${cardName} Charts `} />
                <Box className="MetalCardsWrapper">
                  <MetalCard
                    color={color}
                    headerTitle1={cardName}
                    headerTitle2="Live Spot Price"
                    currentPrice={
                      value.liveprice &&
                      value.liveprice[0] &&
                      value.liveprice[0].current
                    }
                    move={
                      value.liveprice &&
                      value.liveprice[0] &&
                      value.liveprice[0].move
                    }
                    percentage={
                      value.liveprice &&
                      value.liveprice[0] &&
                      value.liveprice[0].percentage
                    }
                    isDollarSign={true}
                  />
                  <MetalCard
                    color={color}
                    headerTitle1={cardName}
                    headerTitle2="3 DAY RANGE"
                    lineChartData={
                      value.threedayrange &&
                      value.threedayrange[0] &&
                      value.threedayrange[0].linechartdata
                    }
                  />
                  {key !== 'audusDcross' ? <MetalCard
                    color={color}
                    headerTitle1={cardName}
                    headerTitle2="DEV-20DMA"
                    currentPrice={
                      value.trend20dma &&
                      value.trend20dma[0] &&
                      value.trend20dma[0].current
                    }
                  /> : null}
                  {key !== 'audusDcross' ? <MetalCard
                    color={color}
                    headerTitle1={cardName}
                    headerTitle2="DEV-200DMA"
                    currentPrice={
                      value.trend200dma &&
                      value.trend200dma[0] &&
                      value.trend200dma[0].current
                    }
                  /> : null}
                  {key === 'goldSilverratio' && <MetalCard
                    color={color}
                    headerTitle1={cardName}
                    headerTitle2="1 YEAR CHART"
                    lineChartData={value.oneyearchart[0].linechartdata}
                    spanStyle={{ gridColumn: 'span 2 !important' }}
                  />}
                  {key !== 'audusDcross' ? <MetalCard
                    color={color}
                    headerTitle1={cardName}
                    headerTitle2="STRENGTH"
                    currentPrice={
                      value.strength &&
                      value.strength[0] &&
                      value.strength[0].current
                    }
                    isStrengh={true}
                    spanStyle={key === 'goldSilverratio' ? { gridColumn: 'span 1 !important',gridColumnStart:'3 !important' } : {}}
                  /> : null}
                  {key !== 'audusDcross' && key !== 'goldSilverratio' ? <MetalCard
                    color={color}
                    headerTitle1={cardName}
                    headerTitle2="52 WEEK LOW / HIGH"
                    currentPrice={
                      value.lowhigh52week &&
                      value.lowhigh52week[0] &&
                      value.lowhigh52week[0].current
                    }
                    low={
                      value.lowhigh52week &&
                      value.lowhigh52week[0] &&
                      value.lowhigh52week[0].low
                    }
                    high={
                      value.lowhigh52week &&
                      value.lowhigh52week[0] &&
                      value.lowhigh52week[0].high
                    }
                  /> : null}
                  {key !== 'goldSilverratio' && <MetalCard
                    color={color}
                    headerTitle1={cardName}
                    headerTitle2="1 YEAR CHART"
                    lineChartData={value.oneyearchart[0].linechartdata}
                    spanStyle={key == 'audusDcross' ? { gridColumn: 'span 2' } :{}}
                  />}
                  {key !== 'audusDcross' && key !== 'goldSilverratio' ? <MetalCard
                    color={color}
                    headerTitle1={cardName}
                    headerTitle2="10 DAY VOLATILITY"
                    currentPrice={
                      value.volatility &&
                      value.volatility[0] &&
                      value.volatility[0].current
                    }
                    isVolatility={true}
                  /> : null}
                  {key !== 'goldSilverratio' && key !== 'audusDcross' ?
                    <MetalCard
                      color={color}
                      headerTitle1={cardName}
                      headerTitle2="LIVE BUY BACK"
                      currentPrice={
                        value.livebuybackprice &&
                        value.livebuybackprice[0] &&
                        value.livebuybackprice[0].current
                      }
                      move={
                        value.livebuybackprice &&
                        value.livebuybackprice[0] &&
                        value.livebuybackprice[0].move
                      }
                      percentage={
                        value.livebuybackprice &&
                        value.livebuybackprice[0] &&
                        value.livebuybackprice[0].percentage
                      }
                      isDollarSign={true}
                    />
                    : null}
                </Box>
                <Divider />
              </Box>
            </Container>
          );
        })}
      </Layout>
    </>
  );
}
export const getServerData = async (context: any) => {
  return await getConfigData(context);
};
export default ChartPage;
