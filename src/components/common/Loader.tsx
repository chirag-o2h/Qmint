import React from "react"
import { Backdrop, Stack } from "@mui/material"

// Assets
import LogoSmall from "@/assets/logos/logo-small.svg"
import BmkLogo from "@/assets/logos/bmk-spinning-Logo.svg"
import Birsbullion from "@/assets/logos/birsbullion.svg"
import { useAppSelector } from "@/hooks"
interface LoaderProps {
  open: boolean
}
function givemethelogoasperStorecode(code: string) {
  switch (code) {
    case "8":
      return Birsbullion;
    case "25":
      return BmkLogo;
    case "24":
      return LogoSmall;
    default:
      return LogoSmall; // fallback to a default logo if code doesn't match
  }
}
const Loader = (props: LoaderProps) => {
  const configDetails = useAppSelector((state) => state.homePage.configDetails)
  console.log("🚀 ~ Loader ~ configDetails:", configDetails)
  const { open } = props
  const logo = givemethelogoasperStorecode(process.env.GATSBY_STORE_CODE!);
  return (
    <Backdrop open={open} id="Loader">
      <Stack className="Wrapper">
        <img src={configDetails?.Store_Spinning_Loader_Logo
          ?.value} alt="***" />
      </Stack>
    </Backdrop>
  )
}

export default React.memo(Loader)
