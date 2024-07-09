/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

// You can delete this file if you're not using it

import React from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { persistor, store } from "@/redux/store";
import { Provider } from "react-redux";
import theme from "@/theme";
import { PersistGate } from "redux-persist/integration/react";
import { Partytown } from "@builder.io/partytown/react";
export const wrapRootElement = ({ element }: any) => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {element}
      </ThemeProvider>
    </PersistGate>
  </Provider>
);
export const onRenderBody = ({
  setHeadComponents,
  setPreBodyComponents,
  setPostBodyComponents,
}: any) => {
  setHeadComponents([
    <Partytown key="partytown" debug={true} forward={["dataLayer.push"]} />,
    <script
      defer
      type="text/partytown"
      src="https://www.googletagmanager.com/gtag/js?id=G-J4PT6SWF19"
      key="ga-script"
    />,
    <script
      defer
      key="ga-setup"
      dangerouslySetInnerHTML={{
        __html: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-J4PT6SWF19');
      `,
      }}
    />,
    // Google Tag Manager
    <script
      defer
      key="gtm-setup"
      type="text/partytown"
      dangerouslySetInnerHTML={{
        __html: `
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-TJLKDCRM');
      `,
      }}
    />,
  ]);

  // For GTM, we will need to add this noscript tag to the body of the HTML
  setPreBodyComponents([
    <noscript
      key="gtm"
      dangerouslySetInnerHTML={{
        __html: `
                  <iframe src="https://www.googletagmanager.com/ns.html?id=xxx-xxxxxxx" height="0" width="0"
                      style="display:none;visibility:hidden"></iframe>
                `,
      }}
    />,
    // Google Tag Manager (noscript)
    <noscript
      key="gtm-noscript"
      dangerouslySetInnerHTML={{
        __html: `
            <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-TJLKDCRM"
            height="0" width="0" style="display:none;visibility:hidden"></iframe>
          `,
      }}
    />,
  ]);
  // setPostBodyComponents([

  // ]);
};
// Wraps every page in a component
// export const wrapPageElement = ({ element, props }:any) => {
//   return <Layout {...props}>{element}</Layout>
// }
