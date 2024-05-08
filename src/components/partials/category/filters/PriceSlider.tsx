import { useAppDispatch, useAppSelector } from '@/hooks'
import useDebounce from '@/hooks/useDebounce'
import { setPageSelectedSpecifications, setPageSelectedPrice } from '@/redux/reducers/categoryReducer'
import { getlastPartOfPath } from '@/utils/common'
import { Box, Slider, Typography } from '@mui/material'
import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'

const PriceSlider = ({ minPrice, maxPrice, setIsPriceChanged, pagesSelectedFilters }: { minPrice: number, maxPrice: number, setIsPriceChanged: any, pagesSelectedFilters: any }) => {
    console.log("Again")
    const dispatch = useAppDispatch();
    const [value, setValue] = useState<number[]>([pagesSelectedFilters.price[getlastPartOfPath(location.pathname)]?.[0] || minPrice, pagesSelectedFilters.price[getlastPartOfPath(location.pathname)]?.[1] || maxPrice])
    const clearFilters = useAppSelector(state => state.category.clearFilters)

    const debouncedValue = useDebounce(value, 700);
    const firstUpdate = useRef(true);

    useLayoutEffect(() => {
        if (firstUpdate.current) {
            firstUpdate.current = false;
            return;
        }
        // setSelectedPrice([minPrice, maxPrice])
        dispatch(setPageSelectedPrice({
            key: getlastPartOfPath(location.pathname), value: [minPrice, maxPrice]
        }))
    }, [minPrice, maxPrice])

    useEffect(() => {
        if (clearFilters) {
            // dispatch(setPageSelectedFilters({
            //     key: getlastPartOfPath(location.pathname), value: {
            //         price: [minPrice, maxPrice],
            //         specifications: pagesSelectedFilters?.specification[getlastPartOfPath(location.pathname)]
            //     }
            // }))
            dispatch(setPageSelectedPrice({
                key: getlastPartOfPath(location.pathname), value: [minPrice, maxPrice]
            }))
            setValue([minPrice, maxPrice])
        }
    }, [clearFilters])

    useEffect(() => {
        // if (firstUpdate.current) {
        //     firstUpdate.current = false;
        //     return;
        // }
        if (value[0] !== minPrice || value[1] !== maxPrice) {
            setIsPriceChanged(true);
        }
        dispatch(setPageSelectedPrice({
            key: getlastPartOfPath(location.pathname), value: value
        }))
    }, [debouncedValue])

    const valuetext = (value: number) => {
        return `Price ${value}`;
    }

    const handleChange = (event: Event, newValue: number | number[]) => {
        setValue(newValue as number[])
    }

    const renderPriceRange = useMemo(() => {
        return (
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
        )
    }, [value, minPrice, maxPrice, handleChange, valuetext])
    return (
        <Box className="PriceRangeWrapper Divider">
            <Typography className="PriceRange">Price Range</Typography>
            <Typography variant="subtitle1">{`$${value[0]} - $${value[1]}`}</Typography>
            {renderPriceRange}
            {/* <Typography className="AveragePrice" variant="body2">Average price: $41</Typography> */}
        </Box>
    )
}

export default React.memo(PriceSlider)