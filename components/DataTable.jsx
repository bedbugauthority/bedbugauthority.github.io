import React from "react"
import classNames from "classnames"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableHead from "@material-ui/core/TableHead"
import TablePagination from "@material-ui/core/TablePagination"
import TableRow from "@material-ui/core/TableRow"
import TableSortLabel from "@material-ui/core/TableSortLabel"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import Paper from "@material-ui/core/Paper"
import Checkbox from "@material-ui/core/Checkbox"
import IconButton from "@material-ui/core/IconButton"
import Tooltip from "@material-ui/core/Tooltip"
import DeleteIcon from "@material-ui/icons/Delete"
import FilterListIcon from "@material-ui/icons/FilterList"
import { lighten } from "@material-ui/core/styles/colorManipulator"
import SearchBar from "../components/SearchBar"
import BedBugProductData from "../data/BedBugProductData"
import ChevronRight from "@material-ui/icons/ChevronRight"

console.log("Imported data for " + BedBugProductData.length + " products.")
console.log(BedBugProductData)

const columnData = [
  {
    id: "productName",
    numeric: false,
    disablePadding: true,
    label: "Product Name",
    sortable: true,
  },
  {
    id: "manufacturer",
    numeric: false,
    disablePadding: false,
    label: "Manufacturer",
    sortable: true,
  },
  {
    id: "formulation",
    numeric: false,
    disablePadding: false,
    label: "Formulation",
    sortable: true,
  },
  {
    id: "activeIngredients",
    numeric: false,
    disablePadding: false,
    label: "Active Ingredients",
    sortable: false,
  },
  {
    id: "mattressApplication",
    numeric: false,
    disablePadding: false,
    label: "Mattress Application",
    sortable: true,
  },
  {
    id: "signalWord",
    numeric: false,
    disablePadding: false,
    label: "Signal Word",
    sortable: true,
  },
]

let counter = 0
function createData(
  productName,
  manufacturer,
  formulation,
  activeIngredients,
  mattressApplication,
  signalWord,
) {
  counter += 1
  return {
    id: counter,
    productName,
    manufacturer,
    formulation,
    activeIngredients,
    mattressApplication,
    signalWord,
  }
}

class DataTableHead extends React.Component {
  constructor(props) {
    super(props)
  }

  createSortHandler = (property) => (event) => {
    this.props.onRequestSort(event, property)
  }

  render() {
    const {
      onSelectAllClick,
      order,
      orderBy,
      numSelected,
      rowCount,
    } = this.props

    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={numSelected === rowCount}
              onChange={onSelectAllClick}
            />
          </TableCell>
          {columnData.map((column) => {
            return (
              <TableCell
                key={column.id}
                numeric={column.numeric}
                padding={column.disablePadding ? "none" : "default"}
                sortDirection={orderBy === column.id ? order : false}
              >
                {column.sortable ? (
                  <Tooltip
                    title="Sort"
                    placement={column.numeric ? "bottom-end" : "bottom-start"}
                    enterDelay={300}
                  >
                    <TableSortLabel
                      active={orderBy === column.id}
                      direction={order}
                      onClick={this.createSortHandler(column.id)}
                    >
                      {column.label}
                    </TableSortLabel>
                  </Tooltip>
                ) : (
                  column.label
                )}
              </TableCell>
            )
          }, this)}
        </TableRow>
      </TableHead>
    )
  }
}

DataTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
}

const toolbarStyles = (theme) => ({
  root: {
    paddingRight: theme.spacing.unit,
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  spacer: {
    flex: "1 1 100%",
  },
  actions: {
    color: theme.palette.text.secondary,
  },
  title: {
    flex: "0 0 auto",
  },
  searchBar: {
    flex: "0 0 auto",
  },
})

let DataTableToolbar = (props) => {
  const { numSelected, searchText, onSearchTextChange, classes } = props
  const isOpen = false

  return (
    <React.Fragment>
      <Toolbar
        className={classNames(classes.root, {
          [classes.highlight]: numSelected > 0,
        })}
      >
        <div className={classes.searchBar}>
          <SearchBar
            searchText={searchText}
            onSearchTextChange={onSearchTextChange}
          />
        </div>
        <div className={classes.spacer} />
        <div className={classes.title}>
          {numSelected > 0 ? (
            <Typography color="inherit" variant="subheading">
              {numSelected} selected
            </Typography>
          ) : (
            <Typography variant="title" id="tableTitle">
              Bed Bug Products
            </Typography>
          )}
        </div>
        <div className={classes.spacer} />
        <div className={classes.spacer} />
        <div className={classes.actions}>
          {numSelected > 0 ? (
            <Tooltip title="Delete">
              <IconButton aria-label="Delete">
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip title="Filter list">
              <IconButton aria-label="Filter list">
                <FilterListIcon />
              </IconButton>
            </Tooltip>
          )}
        </div>
      </Toolbar>
    </React.Fragment>
  )
}

DataTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  searchText: PropTypes.string.isRequired,
  onSearchTextChange: PropTypes.func.isRequired,
}

DataTableToolbar = withStyles(toolbarStyles)(DataTableToolbar)

const styles = (theme) => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 1020,
  },
  tableWrapper: {
    overflowX: "auto",
  },
  highlight: {
    backgroundColor: "yellow",
  },
})

const dataTableStyle = {
  display: "-webkit-flex",
  display: "flex",
  WebkitFlexDirection: "column",
  flexDirection: "column",
  minWidth: 1008,
  border: "1px solid black",
}

