import React from 'react'
import { Box, Container, Stack, Typography, List, ListItem, ListItemButton, IconButton, } from "@mui/material"
import { navigate, Link as GatsbyLink } from "gatsby";

// Assets
import { LinkedinIcon, FacebookIcon, InstagramIcon1, YoutubeIcon, Map4Icon, PhoneCall1Icon,TwitterIcon } from '@/assets/icons'

// Hooks
import { useAppSelector } from "@/hooks"

// Components
import BullionmarkCopyRight from './BullionmarkCopyRight'
import { navigationItems } from '@/utils/data';

function BullionmarkFooter() {
  const { configDetails: configDetailsState, bullionMarkPage } = useAppSelector((state) => state.homePage)

  return (
    <Box id="BullionmarkFooterSection" className='BullionmarkGeneralFooter' component="footer">
      <Container className="Container">
        <Stack className="FooterWrapper">
          <Stack className="LogoPart">
            <GatsbyLink to="/" style={{ cursor: 'pointer' }}>
              <img src={configDetailsState?.Homepage_FooterLogo_URL?.value} alt="Bullionmark Footer logo" loading="lazy" />
            </GatsbyLink>
            <Box className="MenuWrapper ContactUs">
              <Stack className="ItemWrapper">
                <Stack className="Item">
                  <Map4Icon />
                  <Typography>{configDetailsState?.Store_Address?.value}</Typography>
                </Stack>
                <Stack className="Item">
                  <PhoneCall1Icon />
                  <GatsbyLink to={`tel:${configDetailsState?.StorePhoneNumber_AU?.value}`}>{configDetailsState?.StorePhoneNumber_AU?.value}</GatsbyLink>
                </Stack>
              </Stack>
            </Box>
          </Stack>
          {navigationItems.map((navigation) => {
            return (
              <Box className="MenuWrapper QuickLink">
                <Typography className="MenuTitle" variant="subtitle2" component="p">{navigation.title}</Typography>
                <List>
                  {navigation.menues.map((item) => {
                    return (
                      <ListItem key={item}>
                        <ListItemButton onClick={() => navigate(`${item}`)}>{item}</ListItemButton>
                      </ListItem>
                    )
                  })}
                </List>
              </Box>
            )
          })}
          <Box className="MenuWrapper Social">
            <Typography className="MenuTitle" variant="subtitle2" component="p">Social Media</Typography>
            <Stack className="SocialMedia">
              <IconButton title="Follow us on Facebook" target={"_blank"} href={configDetailsState?.SocialLinks_Facebook?.value ?? window?.location?.href}><FacebookIcon fontSize="small" /></IconButton>
              <IconButton title="Follow us on Instagram" target={"_blank"} href={configDetailsState?.SocialLinks_Instagram?.value ?? window?.location?.href}><InstagramIcon1 fontSize="small" /></IconButton>
              <IconButton title="Follow us on Youtube" target={"_blank"} href={configDetailsState?.SocialLinks_Youtube?.value ?? window?.location?.href}><YoutubeIcon /></IconButton>
              <IconButton title="Follow us on Twitter" target={"_blank"} href={configDetailsState?.SocialLinks_Twitter?.value ?? window?.location?.href}><TwitterIcon fontSize="small" /></IconButton>
            </Stack>
          </Box>
        </Stack>
      </Container>
      <BullionmarkCopyRight />
    </Box>
  )
}

export default BullionmarkFooter