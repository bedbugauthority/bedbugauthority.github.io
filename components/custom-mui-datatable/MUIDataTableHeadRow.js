import PropTypes from "prop-types"
import classNames from "classnames"
import TableRow from "@material-ui/core/TableRow"
import { withStyles } from "@material-ui/core/styles"

const headRowStyles = {
  root: {},
}

class MUIDataTableHeadRow extends React.Component {
  static propTypes = {
    /** Extend the style applied to components */
    classes: PropTypes.object,
  }

  render() {
    const { classes } = this.props

    return (
      <TableRow
        className={classNames({
          [classes.root]: true,
        })}
      >
        {this.props.children}
      </TableRow>
    )
  }
}

export default withStyles(headRowStyles)(MUIDataTableHeadRow)
