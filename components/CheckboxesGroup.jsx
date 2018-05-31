//modified from: https://github.com/mui-org/material-ui/blob/master/docs/src/pages/demos/selection-controls/CheckboxesGroup.js
import FormControl from "@material-ui/core/FormControl"
import FormLabel from "@material-ui/core/FormLabel"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import FormGroup from "@material-ui/core/FormGroup"
import FormHelperText from "@material-ui/core/FormHelperText"
import Checkbox from "@material-ui/core/Checkbox"

const checkboxStyle = {
  height: 28
}

class CheckboxesGroup extends React.Component {
  constructor(props) {
    super(props)
    this.state = props.dataItems
  }

  handleChange = (name) => (event) => {
    this.setState({ [name]: event.target.checked })
  }

  render() {
    return (
      <FormControl component="fieldset">
        <FormLabel component="legend">{this.props.title}</FormLabel>
        <FormGroup>
          {Object.entries(this.state).map(([key, value]) => (
            <FormControlLabel
              control={
                <Checkbox
                  checked={value}
                  onChange={this.handleChange(key)}
                  value={key}
                  color="primary"
                  style={checkboxStyle}
                />
              }
              label={key}
              key={key}
            />
          ))}
        </FormGroup>
      </FormControl>
    )
  }
}

export default CheckboxesGroup
