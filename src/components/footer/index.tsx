import React, { Suspense, lazy, useCallback, useState, useEffect } from 'react'
import { Box, Container, Link, Stack, Typography, List, ListItem, ListItemButton, ListItemIcon, ListItemText, TextField, Button, Skeleton, IconButton } from "@mui/material"
import classNames from 'classnames'

// Components
// import CopyRight from "./CopyRight"
const CopyRight = lazy(() => import('./CopyRight'))

// Assets
import { MapIcon, MailIcon, FacebookIcon, YoutubeIcon, TwitterIcon, FeedIcon, ChevronRight, InstagramIcon1 } from "../../assets/icons/index"

// Utils
import useApiRequest from '@/hooks/useAPIRequest'
import { ENDPOINTS } from '@/utils/constants'
import { useAppSelector } from '@/hooks'
import { apicall, trimAllSpaceFromString } from '@/utils/helper'
import useSubscription from '@/hooks/useSubscription'
import { Link as NavigationLink, navigate } from "gatsby"
import useAPIoneTime from '@/hooks/useAPIoneTime'
import { getFooterLinks } from '@/redux/reducers/homepageReducer'

export interface FooterLink {
  linkTitle: string;
  linkUrl: string;
}

function index() {
  const { configDetails: configDetailsState } = useAppSelector((state) => state.homePage)
  useAPIoneTime({ service: getFooterLinks, endPoint: ENDPOINTS.getFooterLink, needLoadingorNot:false })
  const data = useAppSelector((state) => state.homePage.footerSections)
  const { email, handleEmailChange, subscribe } = useSubscription()
  const [fixWrapperHeight, setFixWrapperHeight] = useState<number>(0)
  const FixWrapperHeight = document.querySelector(".FixWrapper")?.clientHeight
  useEffect(() => {
    setFixWrapperHeight(FixWrapperHeight ?? 0)
  }, [FixWrapperHeight])
  return (
    <Box id="MainFooterSection" component="footer" sx={{ paddingBottom: `${fixWrapperHeight}px` }}>
      <Container className="Container">
        <Stack className="FooterWrapper">
          <Stack className="LogoPart">
            <NavigationLink style={{ cursor: 'pointer' }} to={'/'}>
              <img src={configDetailsState?.BrandLogoURL_Footer?.value} alt="Footer logo" loading="lazy"
              // onClick={()=>{
              //   navigate('/')
              // }}
              />
            </NavigationLink>
            <Stack className="AboutWrapper">
              <Stack className="LocationWrapper About">
                <MapIcon />
                <Typography className="Location" variant="body2" component="address">{configDetailsState?.Store_Address?.value}</Typography>
              </Stack>
              {/* <Stack className="MailWrapper About">
                <MailIcon />
                <Link href={"mailto:" + configDetailsState?.storecontactemail?.value} variant="body2" className="Mail">{configDetailsState?.storecontactemail?.value}</Link>
              </Stack> */}
            </Stack>
          </Stack>
          <Stack className="MenuesPart" component="nav">
            {data?.map((menu) => (
              <Box key={menu.mainTitle} className={classNames("MenuWrapper", trimAllSpaceFromString(menu.mainTitle))}>
                <Typography className="MenuTitle" variant="subtitle2" component="p">{menu.mainTitle.toLocaleLowerCase()}</Typography>
                <List>
                  {menu.links.map((item: any) => (
                    <ListItem key={item.linkTitle}>
                      <ListItemButton onClick={() => {
                        navigate(item.linkUrl)
                      }}>
                        <ListItemIcon>
                          <ChevronRight />
                        </ListItemIcon>
                        <ListItemText primary={item.linkTitle} primaryTypographyProps={{ variant: "body2" }} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </Box>
            ))}
          </Stack>
          <Stack className="NewsletterPart">
            <Typography className="MenuTitle" variant="subtitle2" component="p">Social Media</Typography>
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
              <IconButton title="Follow us on Facebook" target={"_blank"} href={configDetailsState?.SocialLinks_Facebook?.value ?? window?.location?.href}><FacebookIcon fontSize="small" /></IconButton>
              <IconButton title="Follow us on Youtube" target={"_blank"} href={configDetailsState?.SocialLinks_Youtube?.value ?? window?.location?.href}><YoutubeIcon /></IconButton>
              <IconButton title="Follow us on Twitter" target={"_blank"} href={configDetailsState?.SocialLinks_Twitter?.value ?? window?.location?.href}><TwitterIcon fontSize="small" /></IconButton>
              <IconButton title="Follow us on Instagram" target={"_blank"} href={configDetailsState?.SocialLinks_Instagram?.value ?? window?.location?.href}><InstagramIcon1 fontSize="small" /></IconButton>
              {/* <IconButton title="Follow us on Feed" target={"_blank"} href={configDetailsState?.feedIcon?.value ?? window?.location?.href}><FeedIcon /></IconButton> */}
            </Stack>
          </Stack>
        </Stack>
      </Container>
      <Suspense fallback={
        <></>
        // <Skeleton style={{ height: '30px' }} />
      }>
        <CopyRight />
      </Suspense>
    </Box>
  )
}

export default index