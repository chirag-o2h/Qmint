import React, { Suspense, lazy, useCallback, useState } from 'react'
import { Box, Container, Link, Stack, Typography, List, ListItem, ListItemButton, ListItemText, IconButton } from "@mui/material"
import classNames from 'classnames'
import { Link as LogoLink } from 'gatsby'


// Components
// import CopyRight from "./CopyRight"
const CopyRight = lazy(() => import('./CopyRight'))

// Assets
import { MapIcon, MailIcon, FacebookIcon, YoutubeIcon, TwitterIcon, FeedIcon, ChevronRight, PhoneCall, InstagramIcon1 } from "../../assets/icons/index"
import FooterLogo from "@/assets/logos/FooterLogo.png";

// Utils
import useApiRequest from '@/hooks/useAPIRequest'
import { ENDPOINTS } from '@/utils/constants'
import { useAppSelector } from '@/hooks'
import { apicall, trimAllSpaceFromString } from '@/utils/helper'
import useSubscription from '@/hooks/useSubscription'
import { navigate } from 'gatsby'
import { Icategory } from '../header/Navigation'
import { getMainHomePageData } from '@/redux/reducers/homepageReducer'
import useAPIoneTime from '@/hooks/useAPIoneTime'
export interface FooterLink {
    linkTitle: string;
    linkUrl: string;
}

export interface FooterSection {
    mainTitle: string;
    columnOrder: number;
    links: FooterLink[];
}

function FrontFooter() {
    const { configDetails: configDetailsState, categoriesList, mainHomePageData } = useAppSelector((state) => state.homePage)
    // if SSR
    // useAPIoneTime({ service: getMainHomePageData, conditionalCall: location.pathname !== '/' })
    // else CSR
    useAPIoneTime({ service: getMainHomePageData })
    const { email, handleEmailChange, subscribe } = useSubscription()
    return (
        <Box id="MainFooterSection" className='FrontFooter' component="footer">
            <Container className="Container">
                <Stack className="FooterWrapper">
                    <Stack className="LogoPart">
                        <LogoLink to="/" style={{ cursor: 'pointer' }}>
                            <img src={configDetailsState?.["Homepage_FooterLogo_URLfooterlogo"]?.value} alt="Footer logo" loading="lazy" />
                        </LogoLink>
                        <Stack className="SocialWrapper">
                            <IconButton title="Follow us on Facebook" target={"_blank"} href={configDetailsState?.SocialLinks_Facebook?.value ?? window?.location?.href}><FacebookIcon fontSize="small" /></IconButton>
                            <IconButton title="Follow us on Youtube" target={"_blank"} href={configDetailsState?.SocialLinks_Youtube?.value ?? window?.location?.href}><YoutubeIcon /></IconButton>
                            <IconButton title="Follow us on Twitter" target={"_blank"} href={configDetailsState?.SocialLinks_Twitter?.value ?? window?.location?.href}><TwitterIcon fontSize="small" /></IconButton>
                            <IconButton title="Follow us on Instagram" target={"_blank"} href={configDetailsState?.SocialLinks_Instagram?.value ?? window?.location?.href}><InstagramIcon1 fontSize="small" /></IconButton>
                        </Stack>
                    </Stack>
                    <Stack className="MenuesPart" component="nav">
                        <Box className="MenuWrapper">
                            <Typography className="MenuTitle" variant="subtitle2" component="p">Quick Links</Typography>
                            <List>
                                {
                                    mainHomePageData?.homepage_Section_9_Footer_Quick_Links?.length ?? 0 > 0 ? <>{
                                        mainHomePageData?.homepage_Section_9_Footer_Quick_Links.map(quickLinks => {
                                            return (
                                                <ListItem key={quickLinks.name}>
                                                    <ListItemButton onClick={() => navigate(`${quickLinks.linkUrl}`)}>
                                                        <ListItemText primary={quickLinks.name} primaryTypographyProps={{ variant: "body2" }} />
                                                    </ListItemButton>
                                                </ListItem>
                                            )
                                        })
                                    }</> : null
                                }
                            </List>
                        </Box>
                        <Box className="MenuWrapper">
                            <Typography className="MenuTitle" variant="subtitle2" component="p">Contact Us</Typography>
                            <Stack className="AboutWrapper">
                                <Stack className="MailWrapper About">
                                    <PhoneCall />
                                    <Link href={"tel:" + configDetailsState?.["StorePhoneNumber_AU"]?.value} variant="body2" className="Mail">{configDetailsState?.["StorePhoneNumber_AU"]?.value}</Link>
                                </Stack>
                                {/* <Stack className="MailWrapper About">
                                    <MailIcon />
                                    <Link href={"mailto:" + configDetailsState?.storecontactemail?.value} variant="body2" className="Mail">{configDetailsState?.storecontactemail?.value}</Link>
                                </Stack> */}
                                <Stack className="LocationWrapper About">
                                    <MapIcon />
                                    <Typography className="Location" variant="body2" component="address">{configDetailsState?.Store_Address?.value}</Typography>
                                </Stack>

                            </Stack>
                        </Box>
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

export default FrontFooter