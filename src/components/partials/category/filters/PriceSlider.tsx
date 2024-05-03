import { useAppSelector } from '@/hooks'
import useDebounce from '@/hooks/useDebounce'
import { getlastPartOfPath } from '@/utils/common'
import { Box, Slider, Typography } from '@mui/material'
import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'

const PriceSlider = ({ minPrice, maxPrice, setSelectedPrice, selectedPrice, setIsPriceChanged }: { minPrice: number, maxPrice: number, setSelectedPrice: any, selectedPrice?: number[] | null, setIsPriceChanged: any }) => {
    // console.log("🚀 ~ PriceSlider ~ selectedPrice:", selectedPrice)
    // const [value, setSelectedPrice] = useState<number[]>(selectedPrice ? [selectedPrice[0], selectedPrice[1]] : [minPrice, maxPrice])
    const clearFilters = useAppSelector(state => state.category.clearFilters)

    // const debouncedValue = useDebounce(selectedPrice, 700);
    const firstUpdate = useRef(true);

    // useEffect(() => {
    //     setSelectedPrice([pagesSelectedFilters?.price[getlastPartOfPath(location.pathname)][0], pagesSelectedFilters.price[getlastPartOfPath(location.pathname)][1]])
    // }, [pagesSelectedFilters]);

    useLayoutEffect(() => {
        if (firstUpdate.current) {
            firstUpdate.current = false;
            return;
        }
        setSelectedPrice([minPrice, maxPrice])
    }, [minPrice, maxPrice, setSelectedPrice])

    useEffect(() => {
        if (clearFilters) {
            setSelectedPrice([minPrice, maxPrice])
        }
    }, [clearFilters])

    // useEffect(() => {
    //     if (firstUpdate.current) {
    //         firstUpdate.current = false;
    //         return;
    //     }
    //     if (selectedPrice) {
    //         setIsPriceChanged(true);
    //     }
    //     setSelectedPrice([selectedPrice ? selectedPrice[0] : minPrice, selectedPrice ? selectedPrice[1] : maxPrice])
    // }, [debouncedValue])

    const valuetext = (value: number) => {
        return `Price ${value}`;
    }

    const handleChange = (event: Event, newValue: number | number[]) => {
        setSelectedPrice(newValue as number[]);
    }
    const renderPriceRange = useMemo(() => {
        return (
            <Slider
                getAriaLabel={() => 'Price range'}
                value={selectedPrice ? selectedPrice : [minPrice, maxPrice]}
                onChange={handleChange}
                valueLabelDisplay="auto"
                getAriaValueText={valuetext}
                className="Slider"
                min={minPrice}
                max={maxPrice}
            />
        )
    }, [selectedPrice, minPrice, maxPrice, handleChange, valuetext])
    return (
        <Box className="PriceRangeWrapper Divider">
            <Typography className="PriceRange">Price Range</Typography>
            <Typography variant="subtitle1">{`$${selectedPrice ? selectedPrice[0] : minPrice} - $${selectedPrice ? selectedPrice[1] : maxPrice}`}</Typography>
            {renderPriceRange}
            {/* <Typography className="AveragePrice" variant="body2">Average price: $41</Typography> */}
        </Box>
    )
}

export default React.memo(PriceSlider)