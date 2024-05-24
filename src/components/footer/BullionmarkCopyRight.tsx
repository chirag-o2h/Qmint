import React from "react"
import { Container, Stack, Typography, Link, Divider } from "@mui/material"
import { useAppSelector } from "@/hooks"

function BullionmarkCopyRight() {

    return (
        <Container className="BullionmarkCopyRightWrapper">
            <Divider />
            <Stack className="CopyRightContent">
                <Typography className="CopyRightText">Copyright © 2024 Bullionmark. All rights reserved.</Typography>
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