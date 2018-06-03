import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"
import TextField from "@material-ui/core/TextField"

const styles = (theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginTop: theme.spacing.unit / 2,
    marginBottom: theme.spacing.unit / 2,
    marginLeft: theme.spacing.unit / 2,
    marginRight: theme.spacing.unit / 2,
    width: 200,
  },
})

class SearchBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = { value: "" }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({ value: event.target.value.toUpperCase() })
  }

  handleSubmit(event) {
    event.preventDefault()
    alert("A name was submitted: " + this.state.value)
  }

  render() {
    const { classes } = this.props
    return (
      <form
        className={classes.container}
        noValidate
        autoComplete="off"
        onSubmit={this.handleSubmit}
      >
        <TextField
          id="search"
          label="Search"
          type="search"
          placeholder="Search..."
          className={classes.textField}
          value={this.state.value}
          onChange={this.handleChange}
          margin="normal"
        />
      </form>
    )
  }
}

SearchBar.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(SearchBar)
