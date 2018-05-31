//modified from: https://github.com/mui-org/material-ui/blob/master/docs/src/pages/demos/selection-controls/CheckboxesGroup.js
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Checkbox from "@material-ui/core/Checkbox"

const checkboxStyle = {
  height: 28,
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
      <div>
        {Object.entries(this.state).map(([key, value]) => (
          <FormControlLabel
            control={
              <Checkbox
                checked={value}
                onChange={this.handleChange(key)}
                value={key}
                color="secondary"
                style={checkboxStyle}
              />
            }
            label={key}
            key={key}
          />
        ))}
      </div>
    )
  }
}

export default CheckboxesGroup
