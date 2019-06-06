import PropTypes from "prop-types";
import Document, { Head, Main, NextScript } from "next/document";

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
          <link rel="manifest" href="/static/manifest.webmanifest" />
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

MyDocument.getInitialProps = ctx => {
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
  let pageContext;
  const page = ctx.renderPage(Component => props => {
    const WrappedComponent = props => {
      pageContext = props.pageContext;
      return <Component {...props} />;
    };

    return WrappedComponent;
  });

  let css;
  // pageContext might be undefined, e.g. after an error.
  if (pageContext) {
    css = pageContext.sheetsRegistry.toString();
  }

  return {
    ...page,
    pageContext,
    styles: (
      <style
        id="jss-server-side"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: css
        }}
      />
    )
  };
};

export default MyDocument;
