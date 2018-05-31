import Header from "./Header"

const layoutStyle = {
  display: "-webkit-flex",
  display: "flex",
  WebkitFlexDirection: "column",
  flexDirection: "column",
  WebkitAlignItems: "center",
  alignItems: "center",
}

const layoutContainerStyle = {
  display: "-webkit-flex",
  display: "flex",
  WebkitFlexDirection: "column",
  flexDirection: "column",
  maxWidth: 1024,
  minWidth: 584,
  border: "1px solid black",
}

const Layout = (props) => (
  <div style={layoutStyle}>
    <Header />
    <div style={layoutContainerStyle}>{props.children}</div>
  </div>
)

export default Layout
