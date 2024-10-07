import React from 'react'
import { Link, Typography, Card, CardContent, CardActions, Button, Stack, Box, IconButton } from "@mui/material"

// Assets
import { BlueFacebookIcon, TwitterBirdIcon, InstagramIcon, YouTubeTextIcon, GoogleIcon, WorldIcon } from "../../../assets/icons/index"
import { useAppSelector } from '@/hooks';

function SocialNetwork() {
  const contactUsConfiguration = useAppSelector(state => state.contactUs.html);

  const linksHtmlValue = contactUsConfiguration?.["SocialNetworkIconHtml"]?.value || "";
  const headingHtmlvalue = contactUsConfiguration?.["SocialNetworkHeading"]?.value || "";

  return (
    <>
      <Box id="SocialNetwork" className="SocialNetworkWrapper">
        <Typography variant="h4" component="h2" className="SocialNetworkTitle Title" dangerouslySetInnerHTML={{
          __html: headingHtmlvalue
        }} />
        <Stack className="SocialMediaHandler" dangerouslySetInnerHTML={{
          __html: linksHtmlValue
        }} >
          {/* <IconButton className='SocialMediaLink' target={"_blank"} href="#"><BlueFacebookIcon /></IconButton>
          <IconButton className='SocialMediaLink' target={"_blank"} href="#"><TwitterBirdIcon /></IconButton>
          <IconButton className='SocialMediaLink' target={"_blank"} href="#"><InstagramIcon /></IconButton>
          <IconButton className='SocialMediaLink' target={"_blank"} href="#"><YouTubeTextIcon /></IconButton>
          <IconButton className='SocialMediaLink' target={"_blank"} href="#"><GoogleIcon /></IconButton>
          <IconButton className='SocialMediaLink' target={"_blank"} href="#"><WorldIcon /></IconButton> */}
        </Stack>
      </Box>
    </>
  )
}

export default SocialNetwork