import classNames from "classnames"
import TableCell from "@material-ui/core/TableCell"
import { withStyles } from "@material-ui/core/styles"

const bodyCellStyles = {
  root: {},
  cellHide: {
    display: "none",
  },
}

class MUIDataTableBodyCell extends React.Component {
  handleClick = () => {
    const { colIndex, rowIndex, onCellClick } = this.props
    if (onCellClick) {
      onCellClick(colIndex, rowIndex)
    }
  }

  render() {
    const {
      children,
      classes,
      columnHeader,
      colIndex,
      rowIndex,
      onCellClick,
      // all props not explicitly extracted above get set as DOM attributes (?)
      ...otherProps
    } = this.props

    return [
      <TableCell
        key={1}
        className={classNames({
          [classes.root]: true,
          [classes.cellHide]: true,
        })}
      >
        {columnHeader}
      </TableCell>,
      <TableCell
        key={2}
        onClick={this.handleClick}
        className={classNames({
          [classes.root]: true,
        })}
        {...otherProps}
      >
        {children}
      </TableCell>,
    ]
  }
}

export default withStyles(bodyCellStyles)(MUIDataTableBodyCell)
