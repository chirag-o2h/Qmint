import React, { useState, useEffect } from "react";
import {
  Stack,
  Box,
  Typography,
  IconButton,
  Link,
  Container,
  Breadcrumbs,
  Icon,
  Button
} from "@mui/material";
import classNames from "classnames";
import * as variable from "../../scss/settings/variables.module.scss";
import { CountryCode, parsePhoneNumberFromString } from 'libphonenumber-js';

// Assets
import {
  ChevronUp,
  ChevronDown,
  ChevronRight,
  ArrowLeft,
  ArrowRight,
  ContainedCheckIcon,
  ContainedCrossIcon,
  TimerIcon,
  ChevronUpRounded,
  PlusIcon
} from "../../assets/icons/index";
import useRemainingTime from "@/hooks/useRemainingTime";
import { navigate } from "gatsby";
import CountDownTimer from "../partials/productDetail/CountDownTImer";
import { roundOfThePrice } from "@/utils/common";
import { STORE_CODE, THEME_TYPE } from "@/axiosfolder";
interface Iprops {
  name: string;
  value: number;
  charturl?: string;
  status: boolean;
  percentage: number;
  move: any;
  isItForBullionMark: boolean;
  tickerStyle?: {
    tickertype?: string;
    tickerboxfontcolor?: string;
  };
}

interface SectionHeading {
  title: string
  description: string
}interface BullionmarkSectionHeading {
  title?: string
  description?: string
}

interface ProductStockStatus {
  availability: string
  colorClass?: string
  iconClass?: string
}
interface BmkProductStockStatus {
  availability: string
}


export const isValidPhoneNumber = (phoneNumber: string, country: string) => {
  try {
    const phoneNumberObj = parsePhoneNumberFromString("+" + phoneNumber, country.toUpperCase() as CountryCode);

    if (phoneNumberObj && phoneNumberObj.isValid()) {
      return true;
    }
  } catch (error) {
    // Handle any errors
  }
  return false;
}

export const StockReturnWithName = React.memo(
  ({ name, value, charturl, status, percentage, tickerStyle, move, isItForBullionMark }: Iprops) => {
    const containerWidth = Math.max(...[(move?.toString()?.length || 0), 4]) * 10;
    return (
      <Stack
        className={classNames(
          "StockReturnWithName",
          [status ? "Profit" : "Loss"],
          [tickerStyle?.tickertype === "Boxes" ? "Boxes" : "Text"]
        )}
      >
        <Typography variant="overline" component="span" className="Name">
          {name} {value}
        </Typography>
        <Stack
          className={classNames("StockReturn")}
          sx={{
            color: tickerStyle?.tickerboxfontcolor,
            backgroundColor: tickerStyle?.tickertype
              ? tickerStyle?.tickertype
              : null,
          }}
        >
          <Box className="FlipContainer"
            width={containerWidth}
          // marginRight={name === "AUD/USD" ? "8px" : "0px"}
          >
            <Box className="Flipper">
              <Typography variant="body2" component="span" className="Value Front">{roundOfThePrice(percentage)}%</Typography>
              <Typography variant="body2" component="span" className="Value Back">{name == "GOLD/SILVER RATIO" ? "" : "$"}{name === "AUD/USD" ? move : roundOfThePrice(move)}</Typography>
            </Box>
          </Box>
          {status ? <ChevronUp /> : <ChevronDown />}
        </Stack>
        {!isItForBullionMark && <img alt="ChartImage" src={charturl} width={90} height={20} />}
      </Stack>
    );
  }
);
export const AfterStockReturnWithName = React.memo(({ text }: any) => {
  return (
    <Stack
      className={classNames("StockReturnWithName", "AfterStockReturnWithName", [
        text ? "Profit" : "Loss",
      ])}
    >
      <Typography variant="overline" component="span" className="Name" dangerouslySetInnerHTML={{ __html: text }}>
      </Typography>
    </Stack>
  );
});
export const SwiperNavigation = React.memo(({ handleSlideChange, classNamePrev, classNameNext }: { handleSlideChange?: any, classNamePrev?: string, classNameNext?: string }) => {
  return (
    <Stack className="SwiperNavigation">
      <IconButton className={classNames("SwiperButton SwiperButtonPrev", classNamePrev)} onClick={() => {
        if (handleSlideChange) {
          handleSlideChange()
        }
      }}>
        <ArrowLeft />
      </IconButton>
      <IconButton className={classNames("SwiperButton SwiperButtonNext", classNameNext)} onClick={() => {
        if (handleSlideChange) {
          handleSlideChange()
        }
      }}>
        <ArrowRight />
      </IconButton>
    </Stack>
  );
});

