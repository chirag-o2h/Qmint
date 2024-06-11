import React from "react"
import { SvgIcon, type SvgIconProps } from "@mui/material"

function ContainedCrossIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="14" height="14" rx="7" fill="#FF1F1F" />
        <path d="M7.81488 7.00059L9.83011 4.98536C10.0562 4.7604 10.0562 4.39602 9.83245 4.16989C9.6075 3.94376 9.24312 3.94376 9.01699 4.16755L9.01582 4.16872L7.00059 6.18395L4.98418 4.16989C4.75923 3.94493 4.39367 3.94493 4.16872 4.16989C3.94376 4.39485 3.94376 4.7604 4.16872 4.98536L6.18395 7.00059L4.16872 9.01582C3.94376 9.24077 3.94376 9.60633 4.16872 9.83128C4.39367 10.0562 4.75923 10.0562 4.98418 9.83128L6.99941 7.81605L9.01464 9.83128C9.2396 10.0562 9.60515 10.0562 9.83011 9.83128C10.0551 9.60633 10.0551 9.24077 9.83011 9.01582L7.81488 7.00059Z" fill="white" />
      </svg>
    </SvgIcon>
  )
}

export default ContainedCrossIcon