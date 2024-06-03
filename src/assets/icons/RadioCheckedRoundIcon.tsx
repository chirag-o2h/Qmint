import React from "react"
import { SvgIcon, type SvgIconProps } from "@mui/material"

function RadioCheckedRoundIcon(props: SvgIconProps) {
  return (
    <SvgIcon
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="11" cy="11" r="11" fill="currentColor"/>
      <path d="M10.0518 15.1885C9.06078 14.1958 8.07585 13.194 7.08182 12.2014C6.97272 12.0921 6.97272 11.91 7.08182 11.8007L8.22434 10.6562C8.33344 10.5469 8.51528 10.5469 8.62438 10.6562L10.2578 12.2924L14.4582 8.08196C14.5703 7.97268 14.7491 7.97268 14.8613 8.08196L16.0068 9.22945C16.1189 9.34177 16.1189 9.52087 16.0068 9.63016L10.4518 15.1885C10.3427 15.3008 10.1639 15.3008 10.0518 15.1885Z" fill="white"/>
    </SvgIcon>
  )
}

export default RadioCheckedRoundIcon