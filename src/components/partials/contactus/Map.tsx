import { useAppSelector } from '@/hooks'
import { Box } from '@mui/material'
import React from 'react'

const Map = () => {
    const contactUsConfiguration = useAppSelector(state => state.contactUs.html);

    const htmlValue = contactUsConfiguration?.["MapSectionHtml"]?.value || "";

    return (
        <Box className="GetInTouchRightMap" dangerouslySetInnerHTML={{
            __html: htmlValue
        }} />
    )
}

export default Map