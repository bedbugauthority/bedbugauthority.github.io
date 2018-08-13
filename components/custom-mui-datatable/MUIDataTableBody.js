import PropTypes from "prop-types"
import Typography from "@material-ui/core/Typography"
import TableBody from "@material-ui/core/TableBody"
import MUIDataTableBodyCell from "./MUIDataTableBodyCell"
import MUIDataTableBodyRow from "./MUIDataTableBodyRow"
import MUIDataTableSelectCell from "./MUIDataTableSelectCell"
import { withStyles } from "@material-ui/core/styles"
import textLabels from "./textLabels"

const bodyStyles = {
  root: {},
  emptyTitle: {
    textAlign: "center",
  },
}

class MUIDataTableBody extends React.Component {
  static propTypes = {
    /** Data used to describe table */
    data: PropTypes.array.isRequired,
    /** Total number of data rows */
    count: PropTypes.number.isRequired,
    /** Columns used to describe table */
    columns: PropTypes.array.isRequired,
    /** Data used to filter table against */
    filterList: PropTypes.array,
    /** Table rows selected */
    selectedRows: PropTypes.object,
    /** Callback to trigger table row select */
    onSelectRowUpdate: PropTypes.func,
    /** Data used to search table against */
    searchText: PropTypes.string,
    /** Extend the style applied to components */
    classes: PropTypes.object,
  }

  buildRows() {
    const { data, page, rowsPerPage, count } = this.props

    let rows = []
    const totalPages = Math.floor(count / rowsPerPage)
    const fromIndex = page === 0 ? 0 : page * rowsPerPage
    const toIndex = Math.min(count, (page + 1) * rowsPerPage)

    for (
      let rowIndex = fromIndex;
      rowIndex < count && rowIndex < toIndex;
      rowIndex++
    ) {
      if (data[rowIndex] !== undefined) rows.push(data[rowIndex])
    }

    return rows.length ? rows : null
  }

  getRowIndex(index) {
    const { page, rowsPerPage } = this.props
    const startIndex = page === 0 ? 0 : page * rowsPerPage

    return startIndex + index
  }

  isRowSelected(index) {
    const { selectedRows } = this.props
    return selectedRows.lookup && selectedRows.lookup[index] ? true : false
  }

  handleRowSelect = (data) => {
    this.props.onSelectRowUpdate("cell", data)
  }

  render() {
    const { classes, columns, onCellClick } = this.props
    const tableRows = this.buildRows()

    return (
      <TableBody>
        {tableRows ? (
          tableRows.map(({ data: row, dataIndex }, rowIndex) => (
            <MUIDataTableBodyRow
              rowSelected={this.isRowSelected(rowIndex)}
              key={rowIndex}
            >
              {
                <MUIDataTableSelectCell
                  onChange={this.handleRowSelect.bind(null, {
                    index: this.getRowIndex(rowIndex),
                    dataIndex: dataIndex,
                  })}
                  checked={this.isRowSelected(this.getRowIndex(rowIndex))}
                />
              }
              {row.map(
                (column, index) =>
                  columns[index].display ? (
                    <MUIDataTableBodyCell
                      rowIndex={rowIndex}
                      colIndex={index}
                      columnHeader={columns[index].name}
                      key={index}
                      onCellClick={onCellClick}
                    >
                      {column}
                    </MUIDataTableBodyCell>
                  ) : (
                    false
                  ),
              )}
            </MUIDataTableBodyRow>
          ))
        ) : (
          <MUIDataTableBodyRow>
            <MUIDataTableBodyCell
              colSpan={columns.length + 1}
              colIndex={0}
              rowIndex={0}
            >
              <Typography variant="subheading" className={classes.emptyTitle}>
                {textLabels.body.noMatch}
              </Typography>
            </MUIDataTableBodyCell>
          </MUIDataTableBodyRow>
        )}
      </TableBody>
    )
  }
}

export default withStyles(bodyStyles)(MUIDataTableBody)
