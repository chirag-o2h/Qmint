import React from "react"
import { Box, Link, Stack, Typography } from "@mui/material"
// import { Link } from "gatsby"

// Assets
import { LockIcon, Map3Icon, Shield1Icon } from "@/assets/icons/index"

function Services() {

  const renderService = (icon: React.ReactNode, title: string, description: string, url: string) => {
    return (
      <Stack className="RenderService">
        {icon}
        <Box className="Content">
          <Typography variant="titleLarge" component="p" className="Title">{title}</Typography>
          <Typography variant="caption" component="p" className="Description">
            {description} <Link href={url}>Learn more</Link>
          </Typography>
        </Box>
      </Stack>
    )
  }

  return (
    <Box className="Services" component="section">
      <Stack className="ServicesWrapper">
        {renderService(<LockIcon fontSize="large" />, "Vault storage", "Safely and cost effectively store your gold and silver in our high security Brisbane Vault.", "/contactus")}
        {renderService(<Map3Icon fontSize="large" />, "Local pick up", "Click and collect orders from our Brisbane office by appointment with photographic ID.", "/contactus")}
        {renderService(<Shield1Icon fontSize="large" />, "Secure shipping", "Save time and parking fees. Insured door to door with real time track and trace.", "/contactus")}
      </Stack>
    </Box>
  )
}

export default Services