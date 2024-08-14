import React, { useMemo } from "react"
import { Container, Stack, Box } from "@mui/material"

// Utils
import { AfterStockReturnWithName, StockReturnWithName } from "../common/Utils"
import useApiRequest from "@/hooks/useAPIRequest"
import { ENDPOINTS } from "@/utils/constants"
import { useAppSelector } from "@/hooks"
import DraggableMarquee from "./DraggableMarquee";

interface ItickerData {
    data: Array<{
        "name": string
        "charturl": string
        "current": number
        "position": 0 | 1 | 2
        "percentage": number,
        "move": number,
        "loading": boolean,
    }>
}
interface IApiResponse<T> {
    data: T;
    loading: boolean;
    error: string | null;
}
function FrontPricing() {
    const { configDetails: configDetailsState, isLoggedIn } = useAppSelector((state) => state.homePage)
    const { data }: IApiResponse<ItickerData> = useApiRequest(ENDPOINTS.getTicker, 'get', null, 60);
    const renderedStockItems = useMemo(() => {
        const tickerStyle = {
            tickerboxfontcolor: configDetailsState?.Store_Ticker_BoxFontColor?.value,
            tickertype: configDetailsState?.Store_Ticker_Type?.value,
        }
        const isItForBullionMark = process.env.GATSBY_THEME_TYPE == '1'
        return configDetailsState?.["Ticker_HomePage_EnableforGuests"]?.value || isLoggedIn ? data?.data?.map((stock) => (
            <StockReturnWithName key={stock.name} name={stock.name} value={stock.current} charturl={stock.charturl} status={stock.position === 1} percentage={stock.percentage} move={stock.move} tickerStyle={tickerStyle} isItForBullionMark={isItForBullionMark} />
        )) : null;
    }, [data, configDetailsState]);
    const renderdTextAfterText = useMemo(() => {
        //todo if ues is logged in the use this headerticker insted of this guestheaderticker
        // <AfterStockReturnWithName text={configDetailsState?.Header_ShopHomePage_Ticker_Text?.value} />
        return <AfterStockReturnWithName text={isLoggedIn ? configDetailsState?.["Main_HomePage_Ticker_Text"]?.value : configDetailsState?.["Header_HomePage_Ticker_Text_Guest"]?.value} />
    }, [configDetailsState])
    return (
        <Box
            id="PricingHeader"
            sx={{
                fontFamily: configDetailsState?.Store_Ticker_FontStyle?.value,
                color: configDetailsState?.Store_Ticker_FontColor?.value,
            }}>
            <Container className="PricingHeader">
                <Stack
                    className="PricingHeader__Wrapper"
                >
                    <img src={configDetailsState?.Australia_flag_url?.value} alt="Australia flag" width={36} height={24} loading="lazy" />
                    <DraggableMarquee>
                        <Stack id={"mark-id"} className="PricingHeader__Wrapper--Content">
                            {renderedStockItems}
                            {renderdTextAfterText}
                            {renderedStockItems}
                            {renderdTextAfterText}
                        </Stack>
                    </DraggableMarquee>
                </Stack>
            </Container>
        </Box>
    )
}

export default FrontPricing