import React from "react"
import { Backdrop, Stack } from "@mui/material"

// Assets
import LogoSmall from "@/assets/logos/logo-small.svg"
import BmkLogo from "@/assets/logos/bmk-spinning-Logo.svg"
interface LoaderProps {
  open: boolean
}

const Loader = (props: LoaderProps) => {
  const { open } = props
  return (
    <Backdrop open={open} id="Loader">
      <Stack className="Wrapper">
        <img src={process.env.GATSBY_THEME_TYPE === "1" ? BmkLogo: LogoSmall} />
      </Stack>
    </Backdrop>
  )
}

export default Loader
