import Header from './Header'

const layoutStyle = {
  margin: 0,
  padding: 0
}

const Layout = (props) => (
  <div style={layoutStyle}>
    <Header />
    <div>{props.children}</div>
  </div>
)

export default Layout
