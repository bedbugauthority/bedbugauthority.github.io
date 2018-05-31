import Button from "@material-ui/core/Button"

const buttonStyle = {
  paddingLeft: 4,
  paddingRight: 8
}

const MuiButton = () => (
  <Button variant="raised" color="primary" style={buttonStyle}>
    + Filter
  </Button>
)

export default MuiButton