export const SectionHeading = React.memo(({ title, description }: SectionHeading) => {
  return (
    <Box className="SectionHeading">
      <Typography variant="h2" component="h2" className="Title">
        {title}
      </Typography>
      <Typography className="Description">{description}</Typography>
    </Box>
  );
});
export const BullionmarkSectionHeading = React.memo(({ title, description }: BullionmarkSectionHeading) => {
  return (
    <Box className="BullionmarkSectionHeading">
      {title && <Typography variant="h2" component="h2" className="Title">{title}</Typography>}
      {description && <Typography className="Description" dangerouslySetInnerHTML={{
                  __html: description}} >{}</Typography>}
    </Box>
  );
});

export const PageTitle = React.memo(({ title, backToDashboard, maxWidth, redirectOnClick }: any) => {
  const handleBackToDashboard = () => {
    navigate('/my-vault')
  };

  return (
    <Box className="PageTitle">
      <Container maxWidth={maxWidth}>
        <Stack className="AllWrapper" justifyContent="space-between" alignItems="center">
          <Typography variant="h4" component="h2">{title}</Typography>
          {(redirectOnClick || backToDashboard) &&
            <Stack className="ButtonsWrapper">
              {!!redirectOnClick && <Button variant="contained" className="AddNewButton" startIcon={<PlusIcon />} onClick={redirectOnClick}>Add new</Button>}
              {backToDashboard && <Button className="BackToDashboard" onClick={handleBackToDashboard} startIcon={<ArrowLeft />}>Back To Dashboard</Button>}
            </Stack>
          }
        </Stack>
      </Container>
    </Box>
  );
});
export const Breadcrumb = React.memo(({ arr }: any) => {
  return (
    <Box className={classNames("Breadcrumb", { "BmkBreadcrumb": THEME_TYPE === "1" })}>
      <Container>
        <Breadcrumbs aria-label="breadcrumb" separator={<ChevronRight />}>
          <Link color="inherit" variant="body2" href="/shop" 
          // onClick={() => { navigate('/shop', { replace: true }) }}
          >
            Home
          </Link>
          {arr.map((item: any, index: any) => <Link key={index} color={true ? variable.dark : "inherit"} variant="body2" className={classNames({ "Active": arr.length === (index + 1) })} href={item.navigate}>
            {item.name}
          </Link>)
          }
          {/* {page2 ? (
            <Typography
              color={page2 && !page3 ? variable.dark : "inherit"}
              variant="body2"
            >
              {page2}
            </Typography>
          ) : (
            ""
          )} */}
          {/* {page3 ? (
            <Typography
              color={page3 ? variable.dark : "inherit"}
              variant="body2"
            >
              {page3}
            </Typography>
          ) : (
            ""
          )} */}
        </Breadcrumbs>
      </Container>
    </Box>
  );
});

export const ProductStockStatus = React.memo(
  ({ availability, colorClass, iconClass }: ProductStockStatus) => {
    return (
      <Stack
        className={classNames("ProductStockStatus", [
          availability !== "Sold Out" ? "Available" : "NotAvailable",
        ])}
      >
        {colorClass !== "red-circle" ? (
          <ContainedCheckIcon />
        ) : (
          <ContainedCrossIcon />
        )}
        <Typography className="Message">
          {availability}
        </Typography>
      </Stack>
    );
  }
);

