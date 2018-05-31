import FormControlLabel from "@material-ui/core/FormControlLabel"
import Switch from "@material-ui/core/Switch"

class ToggleGroup extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      toggleData: [{ key: 0, label: "Mattress Application", checked: true }],
    }
  }

  handleChange = (data) => (event) => {
    const toggleData = [...this.state.toggleData]
    const toggleToChange = toggleData.indexOf(data)
    toggleData[toggleToChange].checked = event.target.checked
    this.setState({ toggleData })
    alert("You clicked the " + data.label + " switch!")
  }

  render() {
    return (
      <div>
        {this.state.toggleData.map((data) => (
          <FormControlLabel
            control={
              <Switch
                checked={data.checked}
                onChange={this.handleChange(data)}
                value={data.label}
              />
            }
            label={data.label}
            key={data.key}
          />
        ))}
      </div>
    )
  }
}

export default ToggleGroup
