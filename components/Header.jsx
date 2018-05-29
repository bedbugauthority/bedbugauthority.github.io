import Link from 'next/link'

const headerStyle = {
  padding: 20
}

const linkStyle = {
  marginRight: 15
}

const imageStyle = {
  height: 50,
  width: 50
}

const Header = () => (
  <div style={headerStyle}>
    <img
      src="../static/cartoon-bedbug-image-placeholder.jpg"
      style={imageStyle}
    />
    <Link href="/">
      <a style={linkStyle}>Home</a>
    </Link>
    <Link href="/about">
      <a style={linkStyle}>About</a>
    </Link>
  </div>
)

export default Header
