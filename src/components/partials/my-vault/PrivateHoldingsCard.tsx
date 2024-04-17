import { Box, Card, CardContent, CardMedia, Stack, Typography, Button, IconButton, List, ListItem, ListItemButton, ListItemText } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { ChevronDown, ChevronUp, OptionsIcon } from "../../../assets/icons/index"
import SellEntry from "@/components/partials/my-vault/SellEntry";
import ConvertToListing from "@/components/partials/my-vault/ConvertToListing";
import SellToUs from "@/components/partials/my-vault/SellToUs";
import { ClickTooltip } from '@/components/common/CustomTooltip';
import { useAppDispatch, useAppSelector, useToggle } from "@/hooks";
import { PriceFacturationEnum, roundOfThePrice } from '@/utils/common';
import { deletePrivateHoldings } from '@/redux/reducers/myVaultReducer';
import { navigate } from 'gatsby';
import Toaster from '@/components/common/Toaster';
import useShowToaster from '@/hooks/useShowToaster';

const getColorForPosition = (position: number) => {
    return PriceFacturationEnum[position.toString() as keyof typeof PriceFacturationEnum];
};

function PrivateHoldingCards({ fetchPrivateHoldingsList, item }: any) {
    const openToaster = useAppSelector(state => state.homePage.openToaster)
    const { showToaster } = useShowToaster();
    const dispatch = useAppDispatch()
    const [holdingProductOptions, setHoldingProductOptions] = useState<boolean>(false)
    const [currentValueOfPopUp, setCurrentValueOfPopUp] = useState<any>({})
    const [openSellEntry, toggleSellEntry] = useToggle(false);
    const [openConvertToListing, toggleConvertToListing] = useToggle(false);
    const [openSellToUs, toggleSellToUs] = useToggle(false);
    const tooltipRef: any = useRef(null)

    const handleTooltipClose = (event: any) => {
        setHoldingProductOptions(false)
    }
    const handleTooltipOpen = (event: any) => {
        setHoldingProductOptions(true)
    }
    const handleClickAway = (event: any) => {
        setHoldingProductOptions(false)
    }

    const openSellToUsPopUP = (item: any) => {
        setCurrentValueOfPopUp((prev: any) => {
            return ({ ...prev, sellToUs: item, maxQty: item?.quantity })
        })
        toggleSellToUs(true)
    }
    const openConvertToListingPopUp = (item: any) => {
        setCurrentValueOfPopUp((prev: any) => {
            return ({ ...prev, convertToListing: item, maxQty: item?.quantity })
        })
        toggleConvertToListing(true)
    }
    const openSellEntryPopUP = (item: any) => {
        setCurrentValueOfPopUp((prev: any) => {
            return ({ ...prev, sellEntry: item, maxQty: item?.quantity })
        })
        toggleSellEntry(true)
    }
    const setValueForTheSellToUsPopUp = (key: any, value: any) => {
        setCurrentValueOfPopUp((prev: any) => {
            return ({ ...prev, [key]: { ...prev[key], ...value } })
        })
    }
    const deleteHoldings = async (item: any) => {
        const res = await dispatch(deletePrivateHoldings({ id: item?.id }))
        if (res.payload.data.data == false) {
            showToaster({
                message: res.payload.data.message,
                severity: 'error'
            })
            return
        }
        fetchPrivateHoldingsList()
    }
    return (
        <>
            {openToaster && <Toaster />}
            <Card className="PrivateHoldingCard">
                <CardMedia
                    component="img"
                    image={item.filepath}
                    alt="Product image"
                />
                <CardContent>
                    <Box className="ProductDetailWrapper">
                        <Typography variant="subtitle2" className="">{item.producName}</Typography>
                        <Typography variant="body1" className=""><strong>Qty :</strong> {item.quantity}</Typography>
                        <Typography variant="body1" className=""><strong>Purchase Price :</strong> ${roundOfThePrice(item.purchasePrice * item.quantity)} (${roundOfThePrice(item.purchasePrice)})</Typography>
                        <Typography variant="body1" className=""><strong>Sell to us value :</strong></Typography>
                        <Stack className='ButtonsWrapper'>
                            <Button variant="contained" size="small" onClick={toggleSellToUs} color={getColorForPosition(item.position)}>${roundOfThePrice(item.price)}</Button>
                            <Button variant="contained" size="small" onClick={toggleSellToUs} color={getColorForPosition(item.position)} startIcon={item.position === 2 ? <ChevronDown /> : <ChevronUp />}>${item.move} ({item.percentage}%)</Button>
                            <Button variant='contained' size="small" onClick={() => { openSellToUsPopUP(item) }}>selltoas</Button>
                        </Stack>
                        {/* <Box sx={{
                            textAlign: 'right',
                            marginTop: '5px',
                        }}>
                            <Button variant='contained' size="small" color='info'>selltoas</Button>
                        </Box> */}
                    </Box>
                    <ClickTooltip
                        name='holdingproduct'
                        open={holdingProductOptions}
                        placement="bottom-end"
                        onClose={handleTooltipClose}
                        onClickAway={handleClickAway}
                        renderComponent={<IconButton name='holdingproduct' ref={tooltipRef} className="OptionButton" onClick={handleTooltipOpen}><OptionsIcon /></IconButton>}
                        lightTheme
                        disablePortal={true}
                        arrow
                    >
                        <List>
                            <ListItem>
                                <ListItemButton onClick={() => { openConvertToListingPopUp(item) }}>
                                    <ListItemText primary="Convert To Listing" />
                                </ListItemButton>
                            </ListItem>
                            <ListItem>
                                <ListItemButton>
                                    <ListItemText primary="Edit" onClick={() => navigate(`/my-vault/private-holding-add/?holdingId=${item.holdingId}`)} />
                                </ListItemButton>
                            </ListItem>
                            <ListItem>
                                <ListItemButton onClick={() => { openSellEntryPopUP(item) }}>
                                    <ListItemText primary="sellentry" />
                                </ListItemButton>
                            </ListItem>
                            <ListItem>
                                <ListItemButton onClick={() => { deleteHoldings(item) }}>
                                    <ListItemText primary="Delete" />
                                </ListItemButton>
                            </ListItem>
                        </List>
                    </ClickTooltip>
                </CardContent>
                {openSellEntry && <SellEntry maxQty={currentValueOfPopUp?.maxQty} open={openSellEntry} onClose={toggleSellEntry} valueOfSellEntry={currentValueOfPopUp?.sellEntry} setValue={setValueForTheSellToUsPopUp} />}
                {openConvertToListing && <ConvertToListing maxQty={currentValueOfPopUp?.maxQty} open={openConvertToListing} onClose={toggleConvertToListing} valueOfConvertToListing={currentValueOfPopUp?.convertToListing} setValue={setValueForTheSellToUsPopUp} />}
                {openSellToUs && <SellToUs maxQty={currentValueOfPopUp?.maxQty} open={openSellToUs} onClose={toggleSellToUs} valueOfTheSellToUs={currentValueOfPopUp?.sellToUs} setValue={setValueForTheSellToUsPopUp} />}
            </Card >
        </>
    )
}
export default React.memo(PrivateHoldingCards)