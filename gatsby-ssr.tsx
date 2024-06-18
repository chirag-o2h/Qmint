/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

// You can delete this file if you're not using it

import React from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { persistor, store } from '@/redux/store';
import { Provider } from 'react-redux';
import theme from '@/theme';
import { PersistGate } from 'redux-persist/integration/react';
import { Partytown } from '@builder.io/partytown/react';
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
export const onRenderBody = ({ setHeadComponents, setPreBodyComponents, setPostBodyComponents }: any) => {
  setHeadComponents([
    <Partytown key="partytown" debug={true} forward={['dataLayer.push']} />,
    <script
      async
      key="gtag-js"
      src="https://www.googletagmanager.com/gtag/js?id=UA-122367243-2"
    />,
    // <script key="analytics" src="https://example.com/analytics.js" type="text/partytown" />
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
    />
  ]);
  setPostBodyComponents([
    <script
      key="gtag-inline"
      dangerouslySetInnerHTML={{
        __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'UA-122367243-2');
        `,
      }}
    />,
  ]);
};
// Wraps every page in a component
// export const wrapPageElement = ({ element, props }:any) => {
//   return <Layout {...props}>{element}</Layout>
// }