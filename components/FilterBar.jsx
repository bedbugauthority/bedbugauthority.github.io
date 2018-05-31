import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"
import Chip from "@material-ui/core/Chip"

const styles = (theme) => ({
  filterBar: {
    display: "-webkit-flex",
    display: "flex",
    WebkitJustifyContent: "flex-end",
    justifyContent: "flex-end",
    WebkitFlexFlow: "row wrap",
    flexFlow: "row wrap",
    padding: theme.spacing.unit / 2,
    minHeight: 36,
    border: "2px solid red",
  },
  chip: {
    margin: theme.spacing.unit / 2,
  },
})

const filterBarItems = {
  Manufacturers: { FMC: true, Bayer: true, Amvac: true },
  Formulations: { WP: true, EC: true, A: true, D: true, SC: true },
  "Mattress Application": ["Yes", "No"],
  "Active Ingredient": {
    acetamiprid: true,
    bifenthrin: true,
    pyrethrins: true,
    deltamethrin: true,
  },
}

class FilterBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      chipData: [
        { key: 0, label: "Manufacturers" },
        { key: 1, label: "Formulations" },
        { key: 2, label: "Mattress Application" },
      ],
    }
  }

  handleDelete = (data) => () => {
    if (data.label === "Manufacturers") {
      alert("Why would you want to delete Manufacturers?!")
      return
    }

    const chipData = [...this.state.chipData]
    const chipToDelete = chipData.indexOf(data)
    chipData.splice(chipToDelete, 1)
    this.setState({ chipData })
  }

  handleClick = (data) => () => {
    alert("You clicked the " + data.label + " chip!")
    return
  }

  render() {
    const { classes } = this.props

    return (
      <div className={classes.filterBar}>
        {this.state.chipData.map((data) => {
          return (
            <Chip
              key={data.key}
              label={data.label}
              onDelete={this.handleDelete(data)}
              onClick={this.handleClick(data)}
              className={classes.chip}
            />
          )
        })}
      </div>
    )
  }
}

FilterBar.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(FilterBar)
