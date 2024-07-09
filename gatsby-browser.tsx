/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

import React from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
// Assets
import "./src/scss/style.scss";
import { Provider } from "react-redux";
import { store, persistor } from "@/redux/store";
import theme from "@/theme";
import { PersistGate } from "redux-persist/integration/react";
// import LogoutUserOnTabClose from '@/components/common/LogoutUserOnTabClose';

export const wrapRootElement = ({ element }: any) => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {/* <LogoutUserOnTabClose /> */}
        {element}
      </ThemeProvider>
    </PersistGate>
  </Provider>
);

// // Wraps every page in a component
// export const wrapPageElement = ({ element, props }:any) => {
//   return <Layout {...props}>{element}</Layout>
// }
