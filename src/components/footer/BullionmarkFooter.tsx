import React from 'react'
import { Box, Container, Stack, Typography, List, ListItem, ListItemButton, IconButton, Link, } from "@mui/material"
import { navigate, Link as GatsbyLink } from "gatsby";

// Assets
import { LinkedinIcon, FacebookIcon, InstagramIcon1, YoutubeIcon, Map4Icon, PhoneCall1Icon,TwitterIcon } from '@/assets/icons'

// Hooks
import { useAppSelector } from "@/hooks"

// Components
import BullionmarkCopyRight from './BullionmarkCopyRight'
import { navigationItems } from '@/utils/data';
import useAPIoneTime from '@/hooks/useAPIoneTime';
import { getFooterLinks } from '@/redux/reducers/homepageReducer';
import { ENDPOINTS } from '@/utils/constants';
import { useLocation } from '@reach/router';

function BullionmarkFooter() {
  const { configDetails: configDetailsState, bullionMarkPage } = useAppSelector((state) => state.homePage)
  useAPIoneTime({ service: getFooterLinks, endPoint: ENDPOINTS.getFooterLink, needLoadingorNot:false })
  const data = useAppSelector((state) => state.homePage.footerSections)
  const location = useLocation()
  return (
    <Box
      id="BullionmarkFooterSection"
      className="BullionmarkGeneralFooter"
      component="footer"
    >
      <Container className="Container">
        <Stack className="FooterWrapper">
          <Stack className="LogoPart">
            <Link href="/" style={{ cursor: "pointer" }}>
              <img
                src={configDetailsState?.BrandLogoURL_Footer?.value}
                alt="Bullionmark Footer logo"
                loading="lazy"
                fetchPriority='high'
              />
            </Link>
            <Box className="MenuWrapper ContactUs">
              <Stack className="ItemWrapper">
                <Stack className="Item">
                  <Map4Icon />
                  <Typography>
                    {configDetailsState?.Store_Address?.value}
                  </Typography>
                </Stack>
                <Stack className="Item">
                  <PhoneCall1Icon />
                  {/* <GatsbyLink to={`tel:${configDetailsState?.StorePhoneNumber_AU?.value}`}>{configDetailsState?.StorePhoneNumber_AU?.value}</GatsbyLink> */}
                  <Link
                    href={`tel:${configDetailsState?.StorePhoneNumber_AU?.value}`}
                  >
                    {configDetailsState?.StorePhoneNumber_AU?.value}
                  </Link>
                </Stack>
              </Stack>
            </Box>
          </Stack>
          <Stack className="MenuesPart" component="nav">
            {data?.map((menu, index) => {
              return (
                <Box key={index + "menu"} className="MenuWrapper QuickLink">
                  <Typography
                    className="MenuTitle"
                    variant="subtitle2"
                    component="p"
                  >
                    {menu?.mainTitle?.toLocaleLowerCase()}
                  </Typography>
                  <List>
                    {menu?.links?.map((item) => {
                      return (
                        <ListItem key={item.linkTitle}>
                          <ListItemButton
                            onClick={() => navigate(`${item.linkUrl}`)}
                          >
                            {item.linkTitle}
                          </ListItemButton>
                        </ListItem>
                      );
                    })}
                  </List>
                </Box>
              );
            })}
          </Stack>
        </Stack>
      </Container>
      <BullionmarkCopyRight />
    </Box>
  );
}

export default BullionmarkFooter