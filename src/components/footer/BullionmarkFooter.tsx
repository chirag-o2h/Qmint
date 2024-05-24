import React from 'react'
import { Box, Container, Stack, Typography, List, Link, ListItem, ListItemButton, } from "@mui/material"


import BullionFooterLogo from '../../assets/images/bullionfooterlogo.png'
import { BYoutube, PintrestIcon, LinkedinIcon, BFacebook, BInsta } from '@/assets/icons'
import BullionmarkCopyRight from './BullionmarkCopyRight'
import { Link as GatsbyLink } from 'gatsby'
import { navigate } from "gatsby";

// Hooks
import { useAppSelector } from "@/hooks"

function BullionmarkFooter() {
    const { bullionMarkPage, configDetails } = useAppSelector((state) => state.homePage)
    const bullionmarkFooter = bullionMarkPage?.homepage_Section_9_Footer_Quick_Links ?? []

    return (
        <Box id="BullionmarkFooterSection" className='BullionmarkFooter' component="footer">
            <Container className="Container">
                <Stack className="FooterWrapper">
                    <Stack className="LogoPart">
                        <GatsbyLink to="/" style={{ cursor: 'pointer' }}>
                            <img src={configDetails.Homepage_FooterLogo_URL.value} alt="Bullionmark Footer logo" loading="lazy" />
                        </GatsbyLink>
                        <Typography className='FooterTagLine'>Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups</Typography>
                    </Stack>
                    <Box className="MenuWrapper QuickLink">
                        <Typography className="MenuTitle" variant="subtitle2" component="p">Quick Link</Typography>
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
                    <Stack className="SocialWrapper MenuWrapper">
                        <Typography className="MenuTitle" variant="subtitle2" component="p">Follow Us</Typography>
                        <Box className='SocialHandlers'>
                            <GatsbyLink className="SocialLink" to="#"><Typography component="span"><BFacebook /></Typography>Facebook</GatsbyLink>
                            <GatsbyLink className="SocialLink" to="#"><Typography component="span"><BInsta /></Typography>Instagram</GatsbyLink>
                            <GatsbyLink className="SocialLink" to="#"><Typography component="span"><BYoutube /></Typography>Youtube</GatsbyLink>
                            <GatsbyLink className="SocialLink" to="#"><Typography component="span"><PintrestIcon /></Typography>Pinterest</GatsbyLink>
                            <GatsbyLink className="SocialLink" to="#"><Typography component="span"><LinkedinIcon /></Typography>Linkedin</GatsbyLink>
                        </Box>
                    </Stack>
                    <Box className="MenuWrapper CallUsWrapper">
                        <Typography className="MenuTitle" variant="subtitle2" component="p">CALL US</Typography>
                        <Link href="tel:+617 3184 8300" variant="body2" className="Phone">617 3184 8300</Link>
                    </Box>
                </Stack>
            </Container>
            <BullionmarkCopyRight />
        </Box>
    )
}

export default BullionmarkFooter