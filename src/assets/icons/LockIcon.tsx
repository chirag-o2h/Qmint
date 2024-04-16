import React from 'react'
import { SvgIcon, type SvgIconProps } from '@mui/material'

function LockIcon(props: SvgIconProps) {
  return (
    <SvgIcon
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_246_6)">
        <path d="M18.9796 8.64933H18.2988V6.41894C18.2988 2.87793 15.4748 0 12.0001 0C8.52548 0 5.70148 2.87793 5.70148 6.41894V8.64933H5.02068C3.35655 8.64933 2 10.0318 2 11.7277V20.9216C2 22.6175 3.35652 24 5.02068 24H18.9793C20.6434 24 22 22.6176 22 20.9216V11.7277C21.995 10.0318 20.6387 8.64933 18.9796 8.64933ZM7.60288 8.64933V6.41894C7.60288 3.94701 9.57465 1.93759 12.0003 1.93759C14.4259 1.93759 16.3976 3.94701 16.3976 6.41894V8.64933H7.59772H7.60288ZM3.90134 11.7277C3.90134 11.0956 4.40563 10.5868 5.02088 10.5868H18.9795C19.5998 10.5868 20.099 11.1007 20.099 11.7277V20.9167C20.099 21.5488 19.5897 22.0576 18.9745 22.0576H5.021C4.40072 22.0576 3.90147 21.5437 3.90147 20.9167L3.90134 11.7277Z" fill="currentColor" />
        <path d="M11.052 16.6253V18.0386C11.052 18.5731 11.4756 19.0048 12.0001 19.0048C12.5246 19.0048 12.9532 18.5731 12.9532 18.0386V16.6253C13.402 16.3067 13.6693 15.7876 13.6693 15.2326C13.6693 14.2972 12.9229 13.5367 12.0052 13.5367C11.0874 13.5367 10.341 14.2973 10.341 15.2326C10.341 15.7876 10.6083 16.3067 11.0571 16.6253H11.052Z" fill="currentColor" />
      </g>
      <defs>
        <clipPath id="clip0_246_6">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </SvgIcon>
  )
}

export default LockIcon