import React from 'react'
import { Box, Container, Stack, Typography, List, Link, ListItem, ListItemButton, IconButton, } from "@mui/material"


import BullionFooterLogo from '../../assets/images/bullionfooterlogo.png'
import { BYoutube, PintrestIcon, LinkedinIcon, BFacebook, BInsta, FacebookIcon, InstagramIcon1, TwitterIcon, YoutubeIcon, Map4Icon, PhoneCall1Icon } from '@/assets/icons'
import BullionmarkCopyRight from './BullionmarkCopyRight'
import { Link as GatsbyLink } from 'gatsby'
import { navigate } from "gatsby";

// Hooks
import { useAppSelector } from "@/hooks"
import useAPIoneTime from '@/hooks/useAPIoneTime'
import { getBullionMarkPageAPI } from '@/redux/reducers/homepageReducer'

function BullionmarkFrontFooter() {
    const { configDetails: configDetailsState, bullionMarkPage } = useAppSelector((state) => state.homePage)
    const bullionmarkFooter = bullionMarkPage?.homepage_Section_9_Footer_Quick_Links ?? []
    useAPIoneTime({ service: getBullionMarkPageAPI })

    return (
        <Box id="BullionmarkFooterSection" className='BullionmarkFrontFooter' component="footer">
            <Container className="Container">
                <Stack className="FooterWrapper">
                    <Stack className="LogoPart">
                        <GatsbyLink to="/" style={{ cursor: 'pointer' }}>
                            <img src={configDetailsState?.Homepage_FooterLogo_URL?.value} alt="Bullionmark Footer logo" loading="lazy" />
                        </GatsbyLink>
                        <Typography className='FooterTagLine'>{configDetailsState?.Homepage_Footer_Text_below_logo?.value}</Typography>
                    </Stack>
                    <Box className="MenuWrapper QuickLink">
                        <Typography className="MenuTitle" variant="subtitle2" component="p">Information</Typography>
                        <List>
                            {bullionmarkFooter.map((item) => {
                                return (
                                    <ListItem key={item.name}>
                                        <ListItemButton onClick={() => navigate(`${item.linkUrl}`)}>{item.name}</ListItemButton>
                                    </ListItem>
                                )
                            })}
                        </List>
                    </Box>
                    <Box className="MenuWrapper ContactUs">
                        <Typography className="MenuTitle" variant="subtitle2" component="p">Contact Us</Typography>
                        <Stack className="ItemWrapper">
                            <Stack className="Item">
                                <Map4Icon />
                                <Typography>{configDetailsState?.Store_Address?.value}</Typography>
                            </Stack>
                            <Stack className="Item">
                                <PhoneCall1Icon />
                                {/* <GatsbyLink to={`tel:${configDetailsState?.StorePhoneNumber_AU?.value}`}>{configDetailsState?.StorePhoneNumber_AU?.value}</GatsbyLink> */}
                                <Link href={`tel:${configDetailsState?.StorePhoneNumber_AU?.value}`}>{configDetailsState?.StorePhoneNumber_AU?.value}</Link>
                            </Stack>
                        </Stack>
                    </Box>
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

export default BullionmarkFrontFooter