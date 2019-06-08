import Document, { Head, Main, NextScript } from "next/document";
import { ServerStyleSheets } from "@material-ui/styles";
import flush from "styled-jsx/server";
import theme from "../lib/theme";

class MyDocument extends Document {
  render() {
    const { pageContext } = this.props;

    return (
      <html lang="en" dir="ltr">
        <Head>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1.0, width=device-width"
          />
          {/* PWA manifest */}
          {/* <link rel="manifest" href="/static/manifest.webmanifest" /> */}
          {/* PWA primary color - i.e. color of browser on mobile devices */}
          <meta
            name="theme-color"
            content={
              pageContext ? pageContext.theme.palette.primary.main : null
            }
          />
          {/* tell google not to show translate modals */}
          <meta name="google" content="notranslate" />

          {/* 2. static resources (incl. from CDN) */}
          <link rel="shortcut icon" href="../static/free_bed_bug_icon.jpg" />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/icon?family=Material+Icons"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}

MyDocument.getInitialProps = async ctx => {
  // Resolution order
  //
  // On the server:
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. document.getInitialProps
  // 4. app.render
  // 5. page.render
  // 6. document.render
  //
  // On the server with error:
  // 1. document.getInitialProps
  // 2. app.render
  // 3. page.render
  // 4. document.render
  //
  // On the client
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. app.render
  // 4. page.render

  // Render app and page and get the context of the page with collected side effects.
  const sheets = new ServerStyleSheets();
  const originalRenderPage = ctx.renderPage;

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: App => props => sheets.collect(<App {...props} />)
    });

  const initialProps = await Document.getInitialProps(ctx);

  return {
    ...initialProps,
    // Styles fragment is rendered after the app and page rendering finish.
    styles: (
      <React.Fragment>
        {sheets.getStyleElement()}
        {flush() || null}
      </React.Fragment>
    )
  };
};

export default MyDocument;
