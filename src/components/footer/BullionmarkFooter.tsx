import React from 'react'
import { Box, Container, Stack, Typography, List, Link, ListItem, ListItemButton, } from "@mui/material"


import BullionFooterLogo from '../../assets/images/BullionFooterLogo.png'
import { BYoutube, PintrestIcon, LinkedinIcon, BFacebook, BInsta } from '@/assets/icons'
import BullionmarkCopyRight from './BullionmarkCopyRight'
import { Link as SocialLink } from 'gatsby'

function BullionmarkFooter() {
    return (
        <Box id="BullionmarkFooterSection" className='BullionmarkFooter' component="footer">
            <Container className="Container">
                <Stack className="FooterWrapper">
                    <Stack className="LogoPart">
                        <Link style={{ cursor: 'pointer' }}>
                            <img src={BullionFooterLogo} alt="Bullionmark Footer logo" loading="lazy" />
                        </Link>
                        <Typography className='FooterTagLine'>Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups</Typography>
                    </Stack>
                    <Box className="MenuWrapper QuickLink">
                        <Typography className="MenuTitle" variant="subtitle2" component="p">Quick Link</Typography>
                        <List>
                            <ListItem>
                                <ListItemButton>Shop</ListItemButton>
                            </ListItem>
                            <ListItem>
                                <ListItemButton>Invest</ListItemButton>
                            </ListItem>
                            <ListItem>
                                <ListItemButton>Collect</ListItemButton>
                            </ListItem>
                            <ListItem>
                                <ListItemButton>Discover</ListItemButton>
                            </ListItem>
                        </List>
                    </Box>
                    <Stack className="SocialWrapper MenuWrapper">
                        <Typography className="MenuTitle" variant="subtitle2" component="p">Follow Us</Typography>
                        <Box className='SocialHandlers'>
                            <SocialLink className="SocialLink" to="#"><Typography component="span"><BFacebook /></Typography>Facebook</SocialLink>
                            <SocialLink className="SocialLink" to="#"><Typography component="span"><BInsta /></Typography>Instagram</SocialLink>
                            <SocialLink className="SocialLink" to="#"><Typography component="span"><BYoutube /></Typography>Youtube</SocialLink>
                            <SocialLink className="SocialLink" to="#"><Typography component="span"><PintrestIcon /></Typography>Pinterest</SocialLink>
                            <SocialLink className="SocialLink" to="#"><Typography component="span"><LinkedinIcon /></Typography>Linkedin</SocialLink>
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