import PropTypes from "prop-types"
import classNames from "classnames"
import TableRow from "@material-ui/core/TableRow"
import { withStyles } from "@material-ui/core/styles"

const bodyRowStyles = {
  root: {},
  responsiveStacked: {
    "@media screen and (max-width: 960px)": {
      border: "solid 2px rgba(0, 0, 0, 0.15)",
    },
  },
}

class MUIDataTableBodyRow extends React.Component {
  static propTypes = {
    /** Current row selected or not */
    rowSelected: PropTypes.bool,
    /** Extend the style applied to components */
    classes: PropTypes.object,
  }

  render() {
    const { classes, rowSelected } = this.props

    return (
      <TableRow
        hover={true}
        className={classNames({
          [classes.root]: true,
        })}
        selected={rowSelected}
      >
        {this.props.children}
      </TableRow>
    )
  }
}

export default withStyles(bodyRowStyles)(MUIDataTableBodyRow)
