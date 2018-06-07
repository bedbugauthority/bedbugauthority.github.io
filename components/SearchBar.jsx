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
    this.handleSearchTextChange = this.handleSearchTextChange.bind(this)
  }

  handleSearchTextChange = (event) =>
    this.props.onSearchTextChange(event.target.value)

  handleSubmit = (event) => event.preventDefault()

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
          value={this.props.searchText}
          onChange={this.handleSearchTextChange}
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
