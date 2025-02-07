import PropTypes from "prop-types"
import Paper from "@material-ui/core/Paper"
import IconButton from "@material-ui/core/IconButton"
import Tooltip from "@material-ui/core/Tooltip"
import Typography from "@material-ui/core/Typography"
import DeleteIcon from "@material-ui/icons/Delete"
import { withStyles } from "@material-ui/core/styles"
import textLabels from "../data/textLabels"

const toolbarSelectStyles = {
  root: {
    backgroundColor: "#f7f7f7",
    flex: "1 1 100%",
    display: "flex",
    height: "64px",
    justifyContent: "space-between",
  },
  title: {
    paddingLeft: "26px",
    top: "50%",
    position: "relative",
    transform: "translateY(-50%)",
  },
  iconButton: {
    marginRight: "24px",
    top: "50%",
    display: "block",
    position: "relative",
    transform: "translateY(-50%)",
  },
  deleteIcon: {
    color: "#000",
  },
}

class MUIDataTableToolbarSelect extends React.Component {
  static propTypes = {
    /** Current row selected or not */
    rowSelected: PropTypes.bool,
    /** Callback to trigger selected rows delete */
    onRowsDelete: PropTypes.func,
    /** Extend the style applied to components */
    classes: PropTypes.object,
  }

  render() {
    const { classes, onRowsDelete, selectedRows } = this.props

    return (
      <Paper className={classes.root}>
        <div>
          <Typography variant="subheading" className={classes.title}>
            {selectedRows.data.length} {textLabels.selectedRows.text}
          </Typography>
        </div>

        <Tooltip title={textLabels.selectedRows.delete}>
          <IconButton
            className={classes.iconButton}
            onClick={onRowsDelete}
            aria-label={textLabels.selectedRows.deleteAria}
          >
            <DeleteIcon className={classes.deleteIcon} />
          </IconButton>
        </Tooltip>
      </Paper>
    )
  }
}

export default withStyles(toolbarSelectStyles)(MUIDataTableToolbarSelect)
