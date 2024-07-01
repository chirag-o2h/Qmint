import { useAppDispatch, useAppSelector } from '@/hooks'
import useDebounce from '@/hooks/useDebounce'
import { setPageSelectedSpecifications, setPageSelectedPrice } from '@/redux/reducers/categoryReducer'
import { getlastPartOfPath } from '@/utils/common'
import { Box, Slider, Typography, useMediaQuery } from '@mui/material'
import React, { useCallback, useEffect,useLayoutEffect, useMemo, useRef, useState } from 'react'

const PriceSlider = ({ minPrice, maxPrice, setIsPriceChanged, pagesSelectedFilters, mobilePriceFilters, setMobilePriceFilters }: { minPrice: number, maxPrice: number, setIsPriceChanged: any, pagesSelectedFilters: any, mobilePriceFilters?: number[], setMobilePriceFilters?: any }) => {
    const dispatch = useAppDispatch();
    const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down('md'))
    const [value, setValue] = useState<number[]>(isMobile ? mobilePriceFilters || [minPrice, maxPrice] : [pagesSelectedFilters.price[getlastPartOfPath(location.pathname)]?.[0] || minPrice, pagesSelectedFilters.price[getlastPartOfPath(location.pathname)]?.[1] || maxPrice])
    const clearFilters = useAppSelector(state => state.category.clearFilters)

    const debouncedValue = useDebounce(value, 700);
    const firstUpdate = useRef(true);

    useLayoutEffect(() => {
        if (firstUpdate.current) {
            firstUpdate.current = false;
            return;
        }
        dispatch(setPageSelectedPrice({
            key: getlastPartOfPath(location.pathname), value: [minPrice, maxPrice]
        }))
        setValue([minPrice,maxPrice])
    }, [minPrice, maxPrice])

    useEffect(() => {
        if (clearFilters) {
            setValue([minPrice, maxPrice])
            // console.log("🚀 ~ useEffect ~ minPrice, maxPrice:1", minPrice, maxPrice)
        }
    }, [clearFilters, minPrice, maxPrice])

    useEffect(() => {
        if (firstUpdate.current) {
            firstUpdate.current = false;
            return;
        }
        if (debouncedValue[0] !== minPrice || debouncedValue[1] !== maxPrice) {
            setIsPriceChanged(true);
        }
        if (isMobile) {
            setMobilePriceFilters(value)
        }
        else {
            dispatch(setPageSelectedPrice({
                key: getlastPartOfPath(location.pathname), value: value
            }))
        }
    }, [debouncedValue])

    const valuetext = (value: number) => {
        return `Price ${value}`;
    }

    const handleChange = (event: Event, newValue: number | number[]) => {
        setValue(newValue as number[])
    }

    // const renderPriceRange = useMemo(() => {
    //     return (
    //         <Slider
    //             getAriaLabel={() => 'Price range'}
    //             value={value}
    //             onChange={handleChange}
    //             valueLabelDisplay="auto"
    //             getAriaValueText={valuetext}
    //             className="Slider"
    //             min={minPrice}
    //             max={maxPrice}
    //         />
    //     )
    // }, [value, minPrice, maxPrice, handleChange, valuetext])
    return (
        <Box className="PriceRangeWrapper Divider">
            <Typography className="PriceRange">Price Range</Typography>
            <Typography variant="subtitle1">{`$${(isMobile ? mobilePriceFilters || [minPrice, maxPrice] : [pagesSelectedFilters.price[getlastPartOfPath(location.pathname)]?.[0] || minPrice, pagesSelectedFilters.price[getlastPartOfPath(location.pathname)]?.[1] || maxPrice])[0]} - $${(isMobile ? mobilePriceFilters || [minPrice, maxPrice] : [pagesSelectedFilters.price[getlastPartOfPath(location.pathname)]?.[0] || minPrice, pagesSelectedFilters.price[getlastPartOfPath(location.pathname)]?.[1] || maxPrice])[1]}`}</Typography>
            {/* {renderPriceRange} */}
            <Slider
                getAriaLabel={() => 'Price range'}
                value={value}
                onChange={handleChange}
                valueLabelDisplay="auto"
                getAriaValueText={valuetext}
                className="Slider"
                min={minPrice}
                max={maxPrice}
            />
            {/* <Typography className="AveragePrice" variant="body2">Average price: $41</Typography> */}
        </Box>
    )
}

export default React.memo(PriceSlider)