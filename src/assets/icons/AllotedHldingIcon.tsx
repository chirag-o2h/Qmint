import React from "react"
import { SvgIcon, type SvgIconProps } from "@mui/material"

function AllotedHldingIcon(props: SvgIconProps) {
  return (
    // <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
    //   <rect width="41" height="41" rx="10" fill="#FF1F1F" />
    //   <g clipPath="url(#clip0_267_37)">
    //     <path d="M22.5226 19.361C22.5226 18.8234 22.3114 18.338 21.9695 17.9785C22.8369 18.4849 23.4213 19.4259 23.4213 20.5002C23.4213 21.5745 22.8369 22.5155 21.9695 23.022C22.3114 22.6625 22.5226 22.1771 22.5226 21.6395C22.5226 20.8711 22.092 20.2021 21.4592 19.861H22.0226H22.5226V19.361ZM18.4847 21.6395C18.4847 22.1771 18.6958 22.6625 19.0378 23.022C18.1703 22.5155 17.5859 21.5745 17.5859 20.5002C17.5859 19.4259 18.1703 18.4849 19.0378 17.9785C18.6958 18.338 18.4847 18.8234 18.4847 19.361C18.4847 20.1293 18.9153 20.7983 19.5481 21.1395H18.9847H18.4847V21.6395ZM20.2441 21.3634C20.3291 21.3743 20.4157 21.38 20.5036 21.38C20.6464 21.38 20.7631 21.4967 20.7631 21.6395C20.7631 21.7822 20.6464 21.8989 20.5036 21.8989C20.3609 21.8989 20.2441 21.7822 20.2441 21.6395V21.3634ZM20.7631 19.637C20.6782 19.6261 20.5915 19.6205 20.5036 19.6205C20.3609 19.6205 20.2441 19.5037 20.2441 19.361C20.2441 19.2183 20.3609 19.1015 20.5036 19.1015C20.6464 19.1015 20.7631 19.2183 20.7631 19.361V19.637Z" stroke="white" />
    //     <path d="M21.3828 14.3659V10.0238C23.5686 10.2035 25.6163 11.0517 27.289 12.4699L24.2186 15.5406C23.3859 14.9141 22.4149 14.5118 21.3828 14.3659Z" stroke="white" />
    //     <path d="M13.2807 26.4779C11.8872 24.8004 11.1289 22.7099 11.1289 20.5004C11.1289 16.2259 13.9701 12.5641 18.0066 11.4616L18.3463 14.6885C15.933 15.5761 14.3061 17.8678 14.3061 20.5004C14.3061 21.8569 14.7401 23.1495 15.5423 24.2163L13.2807 26.4779Z" stroke="white" />
    //     <path d="M26.7014 20.5003C26.7014 19.6703 26.5349 18.8498 26.2148 18.0911L28.7134 15.9701C29.4781 17.3511 29.8786 18.9 29.8786 20.5003C29.8786 22.7098 29.1203 24.8002 27.7269 26.4775L25.4652 24.2158C26.2675 23.1494 26.7014 21.8571 26.7014 20.5003Z" stroke="white" />
    //     <mask id="path-6-inside-1_267_37" fill="white">
    //       <path d="M16.3242 30.6876C16.5741 30.7901 16.8274 30.882 17.0837 30.9659V26.8081L16.3242 27.8619V30.6876Z" />
    //     </mask>
    //     <path d="M16.3242 30.6876H15.3242V31.3582L15.9446 31.6127L16.3242 30.6876ZM17.0837 30.9659L16.7726 31.9163L18.0837 32.3456V30.9659H17.0837ZM17.0837 26.8081H18.0837V23.7103L16.2725 26.2234L17.0837 26.8081ZM16.3242 27.8619L15.513 27.2772L15.3242 27.5391V27.8619H16.3242ZM15.9446 31.6127C16.2199 31.7257 16.4963 31.8258 16.7726 31.9163L17.3949 30.0156C17.1585 29.9382 16.9283 29.8545 16.7038 29.7624L15.9446 31.6127ZM18.0837 30.9659V26.8081H16.0837V30.9659H18.0837ZM16.2725 26.2234L15.513 27.2772L17.1355 28.4466L17.895 27.3928L16.2725 26.2234ZM15.3242 27.8619V30.6876H17.3242V27.8619H15.3242Z" fill="white" mask="url(#path-6-inside-1_267_37)" />
    //     <mask id="path-8-inside-2_267_37" fill="white">
    //       <path d="M17.8438 25.7549V31.1833C18.0948 31.2456 18.3481 31.2988 18.6032 31.3432V25.8673C18.3826 25.7906 18.1662 25.7021 17.9569 25.5977L17.8438 25.7549Z" />
    //     </mask>
    //     <path d="M17.8438 25.7549L17.0321 25.1707L16.8438 25.4324V25.7549H17.8438ZM17.8438 31.1833H16.8438V31.9655L17.6029 32.1539L17.8438 31.1833ZM18.6032 31.3432L18.4317 32.3284L19.6032 32.5323V31.3432H18.6032ZM18.6032 25.8673H19.6032V25.1562L18.9316 24.9227L18.6032 25.8673ZM17.9569 25.5977L18.4035 24.7029L17.6423 24.323L17.1453 25.0135L17.9569 25.5977ZM16.8438 25.7549V31.1833H18.8438V25.7549H16.8438ZM17.6029 32.1539C17.8775 32.222 18.1539 32.28 18.4317 32.3284L18.7748 30.358C18.5422 30.3175 18.3121 30.2692 18.0846 30.2127L17.6029 32.1539ZM19.6032 31.3432V25.8673H17.6032V31.3432H19.6032ZM18.9316 24.9227C18.7444 24.8576 18.5683 24.7852 18.4035 24.7029L17.5103 26.4924C17.764 26.619 18.0208 26.7235 18.2748 26.8118L18.9316 24.9227ZM17.1453 25.0135L17.0321 25.1707L18.6554 26.3391L18.7685 26.1819L17.1453 25.0135Z" fill="white" mask="url(#path-8-inside-2_267_37)" />
    //     <mask id="path-10-inside-3_267_37" fill="white">
    //       <path d="M15.5663 30.344V28.9158L14.8281 29.9399C15.0689 30.085 15.3161 30.2183 15.5663 30.344Z" />
    //     </mask>
    //     <path d="M15.5663 30.344L15.1175 31.2376L16.5663 31.9653V30.344H15.5663ZM15.5663 28.9158H16.5663V25.8182L14.7551 28.331L15.5663 28.9158ZM14.8281 29.9399L14.0169 29.3552L13.382 30.2361L14.312 30.7965L14.8281 29.9399ZM16.5663 30.344V28.9158H14.5663V30.344H16.5663ZM14.7551 28.331L14.0169 29.3552L15.6394 30.5247L16.3776 29.5005L14.7551 28.331ZM14.312 30.7965C14.5797 30.9578 14.8503 31.1034 15.1175 31.2376L16.0152 29.4504C15.7819 29.3332 15.558 29.2122 15.3442 29.0834L14.312 30.7965Z" fill="white" mask="url(#path-10-inside-3_267_37)" />
    //     <mask id="path-12-inside-4_267_37" fill="white">
    //       <path d="M23.9219 30.9661C24.1782 30.8825 24.4315 30.7902 24.6814 30.6877V27.837L23.9219 26.7737V30.9661Z" />
    //     </mask>
    //     <path d="M23.9219 30.9661H22.9219V32.3438L24.2318 31.9168L23.9219 30.9661ZM24.6814 30.6877L25.061 31.6129L25.6814 31.3583V30.6877H24.6814ZM24.6814 27.837H25.6814V27.5165L25.4951 27.2557L24.6814 27.837ZM23.9219 26.7737L24.7356 26.1924L22.9219 23.6532V26.7737H23.9219ZM24.2318 31.9168C24.5098 31.8262 24.7865 31.7255 25.061 31.6129L24.3017 29.7626C24.0765 29.855 23.8466 29.9388 23.612 30.0153L24.2318 31.9168ZM25.6814 30.6877V27.837H23.6814V30.6877H25.6814ZM25.4951 27.2557L24.7356 26.1924L23.1081 27.3549L23.8676 28.4182L25.4951 27.2557ZM22.9219 26.7737V30.9661H24.9219V26.7737H22.9219Z" fill="white" mask="url(#path-12-inside-4_267_37)" />
    //     <mask id="path-14-inside-5_267_37" fill="white">
    //       <path d="M22.4023 25.8656V31.343C22.6575 31.2986 22.9108 31.2454 23.1618 31.1831V25.7106L23.0726 25.5857C22.8558 25.6947 22.6313 25.7858 22.4023 25.8656Z" />
    //     </mask>
    //     <path d="M22.4023 25.8656L22.0735 24.9212L21.4023 25.1549V25.8656H22.4023ZM22.4023 31.343H21.4023V32.5322L22.5739 32.3282L22.4023 31.343ZM23.1618 31.1831L23.4026 32.1537L24.1618 31.9653V31.1831H23.1618ZM23.1618 25.7106H24.1618V25.3902L23.9756 25.1294L23.1618 25.7106ZM23.0726 25.5857L23.8863 25.0045L23.3886 24.3076L22.6235 24.6922L23.0726 25.5857ZM21.4023 25.8656V31.343H23.4023V25.8656H21.4023ZM22.5739 32.3282C22.8517 32.2798 23.1281 32.2218 23.4026 32.1537L22.921 30.2126C22.6935 30.269 22.4634 30.3173 22.2308 30.3578L22.5739 32.3282ZM24.1618 31.1831V25.7106H22.1618V31.1831H24.1618ZM23.9756 25.1294L23.8863 25.0045L22.2589 26.1669L22.3481 26.2919L23.9756 25.1294ZM22.6235 24.6922C22.4538 24.7775 22.2711 24.8524 22.0735 24.9212L22.7312 26.8099C22.9916 26.7193 23.2577 26.6119 23.5217 26.4792L22.6235 24.6922Z" fill="white" mask="url(#path-14-inside-5_267_37)" />
    //     <mask id="path-16-inside-6_267_37" fill="white">
    //       <path d="M19.3633 31.448C19.6151 31.4738 19.8683 31.4912 20.1228 31.5V26.1653C19.8676 26.149 19.6139 26.1179 19.3633 26.0681V31.448Z" />
    //     </mask>
    //     <path d="M19.3633 31.448H18.3633V32.3506L19.2613 32.4427L19.3633 31.448ZM20.1228 31.5L20.0885 32.4994L21.1228 32.5349V31.5H20.1228ZM20.1228 26.1653H21.1228V25.2273L20.1866 25.1674L20.1228 26.1653ZM19.3633 26.0681L19.558 25.0872L18.3633 24.8501V26.0681H19.3633ZM19.2613 32.4427C19.5352 32.4708 19.8111 32.4899 20.0885 32.4994L20.1571 30.5006C19.9256 30.4926 19.6949 30.4767 19.4653 30.4532L19.2613 32.4427ZM21.1228 31.5V26.1653H19.1228V31.5H21.1228ZM20.1866 25.1674C19.97 25.1535 19.7604 25.1274 19.558 25.0872L19.1686 27.049C19.4674 27.1083 19.7651 27.1445 20.0589 27.1633L20.1866 25.1674ZM18.3633 26.0681V31.448H20.3633V26.0681H18.3633Z" fill="white" mask="url(#path-16-inside-6_267_37)" />
    //     <mask id="path-18-inside-7_267_37" fill="white">
    //       <path d="M20.8828 31.4998C21.1372 31.491 21.3905 31.4739 21.6423 31.4477V26.0671C21.3917 26.1169 21.138 26.1484 20.8828 26.1651V31.4998Z" />
    //     </mask>
    //     <path d="M20.8828 31.4998H19.8828V32.5347L20.9171 32.4992L20.8828 31.4998ZM21.6423 31.4477L21.7458 32.4424L22.6423 32.3491V31.4477H21.6423ZM21.6423 26.0671H22.6423V24.8491L21.4476 25.0863L21.6423 26.0671ZM20.8828 26.1651L20.8175 25.1672L19.8828 25.2284V26.1651H20.8828ZM20.9171 32.4992C21.1935 32.4897 21.4699 32.4711 21.7458 32.4424L21.5388 30.4531C21.3112 30.4768 21.081 30.4924 20.8485 30.5004L20.9171 32.4992ZM22.6423 31.4477V26.0671H20.6423V31.4477H22.6423ZM21.4476 25.0863C21.2442 25.1266 21.0341 25.1531 20.8175 25.1672L20.9481 27.163C21.2419 27.1437 21.5391 27.1071 21.837 27.048L21.4476 25.0863ZM19.8828 26.1651V31.4998H21.8828V26.1651H19.8828Z" fill="white" mask="url(#path-18-inside-7_267_37)" />
    //     <mask id="path-20-inside-8_267_37" fill="white">
    //       <path d="M25.4375 30.3438C25.6889 30.2177 25.9369 30.0841 26.1788 29.9382L25.4375 28.9004V30.3438Z" />
    //     </mask>
    //     <path d="M25.4375 30.3438H24.4375V31.964L25.8858 31.2377L25.4375 30.3438ZM26.1788 29.9382L26.695 30.7947L27.6207 30.2366L26.9925 29.357L26.1788 29.9382ZM25.4375 28.9004L26.2513 28.3192L24.4375 25.7797V28.9004H25.4375ZM25.8858 31.2377C26.1545 31.1029 26.426 30.9568 26.695 30.7947L25.6625 29.0818C25.4477 29.2113 25.2233 29.3325 24.9892 29.4499L25.8858 31.2377ZM26.9925 29.357L26.2513 28.3192L24.6237 29.4816L25.365 30.5194L26.9925 29.357ZM24.4375 28.9004V30.3438H26.4375V28.9004H24.4375Z" fill="white" mask="url(#path-20-inside-8_267_37)" />
    //   </g>
    //   <defs>
    //     <clipPath id="clip0_267_37">
    //       <rect width="22" height="22" fill="white" transform="translate(9.5 9.5)" />
    //     </clipPath>
    //   </defs>
    // </svg>
    <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clip-path="url(#clip0_267_39)">
        <path d="M13.5226 10.361C13.5226 9.82335 13.3114 9.33798 12.9695 8.97849C13.8369 9.48489 14.4213 10.4259 14.4213 11.5002C14.4213 12.5745 13.8369 13.5155 12.9695 14.022C13.3114 13.6625 13.5226 13.1771 13.5226 12.6395C13.5226 11.8711 13.092 11.2021 12.4592 10.861H13.0226H13.5226V10.361ZM9.48466 12.6395C9.48466 13.1771 9.69584 13.6625 10.0378 14.022C9.17034 13.5155 8.58594 12.5745 8.58594 11.5002C8.58594 10.4259 9.17034 9.48489 10.0378 8.97849C9.69584 9.33798 9.48466 9.82335 9.48466 10.361C9.48466 11.1293 9.91533 11.7983 10.5481 12.1395H9.98466H9.48466V12.6395ZM11.2441 12.3634C11.3291 12.3743 11.4157 12.38 11.5036 12.38C11.6464 12.38 11.7631 12.4967 11.7631 12.6395C11.7631 12.7822 11.6464 12.8989 11.5036 12.8989C11.3609 12.8989 11.2441 12.7822 11.2441 12.6395V12.3634ZM11.7631 10.637C11.6782 10.6261 11.5915 10.6205 11.5036 10.6205C11.3609 10.6205 11.2441 10.5037 11.2441 10.361C11.2441 10.2183 11.3609 10.1015 11.5036 10.1015C11.6464 10.1015 11.7631 10.2183 11.7631 10.361V10.637Z" stroke="#EAA22B" />
        <path d="M12.3828 5.36587V1.02377C14.5686 1.20351 16.6163 2.05165 18.289 3.46993L15.2186 6.54064C14.3859 5.91413 13.4149 5.51175 12.3828 5.36587Z" stroke="#EAA22B" />
        <path d="M4.28071 17.4779C2.88721 15.8004 2.12891 13.7099 2.12891 11.5004C2.12891 7.22592 4.97009 3.56412 9.00655 2.46158L9.34628 5.6885C6.93303 6.57614 5.3061 8.86779 5.3061 11.5004C5.3061 12.8569 5.7401 14.1495 6.54234 15.2163L4.28071 17.4779Z" stroke="#EAA22B" />
        <path d="M17.7014 11.5003C17.7014 10.6703 17.5349 9.84984 17.2148 9.09107L19.7134 6.97014C20.4781 8.3511 20.8786 9.89998 20.8786 11.5003C20.8786 13.7098 20.1203 15.8002 18.7269 17.4775L16.4652 15.2158C17.2675 14.1494 17.7014 12.8571 17.7014 11.5003Z" stroke="#EAA22B" />
        <mask id="path-5-inside-1_267_39" fill="#EAA22B">
          <path d="M7.32422 21.6876C7.57409 21.7901 7.82738 21.882 8.08371 21.9659V17.8081L7.32422 18.8619V21.6876Z" />
        </mask>
        <path d="M7.32422 21.6876H6.32422V22.3582L6.9446 22.6127L7.32422 21.6876ZM8.08371 21.9659L7.77255 22.9163L9.08371 23.3456V21.9659H8.08371ZM8.08371 17.8081H9.08371V14.7103L7.27245 17.2234L8.08371 17.8081ZM7.32422 18.8619L6.51296 18.2772L6.32422 18.5391V18.8619H7.32422ZM6.9446 22.6127C7.21985 22.7257 7.49626 22.8258 7.77255 22.9163L8.39486 21.0156C8.1585 20.9382 7.92833 20.8545 7.70384 20.7624L6.9446 22.6127ZM9.08371 21.9659V17.8081H7.08371V21.9659H9.08371ZM7.27245 17.2234L6.51296 18.2772L8.13548 19.4466L8.89496 18.3928L7.27245 17.2234ZM6.32422 18.8619V21.6876H8.32422V18.8619H6.32422Z" fill="#EAA22B" mask="url(#path-5-inside-1_267_39)" />
        <mask id="path-7-inside-2_267_39" fill="#EAA22B">
          <path d="M8.84375 16.7549V22.1833C9.09476 22.2456 9.34805 22.2988 9.60324 22.3432V16.8673C9.38261 16.7906 9.16615 16.7021 8.95691 16.5977L8.84375 16.7549Z" />
        </mask>
        <path d="M8.84375 16.7549L8.03214 16.1707L7.84375 16.4324V16.7549H8.84375ZM8.84375 22.1833H7.84375V22.9655L8.60294 23.1539L8.84375 22.1833ZM9.60324 22.3432L9.43171 23.3284L10.6032 23.5323V22.3432H9.60324ZM9.60324 16.8673H10.6032V16.1562L9.93163 15.9227L9.60324 16.8673ZM8.95691 16.5977L9.40348 15.7029L8.6423 15.323L8.1453 16.0135L8.95691 16.5977ZM7.84375 16.7549V22.1833H9.84375V16.7549H7.84375ZM8.60294 23.1539C8.87746 23.222 9.15388 23.28 9.43171 23.3284L9.77477 21.358C9.54223 21.3175 9.31206 21.2692 9.08456 21.2127L8.60294 23.1539ZM10.6032 22.3432V16.8673H8.60324V22.3432H10.6032ZM9.93163 15.9227C9.74439 15.8576 9.56831 15.7852 9.40348 15.7029L8.51035 17.4924C8.764 17.619 9.02083 17.7235 9.27484 17.8118L9.93163 15.9227ZM8.1453 16.0135L8.03214 16.1707L9.65536 17.3391L9.76852 17.1819L8.1453 16.0135Z" fill="#EAA22B" mask="url(#path-7-inside-2_267_39)" />
        <mask id="path-9-inside-3_267_39" fill="#EAA22B">
          <path d="M6.56635 21.344V19.9158L5.82812 20.9399C6.06888 21.085 6.3161 21.2183 6.56635 21.344Z" />
        </mask>
        <path d="M6.56635 21.344L6.11751 22.2376L7.56635 22.9653V21.344H6.56635ZM6.56635 19.9158H7.56635V16.8182L5.75512 19.331L6.56635 19.9158ZM5.82812 20.9399L5.0169 20.3552L4.38196 21.2361L5.31204 21.7965L5.82812 20.9399ZM7.56635 21.344V19.9158H5.56635V21.344H7.56635ZM5.75512 19.331L5.0169 20.3552L6.63935 21.5247L7.37757 20.5005L5.75512 19.331ZM5.31204 21.7965C5.57973 21.9578 5.85027 22.1034 6.11751 22.2376L7.01519 20.4504C6.78193 20.3332 6.55803 20.2122 6.34421 20.0834L5.31204 21.7965Z" fill="#EAA22B" mask="url(#path-9-inside-3_267_39)" />
        <mask id="path-11-inside-4_267_39" fill="#EAA22B">
          <path d="M14.9219 21.9661C15.1782 21.8825 15.4315 21.7902 15.6814 21.6877V18.837L14.9219 17.7737V21.9661Z" />
        </mask>
        <path d="M14.9219 21.9661H13.9219V23.3438L15.2318 22.9168L14.9219 21.9661ZM15.6814 21.6877L16.061 22.6129L16.6814 22.3583V21.6877H15.6814ZM15.6814 18.837H16.6814V18.5165L16.4951 18.2557L15.6814 18.837ZM14.9219 17.7737L15.7356 17.1924L13.9219 14.6532V17.7737H14.9219ZM15.2318 22.9168C15.5098 22.8262 15.7865 22.7255 16.061 22.6129L15.3017 20.7626C15.0765 20.855 14.8466 20.9388 14.612 21.0153L15.2318 22.9168ZM16.6814 21.6877V18.837H14.6814V21.6877H16.6814ZM16.4951 18.2557L15.7356 17.1924L14.1081 18.3549L14.8676 19.4182L16.4951 18.2557ZM13.9219 17.7737V21.9661H15.9219V17.7737H13.9219Z" fill="#EAA22B" mask="url(#path-11-inside-4_267_39)" />
        <mask id="path-13-inside-5_267_39" fill="#EAA22B">
          <path d="M13.4023 16.8656V22.343C13.6575 22.2986 13.9108 22.2454 14.1618 22.1831V16.7106L14.0726 16.5857C13.8558 16.6947 13.6313 16.7858 13.4023 16.8656Z" />
        </mask>
        <path d="M13.4023 16.8656L13.0735 15.9212L12.4023 16.1549V16.8656H13.4023ZM13.4023 22.343H12.4023V23.5322L13.5739 23.3282L13.4023 22.343ZM14.1618 22.1831L14.4026 23.1537L15.1618 22.9653V22.1831H14.1618ZM14.1618 16.7106H15.1618V16.3902L14.9756 16.1294L14.1618 16.7106ZM14.0726 16.5857L14.8863 16.0045L14.3886 15.3076L13.6235 15.6922L14.0726 16.5857ZM12.4023 16.8656V22.343H14.4023V16.8656H12.4023ZM13.5739 23.3282C13.8517 23.2798 14.1281 23.2218 14.4026 23.1537L13.921 21.2126C13.6935 21.269 13.4634 21.3173 13.2308 21.3578L13.5739 23.3282ZM15.1618 22.1831V16.7106H13.1618V22.1831H15.1618ZM14.9756 16.1294L14.8863 16.0045L13.2589 17.1669L13.3481 17.2919L14.9756 16.1294ZM13.6235 15.6922C13.4538 15.7775 13.2711 15.8524 13.0735 15.9212L13.7312 17.8099C13.9916 17.7193 14.2577 17.6119 14.5217 17.4792L13.6235 15.6922Z" fill="#EAA22B" mask="url(#path-13-inside-5_267_39)" />
        <mask id="path-15-inside-6_267_39" fill="#EAA22B">
          <path d="M10.3633 22.448C10.6151 22.4738 10.8683 22.4912 11.1228 22.5V17.1653C10.8676 17.149 10.6139 17.1179 10.3633 17.0681V22.448Z" />
        </mask>
        <path d="M10.3633 22.448H9.36328V23.3506L10.2613 23.4427L10.3633 22.448ZM11.1228 22.5L11.0885 23.4994L12.1228 23.5349V22.5H11.1228ZM11.1228 17.1653H12.1228V16.2273L11.1866 16.1674L11.1228 17.1653ZM10.3633 17.0681L10.558 16.0872L9.36328 15.8501V17.0681H10.3633ZM10.2613 23.4427C10.5352 23.4708 10.8111 23.4899 11.0885 23.4994L11.1571 21.5006C10.9256 21.4926 10.6949 21.4767 10.4653 21.4532L10.2613 23.4427ZM12.1228 22.5V17.1653H10.1228V22.5H12.1228ZM11.1866 16.1674C10.97 16.1535 10.7604 16.1274 10.558 16.0872L10.1686 18.049C10.4674 18.1083 10.7651 18.1445 11.0589 18.1633L11.1866 16.1674ZM9.36328 17.0681V22.448H11.3633V17.0681H9.36328Z" fill="#EAA22B" mask="url(#path-15-inside-6_267_39)" />
        <mask id="path-17-inside-7_267_39" fill="#EAA22B">
          <path d="M11.8828 22.4998C12.1372 22.491 12.3905 22.4739 12.6423 22.4477V17.0671C12.3917 17.1169 12.138 17.1484 11.8828 17.1651V22.4998Z" />
        </mask>
        <path d="M11.8828 22.4998H10.8828V23.5347L11.9171 23.4992L11.8828 22.4998ZM12.6423 22.4477L12.7458 23.4424L13.6423 23.3491V22.4477H12.6423ZM12.6423 17.0671H13.6423V15.8491L12.4476 16.0863L12.6423 17.0671ZM11.8828 17.1651L11.8175 16.1672L10.8828 16.2284V17.1651H11.8828ZM11.9171 23.4992C12.1935 23.4897 12.4699 23.4711 12.7458 23.4424L12.5388 21.4531C12.3112 21.4768 12.081 21.4924 11.8485 21.5004L11.9171 23.4992ZM13.6423 22.4477V17.0671H11.6423V22.4477H13.6423ZM12.4476 16.0863C12.2442 16.1266 12.0341 16.1531 11.8175 16.1672L11.9481 18.163C12.2419 18.1437 12.5391 18.1071 12.837 18.048L12.4476 16.0863ZM10.8828 17.1651V22.4998H12.8828V17.1651H10.8828Z" fill="#EAA22B" mask="url(#path-17-inside-7_267_39)" />
        <mask id="path-19-inside-8_267_39" fill="#EAA22B">
          <path d="M16.4375 21.3438C16.6889 21.2177 16.9369 21.0841 17.1788 20.9382L16.4375 19.9004V21.3438Z" />
        </mask>
        <path d="M16.4375 21.3438H15.4375V22.964L16.8858 22.2377L16.4375 21.3438ZM17.1788 20.9382L17.695 21.7947L18.6207 21.2366L17.9925 20.357L17.1788 20.9382ZM16.4375 19.9004L17.2513 19.3192L15.4375 16.7797V19.9004H16.4375ZM16.8858 22.2377C17.1545 22.1029 17.426 21.9568 17.695 21.7947L16.6625 20.0818C16.4477 20.2113 16.2233 20.3325 15.9892 20.4499L16.8858 22.2377ZM17.9925 20.357L17.2513 19.3192L15.6237 20.4816L16.365 21.5194L17.9925 20.357ZM15.4375 19.9004V21.3438H17.4375V19.9004H15.4375Z" fill="#EAA22B" mask="url(#path-19-inside-8_267_39)" />
      </g>
      <defs>
        <clipPath id="clip0_267_39">
          <rect width="22" height="22" fill="#EAA22B" transform="translate(0.5 0.5)" />
        </clipPath>
      </defs>
    </svg>
  )
}

export default AllotedHldingIcon
