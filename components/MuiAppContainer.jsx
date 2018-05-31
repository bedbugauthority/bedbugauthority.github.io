import CssBaseline from "@material-ui/core/CssBaseline"

const MuiAppContainer = (props) => (
  <React.Fragment>
    <CssBaseline />
    <div>{props.children}</div>
  </React.Fragment>
)

export default MuiAppContainer
