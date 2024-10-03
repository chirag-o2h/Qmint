import React from "react"
import { Container, Stack, Typography, Link, Divider,IconButton,Box } from "@mui/material"
import { useAppSelector } from "@/hooks"

// Assets
import { LinkedinIcon, FacebookIcon, InstagramIcon1, YoutubeIcon, Map4Icon, PhoneCall1Icon,TwitterIcon } from '@/assets/icons'

function BullionmarkCopyRight() {
    const { configDetails: configDetailsState} = useAppSelector((state) => state.homePage)

    return (
        <Container className="BullionmarkCopyRightWrapper">
            <Divider />
            <Stack className="BottomWrapper">
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
                <Box className="MenuWrapper Social">
                    {/* <Typography className="MenuTitle" variant="subtitle2" component="p">
                    Social Media
                    </Typography> */}
                    <Stack className="SocialMedia">
                    <IconButton
                        key="Facebook"
                        title="Follow us on Facebook"
                        target={"_blank"}
                        href={
                        configDetailsState?.SocialLinks_Facebook?.value ??
                        location?.href
                        }
                    >
                        <FacebookIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                        key="Instagram"
                        title="Follow us on Instagram"
                        target={"_blank"}
                        href={
                        configDetailsState?.SocialLinks_Instagram?.value ??
                        location?.href
                        }
                    >
                        <InstagramIcon1 fontSize="small" />
                    </IconButton>
                    <IconButton
                        key="Youtube"
                        title="Follow us on Youtube"
                        target={"_blank"}
                        href={
                        configDetailsState?.SocialLinks_Youtube?.value ??
                        location?.href
                        }
                    >
                        <YoutubeIcon />
                    </IconButton>
                    <IconButton
                        key="Twitter"
                        title="Follow us on Twitter"
                        target={"_blank"}
                        href={
                        configDetailsState?.SocialLinks_Twitter?.value ??
                        location?.href
                        }
                    >
                        <TwitterIcon fontSize="small" />
                    </IconButton>
                    </Stack>
                </Box>
            </Stack>
        </Container>
    )
}

export default BullionmarkCopyRight