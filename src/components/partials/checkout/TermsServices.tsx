import React, { useEffect, useState } from "react"
import { Typography, Button, FormControlLabel, Checkbox, Container, Box } from "@mui/material"

// Componenets
import StepWrapper from "./StepWrapper"
import StyledDialog from "@/components/common/StyledDialog"

// Hooks
import { useAppDispatch, useAppSelector, useToggle } from "@/hooks"

// Data
import { userData } from "@/utils/data"
import { updateFinalDataForTheCheckout } from "@/redux/reducers/checkoutReducer"

function TermsServices() {
  const dispatch = useAppDispatch()
  const { checkoutPageData } = useAppSelector((state) => state.checkoutPage)
  // console.log("🚀 ~ TermsServices ~ checkoutPageData:", checkoutPageData)
  const [openTermsServices, toggleTermsServices] = useToggle(false)
  const [readedTermAndServices, setreadedTermAndServices] = useState(false)
  useEffect(() => {
    dispatch(updateFinalDataForTheCheckout({ termAndServiceIsRead: readedTermAndServices }))
  }, [readedTermAndServices])
  return (
    <>
      <StepWrapper title={checkoutPageData?.termsConditionsTital} className="TermsService">
        <Typography className="Condition">
          <span className="TermsService_html" dangerouslySetInnerHTML={{
            __html: checkoutPageData?.termsConditionsOverview
            // ?.slice(0, 202) + '...'
          }} />
          <Button className="ReadMore" onClick={toggleTermsServices}>Read More</Button>
        </Typography>
        <FormControlLabel
          className="Checkbox"
          control={<Checkbox checked={readedTermAndServices} onChange={() => {
            setreadedTermAndServices((prev) => !prev)
          }} />}
          label="I have read and agree to the terms of service."
        />
      </StepWrapper>
      <StyledDialog
        id="TermsServices"
        open={openTermsServices}
        dialogTitle={checkoutPageData?.termsConditionsTital}
        onClose={() => {
          toggleTermsServices()
        }}
        onAgree={() => {
          setreadedTermAndServices(true)
          toggleTermsServices();
        }}
        primaryActionText="Agree"
        actions
      >
        <Box className="Content" dangerouslySetInnerHTML={{
          __html: checkoutPageData?.termsConditionsbody
        }}
        >
        </Box>
      </StyledDialog>
    </>
  )
}

export default TermsServices