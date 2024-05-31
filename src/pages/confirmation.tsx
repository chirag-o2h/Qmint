import React from "react"
import { Container, Box, Typography, Button } from "@mui/material"
import { Link, navigate } from "gatsby"

// Assets
import { TickIcon } from "@/assets/icons"

// Utils
import { ENDPOINTS } from "@/utils/constants"

// Components
import Layout from "@/components/common/Layout"

function Confirmation() {
  return (
    <Layout>
      <Container id="Confirmation">
        <Box className="Content">
          <TickIcon className="TickIcon" />
          <Typography variant="h4" className="Title" component="p">Confirmation</Typography>
          <Typography className="Description">
            Account with this email address is already registered with us on  <Link to="https://bullionmark.com.au" className="Link">https://bullionmark.com.au</Link> Please click below to login using the same
          </Typography>
          <Button variant="contained" size="large" className="ActionButton" onClick={() => navigate(ENDPOINTS.login)}>Sign Me In</Button>
        </Box>
      </Container>
    </Layout>
  )
}

export default Confirmation