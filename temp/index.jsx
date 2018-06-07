import getMuiTheme from "material-ui/styles/getMuiTheme"
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider"
import injectTapEventPlugin from "react-tap-event-plugin"

import { deepOrange500 } from "material-ui/styles/colors"
import FlatButton from "material-ui/FlatButton"

import AppHead from "../components/AppHead"
import MuiAppContainer from "../components/MuiAppContainer"
import Layout from "../components/Layout"
import DataTable from "../components/DataTable"

// source:https://github.com/zeit/next.js/blob/master/examples/with-material-ui/pages/index.js
// Make sure react-tap-event-plugin only gets injected once
// Needed for material-ui
if (!process.tapEventInjected) {
  injectTapEventPlugin()
  process.tapEventInjected = true
}

const styles = {
  container: {
    textAlign: "center",
    paddingTop: 200,
  },
}

const muiTheme = {
  palette: {
    accent1Color: deepOrange500,
  },
}

class Index extends React.Component {
  static getInitialProps({ req }) {
    // Ensures material-ui renders the correct css prefixes server-side
    let userAgent
    if (process.browser) {
      userAgent = navigator.userAgent
    } else {
      userAgent = req.headers["user-agent"]
    }

    return { userAgent }
  }

  constructor(props, context) {
    super(props, context)

    this.state = {
      open: false,
    }
  }

  handleRequestClose = () => {
    this.setState({
      open: false,
    })
  }

  handleTouchTap = () => {
    this.setState({
      open: true,
    })
  }

  render() {
    const { userAgent } = this.props

    const standardActions = (
      <FlatButton
        label="Ok"
        primary={Boolean(true)}
        onTouchTap={this.handleRequestClose}
      />
    )

    return (
      <React.Fragment>
        <AppHead />
        <MuiAppContainer>
          <Layout>
            <p>
              The bed bug product matrix lets you search and filter all known
              bed bug products. Every effort has been made to present factual
              information only. No content should be construed as a product
              recommendation or advice.
            </p>
            <DataTable />
          </Layout>
        </MuiAppContainer>
      </React.Fragment>
    )
  }
}

export default Index
