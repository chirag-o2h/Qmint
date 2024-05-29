import React from "react"
import { Container, Box, Typography, Button } from "@mui/material"
import { Link } from "gatsby"

// Assets
import { TickIcon } from "@/assets/icons"

// Utils
import { ENDPOINTS } from "@/utils/constants"

// Components
import Layout from "@/components/common/Layout"

function EmailConfirmation() {
  return (
    <Layout>
      <Container id="EmailConfirmation">
        <Box className="Content">
          <TickIcon className="TickIcon" />
          <Typography variant="h4" className="Title" component="p">Confirmation</Typography>
          <Typography className="Description">
            Your email has been successfully verified. Please <Link to={ENDPOINTS.login} className="Link">click here</Link> to login.
          </Typography>
          <Button variant="contained" size="large" className="ActionButton">Sign Me In</Button>
        </Box>
      </Container>
    </Layout>
  )
}

export default EmailConfirmation