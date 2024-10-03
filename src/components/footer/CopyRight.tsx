import React from "react"
import { Container, Stack, Typography, Link, Divider,IconButton } from "@mui/material"
import { useAppSelector } from "@/hooks"

import { MapIcon, MailIcon, FacebookIcon, YoutubeIcon, TwitterIcon, FeedIcon, ChevronRight, InstagramIcon1 } from "../../assets/icons/index"
import { ENDPOINTS } from "@/utils/constants"
import { getFooterLinks } from "@/redux/reducers/homepageReducer"
import useAPIoneTime from "@/hooks/useAPIoneTime"

function CopyRight() {
  const { configDetails: configDetailsState } = useAppSelector((state) => state.homePage)
  useAPIoneTime({ service: getFooterLinks, endPoint: ENDPOINTS.getFooterLink, needLoadingorNot:false })


  return (
    <Container className="CopyRightWrapper">
      <Divider />
      <Stack className="BottomWrapper">
        <Stack className="CopyRightContent">
          <Typography className="CopyRightText">{configDetailsState?.["Footer_Copyright_Text"]?.value ?? "Copyright © 2024 Queensland Mint. All rights reserved.*"}</Typography>
          {/* <Stack className="PolicyWrapper">
            <Link href="#" color="inherit">Terms</Link>
            <Link href="#" color="inherit">Privacy</Link>
            <Link href="#" color="inherit">Cookies</Link>
          </Stack> */}
        </Stack>
        <Stack className="NewsletterPart">
          {/* <Typography className="MenuTitle" variant="subtitle2" component="p">Social Media</Typography> */}
          {/* <Box className="Content">
            <Typography className="InfoMessage" variant="overline">Stay up to date with our latest news.</Typography>
            <Stack className="FieldWrapper">
              props i have removed
              <TextField type="email" className="EmailField" placeholder="Your Email Address" value={email} onChange={handleEmailChange} />
              <Button name='subscribe' aria-label='subscribe' className="SubscribeButton" variant="contained" onClick={subscribe}>Subscribe</Button>
            </Stack>
            <Typography className="ConsentMessage" variant="body2">Your email is safe with us, we don't spam</Typography>
          </Box> */}
          <Stack className="SocialWrapper">
            <IconButton title="Follow us on Facebook" target={"_blank"} href={configDetailsState?.SocialLinks_Facebook?.value ?? location?.href}><FacebookIcon fontSize="small" /></IconButton>
            <IconButton title="Follow us on Youtube" target={"_blank"} href={configDetailsState?.SocialLinks_Youtube?.value ?? location?.href}><YoutubeIcon /></IconButton>
            <IconButton title="Follow us on Twitter" target={"_blank"} href={configDetailsState?.SocialLinks_Twitter?.value ?? location?.href}><TwitterIcon fontSize="small" /></IconButton>
            <IconButton title="Follow us on Instagram" target={"_blank"} href={configDetailsState?.SocialLinks_Instagram?.value ?? location?.href}><InstagramIcon1 fontSize="small" /></IconButton>
            {/* <IconButton title="Follow us on Feed" target={"_blank"} href={configDetailsState?.feedIcon?.value ?? location?.href}><FeedIcon /></IconButton> */}
          </Stack>
        </Stack>
      </Stack>
    </Container>
  )
}

export default React.memo(CopyRight)