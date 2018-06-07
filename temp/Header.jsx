import Link from "next/link"

const headerStyle = {
  display: "block",
  top: 0,
  width: "100%",
  minWidth: 320,
  backgroundColor: "cyan",
  WebkitAlignSelf: "stretch",
  alignSelf: "stretch",
}

const headerInnerStyle = {
  display: "-webkit-flex",
  display: "flex",
  WebkitFlex: "1 0 auto",
  flex: "1 0 auto",
  WebkitJustifyContent: "space-between",
  justifyContent: "space-between",
  padding: 8,
  position: "relative",
  width: "100%",
}

const floatLeftStyle = {
  display: "-webkit-flex",
  display: "flex",
  WebkitFlex: "1 1 auto",
  flex: "1 1 auto",
  WebkitAlignSelf: "center",
  alignSelf: "center",
  WebkitAlignItems: "center",
  alignItems: "center",
  verticalAlign: "middle",
  height: 48,
  paddingRight: 32,
}

const floatRightStyle = {
  display: "-webkit-flex",
  display: "flex",
  WebkitFlex: "0 0 auto",
  flex: "0 0 auto",
  WebkitAlignSelf: "center",
  alignSelf: "center",
  WebkitJustifyContent: "flex-end",
  justifyContent: "flex-end",
  verticalAlign: "middle",
  height: 48,
  paddingLeft: 32,
  paddingRight: 4,
}

const linkStyle = {
  margin: "auto",
  marginRight: 15,
}

const imageStyle = {
  height: 48,
  width: 48,
  marginRight: 8,
}

const Header = () => (
  <header style={headerStyle}>
    <div style={headerInnerStyle}>
      <div style={floatLeftStyle}>
        <img
          src="../static/cartoon-bedbug-image-placeholder.jpg"
          style={imageStyle}
        />
        <h1>Bed Bug Authority</h1>
      </div>
      <div style={floatRightStyle}>
        <Link href="/">
          <a style={linkStyle}>Link1</a>
        </Link>
        <Link href="/">
          <a style={linkStyle}>Link2</a>
        </Link>
        <Link href="/">
          <a style={linkStyle}>Link3</a>
        </Link>
      </div>
    </div>
  </header>
)

export default Header
