import React from "react"
import { Container, Stack, Typography, Link, Divider } from "@mui/material"
import { useAppSelector } from "@/hooks"

function BullionmarkCopyRight() {
    const { configDetails: configDetailsState} = useAppSelector((state) => state.homePage)

    return (
        <Container className="BullionmarkCopyRightWrapper">
            <Divider />
            <Stack className="CopyRightContent">
                <Typography className="CopyRightText">{configDetailsState?.Footer_Copyright_Text?.value}</Typography>
                {/* <Stack sx={{
                    gap: "16px",
                }} className="PolicyWrapper">
                    <Link href="#" color="inherit">Terms</Link>
                    <Link href="#" color="inherit">Privacy</Link>
                    <Link href="#" color="inherit">Cookies</Link>
                </Stack> */}
            </Stack>
        </Container>
    )
}

export default BullionmarkCopyRight