export const BmkProductStockStatus = React.memo(
  ({ availability }: ProductStockStatus) => {
    return (
      <Box className={classNames("BmkProductStockStatus", [
        availability !== "Sold Out" ? "Available" : "NotAvailable",
      ])}>
        <Typography className="Message">
          {availability}
        </Typography>
      </Box>
    );
  }
);


export const LinkWithIcon = React.memo(({ icon, href, text }: any) => {
  return (
    <Link className="LinkWithIcon" onClick={() => {
      navigate(href, { replace: true })
    }}>
      <IconButton color="secondary" LinkComponent="div" className="IconWrapper" href="#">{icon}</IconButton>
      <Typography color="inherit" variant="overline" component="span">
        {text}
      </Typography>
    </Link>
  );
});

export const ProductUpdateCountdown = React.memo((props: { needToShowText?: boolean | undefined }) => {
  const { remainingTime } = useRemainingTime()
  return (
    <Stack className="ProductUpdateCountdown">
      <CountDownTimer />
      {props?.needToShowText == undefined && <Typography variant="bodySmall">Updates in {remainingTime} Sec</Typography>}
    </Stack>
  )
})


export const PriceChangeReturn = React.memo(({ percentage }: { percentage: string }) => {
  return (
    <Stack className={classNames("PriceChangeReturn", [Number(percentage) === 0 ? "Nuetral" : Number(percentage) > 0 ? "Success" : "Error"])}>
      <ChevronUpRounded />
      <Typography>{percentage}%</Typography>
    </Stack >
  )
})

export const TextFlipAnimation = React.memo(({ frontValue, backValue }: { frontValue: string, backValue: string }) => {
  const containerWidth = Math.max(frontValue.length, backValue.length) * 10;

  return (
    <Box className="TextFlipAnimation"
      width={containerWidth}
    >
      <Typography className="Flipper">
        <Typography variant="inherit" component="span" className="Value Front">{frontValue}</Typography>
        <Typography variant="inherit" component="span" className="Value Back">{backValue}</Typography>
      </Typography>
    </Box>
  )
})

export function isActionRejected(str: string): boolean {
  const parts = str.split("/");
  const state = parts[parts.length - 1];
  return state === "rejected";
}
// export function generateGUID() {
//   let uniqueId = localStorage?.getItem("uniqueSessionId");

//   if (!uniqueId) {
//     uniqueId = "xxxxxxxx-xxxx-yxxx-yxxx-xxxxxxxxxxxx".replace(
//       /[xy]/g,
//       function (c) {
//         const r = (Math.random() * 16) | 0;
//         const v = c === "x" ? r : (r & 0x3) | 0x8;
//         return v.toString(16);
//       }
//     );

//     localStorage?.setItem("uniqueSessionId", uniqueId);
//   }

//   return uniqueId;
// }
export function generateGUID() {
  if (typeof window === 'undefined') {
    // Running on the server side, generate a new GUID without using localStorage
    return "xxxxxxxx-xxxx-yxxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
      const r = (Math.random() * 16) | 0;
      const v = c === "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  } else {
    // Running on the client side, use localStorage
    let uniqueId = localStorage.getItem("uniqueSessionId");

    if (!uniqueId) {
      uniqueId = "xxxxxxxx-xxxx-yxxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
        const r = (Math.random() * 16) | 0;
        const v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      });

      localStorage.setItem("uniqueSessionId", uniqueId);
    }

    return uniqueId;
  }
}

// Helper function to check if an image URL is valid
export const checkImageUrl = (url:any) => {
  return new Promise((resolve) => {
      const img = new Image();
      img.src = url;
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
  });
};