class DataTable extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      order: "asc",
      orderBy: "productName",
      selected: [],
      data: BedBugProductData.map((productData) =>
        createData.apply(this, columnData.map((col) => productData[col.id])),
      ).sort((a, b) => (a.productName < b.productName ? -1 : 1)),
      page: 0,
      rowsPerPage: 5,
      searchText: "",
    }
    this.handleSearchTextChange = this.handleSearchTextChange.bind(this)
  }

  handleRequestSort = (event, property) => {
    const orderBy = property
    let order = "desc"

    if (this.state.orderBy === property && this.state.order === "desc") {
      order = "asc"
    }

    const data =
      order === "desc"
        ? this.state.data.sort((a, b) => (b[orderBy] < a[orderBy] ? -1 : 1))
        : this.state.data.sort((a, b) => (a[orderBy] < b[orderBy] ? -1 : 1))

    this.setState({ data, order, orderBy })
  }

  handleSelectAllClick = (event, checked) => {
    if (checked) {
      this.setState({ selected: this.state.data.map((n) => n.id) })
      return
    }
    this.setState({ selected: [] })
  }

  handleClick = (event, id) => {
    const { selected } = this.state
    const selectedIndex = selected.indexOf(id)
    let newSelected = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      )
    }

    this.setState({ selected: newSelected })
  }

  handleSearchTextChange = (searchText) =>
    this.setState({ searchText: searchText })

  handleChangePage = (event, page) => {
    this.setState({ page })
  }

  handleChangeRowsPerPage = (event) => {
    this.setState({ rowsPerPage: event.target.value })
  }

  searchHighlighter = (searchText, text) => {
    const regex = new RegExp("(" + searchText + ")", "gim")
    const blocks = text.split(regex)
    console.log("blocks:", blocks)
    return (
      <React.Fragment>
        {blocks.map((block) => {
          if (block.match(regex)) {
            return <span className={this.props.classes.highlight}>{block}</span>
          } else {
            return <span>{block}</span>
          }
        })}
      </React.Fragment>
    )
  }

  /*
    <React.Fragment>{blocks.join(<span>searchText</span>)}</React.Fragment>

    {blocks.map((block) => {
      if (block.match(regex)) {
        return <span>{block}</span>
      } else {
        return <span>{block}</span>
      }
    })}
  */

  isSelected = (id) => this.state.selected.indexOf(id) !== -1

  render() {
    const { classes } = this.props
    const {
      data,
      order,
      orderBy,
      selected,
      rowsPerPage,
      page,
      searchText,
    } = this.state
    const emptyRows =
      rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage)

    return (
      <React.Fragment>
        <Paper className={classes.root}>
          <DataTableToolbar
            numSelected={selected.length}
            searchText={this.state.searchText}
            onSearchTextChange={this.handleSearchTextChange}
          />
          <div className={classes.tableWrapper}>
            <Table className={classes.table} aria-labelledby="tableTitle">
              <DataTableHead
                columnData={this.props.columnData}
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={this.handleSelectAllClick}
                onRequestSort={this.handleRequestSort}
                rowCount={data.length}
              />
              <TableBody>
                {data
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((n) => {
                    const isSelected = this.isSelected(n.id)
                    return (
                      <TableRow
                        hover
                        onClick={(event) => this.handleClick(event, n.id)}
                        role="checkbox"
                        aria-checked={isSelected}
                        tabIndex={-1}
                        key={n.id}
                        selected={isSelected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox checked={isSelected} />
                        </TableCell>
                        <TableCell component="th" scope="row" padding="none">
                          {searchText.length === 0
                            ? n.productName
                            : this.searchHighlighter(searchText, n.productName)}
                        </TableCell>
                        <TableCell>
                          {searchText.length === 0
                            ? n.manufacturer
                            : this.searchHighlighter(
                                searchText,
                                n.manufacturer,
                              )}
                        </TableCell>
                        <TableCell>
                          {searchText.length === 0
                            ? n.formulation
                            : this.searchHighlighter(searchText, n.formulation)}
                        </TableCell>
                        <TableCell>
                          {searchText.length === 0
                            ? JSON.stringify(n.activeIngredients)
                            : this.searchHighlighter(
                                searchText,
                                JSON.stringify(n.activeIngredients),
                              )}
                        </TableCell>
                        <TableCell>
                          {searchText.length === 0
                            ? n.mattressApplication
                            : this.searchHighlighter(
                                searchText,
                                n.mattressApplication,
                              )}
                        </TableCell>
                        <TableCell>
                          {searchText.length === 0
                            ? n.signalWord
                            : this.searchHighlighter(searchText, n.signalWord)}
                        </TableCell>
                      </TableRow>
                    )
                  })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 49 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <TablePagination
            component="div"
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            backIconButtonProps={{
              "aria-label": "Previous Page",
            }}
            nextIconButtonProps={{
              "aria-label": "Next Page",
            }}
            onChangePage={this.handleChangePage}
            onChangeRowsPerPage={this.handleChangeRowsPerPage}
          />
        </Paper>
        <p>{this.state.searchText}</p>
      </React.Fragment>
    )
  }
}

/*
const dataItems = {
  FMC: true,
  Bayer: true,
  Amvac: true,
}

const filterBarItems = {
  Manufacturers: ["FMC", "Bayer", "Amvac"],
  Formulations: ["WP", "EC", "A", "D", "SC"],
  "Mattress Application": ["Yes", "No"],
  "Active Ingredient": [
    "acetamiprid",
    "bifenthrin",
    "pyrethrins",
    "deltamethrin",
  ],
}

        <FilterCard label="Manufacturers">
          <CheckboxesGroup dataItems={dataItems} />
        </FilterCard>
        <FilterCard label="other">
          <ToggleGroup dataItems={dataItems} />
        </FilterCard>
*/

DataTable.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(DataTable)
