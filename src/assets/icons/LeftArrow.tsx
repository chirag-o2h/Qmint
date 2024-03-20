import React from 'react'
import { SvgIcon, type SvgIconProps } from '@mui/material'


function LeftArrow(props: SvgIconProps) {
    return (
        <SvgIcon width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 3L5 8L10 13" fill='none' stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </SvgIcon>
    )
}

export default LeftArrow