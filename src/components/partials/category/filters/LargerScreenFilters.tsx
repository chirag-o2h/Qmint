import React, { useMemo } from 'react'
import { Accordion, AccordionDetails, AccordionSummary, Box, List, Divider, Button } from "@mui/material"
import SortBy from './SortBy'
import PriceSlider from './PriceSlider'
import RenderCheckboxField from './RenderCheckboxField'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { setClearFilters } from '@/redux/reducers/categoryReducer'
import { categoryData } from '@/types/categoryData'
interface props {
    renderList: (data: any) => any,
    // selectedFilters: { [key: string]: string[] },
    // setSelectedFilters?: any,
    // setSelectedPrice: any,
    setIsPriceChanged: any,
    pagesSelectedFilters: any,
    categoryData: categoryData
    // selectedPrice: number[] | null
}

const LargerScreenFilters = ({ renderList, setIsPriceChanged, pagesSelectedFilters ,categoryData}: props) => {
    // console.log("🚀 ~ LargerScreenFilters ~ selectedFilters:", selectedFilters)
    // const searchParams = useMemo(() => new URLSearchParams(window.location.search), [window.location.search])
    const dispatch = useAppDispatch();
    // const categoryData = useAppSelector(state => state.category)

    const clearFiltersHandler = () => {
        dispatch(setClearFilters(true));
    }

    return (
        <Box className="CategoryFilters">
            {categoryData.items && <Box sx={{ padding: '16px 14px 0', textAlign: 'center' }}>
                <Button variant="outlined" onClick={clearFiltersHandler}>Clear Filter</Button>
            </Box>}
            {categoryData.categories.length > 0 && <Box className="CategoriesWrapper">
                <Accordion defaultExpanded>
                    <AccordionSummary
                        id="Categories-header"
                        aria-controls="Categories-content"
                    >
                        Categories
                    </AccordionSummary>
                    <AccordionDetails>
                        <Box className="ScrollbarWrapper">
                            <List className="ScrollbarBlue">
                                {renderList(categoryData.categories)}
                            </List>
                        </Box>
                    </AccordionDetails>
                </Accordion>
            </Box>}
            {categoryData.items && categoryData.items.length > 0 && <Box className="SortByWrapper">
                <Divider />
                <Accordion >
                    <AccordionSummary
                        id="Categories-header"
                        aria-controls="Categories-content"
                    >
                        Sort By
                    </AccordionSummary>
                    <AccordionDetails>
                        <SortBy />
                    </AccordionDetails>
                </Accordion>
            </Box>}
            <Box className="FilterByWrapper">
                {categoryData.price && <PriceSlider minPrice={categoryData?.price?.minPrice} maxPrice={categoryData?.price?.maxPrice} setIsPriceChanged={setIsPriceChanged} pagesSelectedFilters={pagesSelectedFilters} />}
                {Object.keys(categoryData.specifications).map((filter: any, index: number) => (
                    <Accordion key={filter} className="Divider">
                        <AccordionSummary
                            id={`${filter}-header`}
                            aria-controls={`${filter}-content`}
                        >
                            {filter}
                        </AccordionSummary>
                        <AccordionDetails>
                            <RenderCheckboxField
                                filter={filter}
                                options={(categoryData.specifications[filter as keyof typeof categoryData.specifications] as any[]).map((item, index) => {
                                    return (
                                        {
                                            id: index,
                                            value: item,
                                            label: item,
                                            disabled: false,
                                        }
                                    )
                                }
                                )}
                            />
                        </AccordionDetails>
                    </Accordion>
                ))}
            </Box>
        </Box>
    )
}

export default React.memo(LargerScreenFilters)