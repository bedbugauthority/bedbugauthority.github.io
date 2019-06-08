import React, { useEffect } from "react";
import App, { Container } from "next/app";
import Head from "next/head";
import { ThemeProvider } from "@material-ui/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "../lib/theme";

// IE polyfill for Object.entries
if (!Object.entries) {
  Object.entries = function(obj) {
    var ownProps = Object.keys(obj),
      i = ownProps.length,
      resArray = new Array(i); // preallocate the Array
    while (i--) resArray[i] = [ownProps[i], obj[ownProps[i]]];

    return resArray;
  };
}

const MyApp = props => {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }, []);

  const { Component, pageProps } = props;

  return (
    <Container>
      <Head>
        <title>Bed Bug Matrix</title>
      </Head>
      {/* Wrap every page in Theme provider */}
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {/* Pass pageContext to the _document though the renderPage enhancer
              to render collected styles on server-side. */}
        <Component {...pageProps} />
      </ThemeProvider>
    </Container>
  );
};

export default MyApp;
