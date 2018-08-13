import classNames from "classnames"
import TableHead from "@material-ui/core/TableHead"
import MUIDataTableHeadRow from "./MUIDataTableHeadRow"
import MUIDataTableHeadCell from "./MUIDataTableHeadCell"
import MUIDataTableSelectCell from "./MUIDataTableSelectCell"
import { withStyles } from "@material-ui/core/styles"

const headStyles = {
  main: {},
}

class MUIDataTableHead extends React.Component {
  state = {
    activeColumn: null,
  }

  componentDidMount() {
    this.props.handleHeadUpdateRef(this.handleUpdateCheck)
  }

  handleToggleSortColumn = (index) => {
    this.setState(() => ({
      activeColumn: index,
    }))
    this.props.onToggleSortColumn(index)
  }

  handleRowSelect = () => {
    this.props.onSelectRowUpdate("head", null)
  }

  render() {
    const { classes, columns, count, data, page, selectedRows } = this.props

    const numSelected = (selectedRows && selectedRows.data.length) || 0
    const isDeterminate = numSelected > 0 && numSelected < count
    const isChecked = numSelected === count ? true : false

    return (
      <TableHead className={classes.main}>
        <MUIDataTableHeadRow>
          <MUIDataTableSelectCell
            onChange={this.handleRowSelect.bind(null)}
            indeterminate={isDeterminate}
            checked={isChecked}
          />
          {columns.map(
            (column, index) =>
              column.display &&
              (column.customHeadRender ? (
                column.customHeadRender(
                  { index, ...column },
                  this.handleToggleColumn,
                )
              ) : (
                <MUIDataTableHeadCell
                  key={index}
                  index={index}
                  type={"cell"}
                  sort={column.sort}
                  sortDirection={column.sortDirection}
                  onToggleSortColumn={this.handleToggleSortColumn}
                >
                  {column.name}
                </MUIDataTableHeadCell>
              )),
          )}
        </MUIDataTableHeadRow>
      </TableHead>
    )
  }
}

export default withStyles(headStyles)(MUIDataTableHead)
