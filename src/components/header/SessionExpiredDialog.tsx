import React, { useState } from "react"
import { Dialog, DialogContent, Typography, DialogActions, Button, Stack, IconButton } from "@mui/material"
import { navigate } from "gatsby"
import { useAppDispatch, useAppSelector } from "@/hooks"
import { savePopUpDataAPI, setPopUpDetails } from "@/redux/reducers/homepageReducer"
import { ISavePopUpDetails } from "@/apis/services/ConfigServices"
import { CrossIconWithOutlineCircle } from "@/assets/icons"

interface SessionExpiredDialog {
  open: boolean
  onClose: (value?: boolean) => void
  continueProcess?: (value?: boolean) => void
}
declare global {
  interface Window {
    handleRefresh: () => void;
    handleLogin: () => void;
    handleYes: () => void;
    handleNo: () => void;
  }
}
interface IResponse {
  type: string;
  payload: {
    data: {
      code: number;
      message: null | string;
      exception: null | string;
      extraProperty: null | any;
      data: {
        id: number;
        positiveAnswer: null | string;
        negativeAnswer: string;
        negativeAnswerUrl: string;
        popupQueryId: number;
        isApprove: boolean;
      };
    };
    status: number;
    statusText: string;
    headers: {
      [key: string]: string;
    };
    config: {
      transitional: {
        silentJSONParsing: boolean;
        forcedJSONParsing: boolean;
        clarifyTimeoutError: boolean;
      };
      adapter: string[];
      transformRequest: null | (() => void)[];
      transformResponse: null | (() => void)[];
      timeout: number;
      xsrfCookieName: string;
      xsrfHeaderName: string;
      maxContentLength: number;
      maxBodyLength: number;
      env: {};
      headers: {
        [key: string]: string;
      };
      baseURL: string;
      method: string;
      url: string;
      data: string;
    };
    request: {};
  };
  meta: {
    arg: {
      IsAccepted: boolean;
      CustomerId: number;
      Popupid: number;
    };
    requestId: string;
    requestStatus: string;
  };
}

function SessionExpiredDialog(props: SessionExpiredDialog) {
  const { isLoggedIn, userDetails } = useAppSelector((state) => state.homePage)
  const [needTOShowClose, setNeedTOShowClose] = useState(false)
  const dispatch = useAppDispatch()
  const { open, onClose, continueProcess } = props
  const { popUpdata } = useAppSelector((state) => state.homePage)
  const savePopUpDataFunctinon = async (IsAccepted: boolean) => {
    const data: ISavePopUpDetails = {
      IsAccepted,
      CustomerId: isLoggedIn ? userDetails?.customerId! : 0,
      Popupid: popUpdata?.id as number
    }
    //@ts-ignore
    const res: IResponse = await dispatch(savePopUpDataAPI(data))
    onClose()
    if (!IsAccepted) {
      if (!!res?.payload?.data?.data?.negativeAnswer) {
        dispatch(setPopUpDetails(res.payload.data.data.negativeAnswer))
        setNeedTOShowClose(true)
        onClose(true)
      } else if (res.payload.data.data.negativeAnswerUrl) {
        navigate(res.payload.data.data.negativeAnswerUrl)
      }
    } else {
      // console.log("🚀 ~ savePopUpDataFunctinon ~ res.payload.data.data.negativeAnswer:", res.payload.data.data.negativeAnswer)
      if (!!res?.payload?.data?.data?.positiveAnswer) {
        dispatch(setPopUpDetails(res.payload.data.data.positiveAnswer))
        setNeedTOShowClose(true)
        onClose(true)
      } else {
        if (continueProcess) {
          continueProcess(true)
        }
        // navigate(res.payload.data.data.negativeAnswerUrl)
      }
    }
  }
  window.handleRefresh = async () => {
    // console.log("here", "handleRefresh")
    location.reload()
  };
  window.handleLogin = async () => {
    navigate('/login')
  };
  window.handleYes = async () => {
    savePopUpDataFunctinon(true)
  };
  window.handleNo = async () => {
    savePopUpDataFunctinon(false)
  }
  return (
    <Dialog
      id="SessionExpiredDialog"
      open={open}
      // onClose={needTOShowClose ? onClose : () => { }}
      fullWidth
      maxWidth="md"
    >
      {needTOShowClose && <Stack className="DialogHeader">
        <IconButton
          aria-label="close"
          className="CloseButton"
          onClick={() => {
            onClose(false)
          }}
        >
          <CrossIconWithOutlineCircle />
        </IconButton>
      </Stack>}
      <DialogContent>
        {/* @ts-ignore */}
        <Stack className="Content" dangerouslySetInnerHTML={{
          __html: popUpdata?.htmlCode,
        }}>
          {/* <Typography variant="subtitle2">Your session has expired.</Typography>
          <Typography variant="subtitle2">Please login to continue.</Typography> */}
        </Stack>
      </DialogContent>
      {/* <DialogActions>
        <Button variant="contained" onClick={() => {
          navigate('/login')
        }}>Login</Button>
      </DialogActions> */}
    </Dialog>
  )
}

export default SessionExpiredDialog