import Document, { Head, Main, NextScript } from "next/document";
import JssProvider from "react-jss/lib/JssProvider";
import getContext from "../lib/context";

class MyDocument extends Document {
  render() {
    return (
      <html lang="en">
        <Head>
          {/* 1. metadata */}
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          {/* tell google not to show translate modals */}
          <meta name="google" content="notranslate" />
          {/* specify color of browser on mobile device */}
          <meta name="theme-color" content="#1976D2" />

          {/* 2. static resources (from CDN) */}
          <link rel="shortcut icon" href="../static/free_bed_bug_icon.jpg" />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/icon?family=Material+Icons"
          />

          {/* 3. global styles */}
          <style>
            {/*`
              a, a:focus {
                font-weight: 400;
                color: #1565C0;
                text-decoration: none;
                outline: none
              }
              a:hover, button:hover {
                opacity: 0.75;
                cursor: pointer
              }
              blockquote {
                padding: 0 1em;
                color: #555;
                border-left: 0.25em solid #dfe2e5;
              }
              pre {
                display:block;
                overflow-x:auto;
                padding:0.5em;
                background:#FFF;
                color: #000;
                border: 1px solid #ddd;
              }
              code {
                font-size: 14px;
                background: #FFF;
                padding: 3px 5px;
              }
            `*/}
          </style>
        </Head>
        <body
          style={
            {
              /*
            font: "16px Muli",
            color: "#222",
            margin: "0px auto",
            fontWeight: "300",
            lineHeight: "1.5em",
            backgroundColor: "#F7F9FC",
          */
            }
          }
        >
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}

MyDocument.getInitialProps = ({ renderPage }) => {
  const pageContext = getContext();
  const page = renderPage(Component => props => (
    <JssProvider
      registry={pageContext.sheetsRegistry}
      generateClassName={pageContext.generateClassName}
    >
      <Component pageContext={pageContext} {...props} />
    </JssProvider>
  ));

  return {
    ...page,
    pageContext,
    styles: (
      <style
        id="jss-server-side"
        // eslint-disable-next-line
        dangerouslySetInnerHTML={{
          __html: pageContext.sheetsRegistry.toString()
        }}
      />
    )
  };
};

export default MyDocument;
