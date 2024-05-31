import React from "react"
import { Container, Stack, Typography, Link, Divider } from "@mui/material"
import { useAppSelector } from "@/hooks"

function CopyRight() {
  const { configDetails } = useAppSelector((state) => state.homePage)

  return (
    <Container className="CopyRightWrapper">
      <Divider />
      <Stack className="CopyRightContent">
        <Typography className="CopyRightText">{configDetails?.["Footer_Copyright_Text"]?.value ?? "Copyright © 2024 Queensland Mint. All rights reserved.*"}</Typography>
        {/* <Stack className="PolicyWrapper">
          <Link href="#" color="inherit">Terms</Link>
          <Link href="#" color="inherit">Privacy</Link>
          <Link href="#" color="inherit">Cookies</Link>
        </Stack> */}
      </Stack>
    </Container>
  )
}

export default React.memo(CopyRight)