import React, { useEffect, useState } from "react"
import Button from "@mui/material/Button"
import Snackbar from "@mui/material/Snackbar"
import Alert from "@mui/material/Alert"
import { useAppDispatch, useAppSelector } from "@/hooks"
import { setToasterState } from "@/redux/reducers/homepageReducer"
import { navigate } from "gatsby"

function Toaster() {
  const dispatch = useAppDispatch()
  const { openToaster, toasterMessage, buttonText, redirectButtonUrl, severity } = useAppSelector((state) => state.homePage)

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return
    }
    dispatch(setToasterState({
      openToaster: false,
      toasterMessage: '',
      buttonText: '',
      redirectButtonUrl: ''
    }))
  }

  useEffect(() => {
    let x: any;
    x = setTimeout(() => {
      dispatch(setToasterState({
        openToaster: false,
        toasterMessage: '',
        buttonText: '',
        redirectButtonUrl: ''
      }))
    }, 6000);
    return () => {
      x && clearTimeout(x)
      // todo check what can we do here to improve
      dispatch(setToasterState({
        openToaster: false,
        toasterMessage: '',
        buttonText: '',
        redirectButtonUrl: ''
      }))
    }
  }, [openToaster, toasterMessage, buttonText, redirectButtonUrl])

  return (
    <>
      <Snackbar
        open={true}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleClose}
          severity={severity}
          variant="filled"
        >
          {toasterMessage}  <Button onClick={() => {
            navigate(`/${redirectButtonUrl}`)
          }}>{buttonText}</Button>
        </Alert>
      </Snackbar>
    </>
  )
}

export default Toaster