import React from 'react'
import { Box, Container, Stack, Typography, List, Link, ListItem, ListItemButton, IconButton, } from "@mui/material"


import BullionFooterLogo from '../../assets/images/bullionfooterlogo.png'
import { BYoutube, PintrestIcon, LinkedinIcon, BFacebook, BInsta, FacebookIcon, InstagramIcon1, TwitterIcon, YoutubeIcon, Map4Icon, PhoneCall1Icon } from '@/assets/icons'
import BullionmarkCopyRight from './BullionmarkCopyRight'
import { Link as GatsbyLink } from 'gatsby'
import { navigate } from "gatsby";

// Hooks
import { useAppSelector } from "@/hooks"

function BullionmarkFooter() {
    const { configDetails: configDetailsState } = useAppSelector((state) => state.homePage)
    const { bullionMarkPage } = useAppSelector((state) => state.homePage)
    const bullionmarkFooter = bullionMarkPage?.homepage_Section_9_Footer_Quick_Links ?? []

    return (
        <Box id="BullionmarkFooterSection" className='BullionmarkFooter' component="footer">
            <Container className="Container">
                <Stack className="FooterWrapper">
                    <Stack className="LogoPart">
                        <GatsbyLink to="/" style={{ cursor: 'pointer' }}>
                            <img src={configDetailsState.Homepage_FooterLogo_URL.value} alt="Bullionmark Footer logo" loading="lazy" />
                        </GatsbyLink>
                        <Typography className='FooterTagLine'>Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups</Typography>
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
                                <Typography>Level 6, 102 Adelaide St, Brisbane, Queensland, 4000 Australia</Typography>
                            </Stack>
                            <Stack className="Item">
                                <PhoneCall1Icon />
                                <GatsbyLink to={`tel:+61731848300`}>61731848300</GatsbyLink>
                            </Stack>
                        </Stack>
                    </Box>
                    <Box className="MenuWrapper Social">
                        <Typography className="MenuTitle" variant="subtitle2" component="p">Social Media</Typography>
                        <Stack className="SocialMedia">
                            <IconButton title="Follow us on Facebook" target={"_blank"} href={configDetailsState?.facebooklink?.value ?? window?.location?.href}><FacebookIcon fontSize="small" /></IconButton>
                            <IconButton title="Follow us on Instagram" target={"_blank"} href={configDetailsState?.instagramlink?.value ?? window?.location?.href}><InstagramIcon1 fontSize="small" /></IconButton>
                            <IconButton title="Follow us on Youtube" target={"_blank"} href={configDetailsState?.youtubelink?.value ?? window?.location?.href}><YoutubeIcon /></IconButton>
                            <IconButton title="Follow us on LinkedinIcon" target={"_blank"} href={configDetailsState?.youtubelink?.value ?? window?.location?.href}><LinkedinIcon /></IconButton>
                            {/* <IconButton title="Follow us on Feed" target={"_blank"} href={configDetailsState?.feedIcon?.value ?? window?.location?.href}><FeedIcon /></IconButton> */}
                        </Stack>
                    </Box>
                </Stack>
            </Container>
            <BullionmarkCopyRight />
        </Box>
    )
}

export default BullionmarkFooter