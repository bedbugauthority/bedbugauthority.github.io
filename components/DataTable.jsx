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
import ClearIcon from "@material-ui/icons/Clear"
import DownloadIcon from "@material-ui/icons/CloudDownload"
import FilterListIcon from "@material-ui/icons/FilterList"
import { lighten } from "@material-ui/core/styles/colorManipulator"
import SearchBar from "../components/SearchBar"
import CellContents from "../components/CellContents"
import BedBugProductData from "../data/BedBugProductData"
import { columnData } from "../data/BedBugMetaData"
import MUIDataTable from "mui-datatables"

import Drawer from "@material-ui/core/Drawer"
import List from "@material-ui/core/List"
import ChevronRightIcon from "@material-ui/icons/ChevronRight"
import Divider from "@material-ui/core/Divider"
import { mailFolderListItems, otherMailFolderListItems } from "./tileData"

import Todos from "../components/Todos"

console.log("Imported data for " + BedBugProductData.length + " products.")
console.log(BedBugProductData)

let counter = 0
function createData(
  productName,
  manufacturer,
  formulation,
  activeIngredients,
  mattressApplication,
  labelApplications,
  labelRestrictions,
  epaRegisteredLabelClaims,
  otherReferencedProductAttributes,
  signalWord,
  ppe,
  specimenLabel,
  safetyDataSheet,
  labelDate,
  reference,
) {
  counter += 1
  return {
    id: counter,
    productName,
    manufacturer,
    formulation,
    activeIngredients,
    mattressApplication,
    labelApplications,
    labelRestrictions,
    epaRegisteredLabelClaims,
    otherReferencedProductAttributes,
    signalWord,
    ppe,
    specimenLabel,
    safetyDataSheet,
    labelDate,
    reference,
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
                numeric={column.type === "numeric"}
                padding={column.disablePadding ? "none" : "default"}
                sortDirection={orderBy === column.id ? order : false}
              >
                {column.sortable ? (
                  <Tooltip
                    title="Sort"
                    placement={
                      column.type === "numeric" ? "bottom-end" : "bottom-start"
                    }
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
    display: "flex",
    alignItems: "center",
  },
  searchBar: {
    flex: "0 0 auto",
  },
  hide: {
    display: "none",
  },
})

let DataTableToolbar = (props) => {
  const {
    numSelected,
    searchText,
    onSearchTextChange,
    filterDrawerOpen,
    handleFilterDrawerOpen,
    handleClearSelection,
    classes,
  } = props
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
            <React.Fragment>
              <Typography color="inherit" variant="subheading">
                {numSelected} selected
              </Typography>
              <Tooltip title="Clear Selection">
                <IconButton
                  aria-label="Clear Selection"
                  onClick={handleClearSelection}
                >
                  <ClearIcon />
                </IconButton>
              </Tooltip>
            </React.Fragment>
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
            <Tooltip title="Download Rows">
              <IconButton aria-label="Download">
                <DownloadIcon />
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip title="Show Filters">
              <IconButton
                aria-label="Filter list"
                onClick={handleFilterDrawerOpen}
                className={filterDrawerOpen ? classes.hide : ""}
              >
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

const drawerWidth = 240

const tempStyles = (theme) => ({
  dataTableFrame: {
    zIndex: 1,
    overflow: "auto",
    position: "relative",
    display: "flex",
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  dataTableContent: {
    flexGrow: 1,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  dataTableContentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: 0,
  },
  slider: {
    position: "absolute",
    width: drawerWidth,
    height: "auto",
    transform: "translateX(-100%)",
  },
  slideIn: {
    animation: "slide-in 0.5s forwards",
  },
  slideOut: {
    animation: "slide-out 0.5s forwards",
  },
  "@keyframes slideIn": {
    "100%": {
      transform: "translateX(0%)",
    },
  },
  "@keyframes slideOut": {
    "0%": {
      transform: "translateX(0%)",
    },
    "100%": {
      transform: "translateX(-100%)",
    },
  },
})

const styles = (theme) => ({
  dataTableContentWrapper: {
    zIndex: 1,
    overflow: "auto",
    position: "relative",
    display: "flex",
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    //backgroundColor: "lightgreen",
  },
  dataTableContent: {
    flexGrow: 1,
  },
  tableWrapper: {
    overflowX: "auto",
  },
  table: {
    //backgroundColor: "lightblue",
  },
  drawerWrapper: {
    //backgroundColor: "yellow",
  },
  drawerPaper: {
    position: "relative",
    height: "auto",
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
})

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
      rowsPerPage: 3,
      searchText: "",
      filterDrawerOpen: false,
    }
  }

  handleFilterDrawerOpen = () => {
    this.setState({ filterDrawerOpen: true })
  }

  handleFilterDrawerClose = () => {
    this.setState({ filterDrawerOpen: false })
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
    this.handleClearSelection(event)
  }

  handleClearSelection = (event) => {
    this.setState({ selected: [] })
  }

  handleRowClick = (event, id) => {
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
      filterDrawerOpen,
    } = this.state

    const emptyRows =
      rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage)

    const filterDrawer = (
      <div
        className={classNames(
          (classes.drawerWrapper,
          classes.slider,
          {
            [classes.slideIn]: filterDrawerOpen,
            [classes.slideOut]: !filterDrawerOpen,
          }),
        )}
      >
        <Drawer
          variant="persistent"
          anchor="right"
          open={filterDrawerOpen}
          classes={{ paper: classes.drawerPaper }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={this.handleFilterDrawerClose}>
              <ChevronRightIcon />
            </IconButton>
          </div>
          <Divider />
          <List>{mailFolderListItems}</List>
          <Divider />
          <List>{otherMailFolderListItems}</List>
        </Drawer>
      </div>
    )

    /* classNames example:
      <div
        className={classNames(classes.dataTableContent, {
          [classes.dataTableContentShift]: filterDrawerOpen,
        })}
      >
    */

    return (
      <React.Fragment>
        <Paper className={classes.dataTableContentWrapper}>
          <div className={classes.dataTableContent}>
            <DataTableToolbar
              numSelected={selected.length}
              searchText={searchText}
              onSearchTextChange={this.handleSearchTextChange}
              filterDrawerOpen={filterDrawerOpen}
              handleFilterDrawerOpen={this.handleFilterDrawerOpen}
              handleClearSelection={this.handleClearSelection}
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
                          onClick={(event) => this.handleRowClick(event, n.id)}
                          role="checkbox"
                          aria-checked={isSelected}
                          tabIndex={-1}
                          key={n.id}
                          selected={isSelected}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox checked={isSelected} />
                          </TableCell>
                          {columnData.map((column) => {
                            return (
                              <TableCell
                                key={column.id}
                                scope="row"
                                padding={
                                  column.type === "numeric" ? "default" : "none"
                                }
                              >
                                <CellContents
                                  contents={n[column.id]}
                                  searchText={searchText}
                                />
                              </TableCell>
                            )
                          })}
                        </TableRow>
                      )
                    })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 49 * emptyRows }}>
                      <TableCell colSpan={columnData.length + 1} />
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
          </div>
        </Paper>
        <Todos searchText={searchText} />
        <MUIDataTable
          title={"ACME Employee list"}
          data={[
            ["Gabby George", "Business Analyst", "Minneapolis", 30, "$100,000"],
            ["Aiden Lloyd", "Business Consultant", "Dallas", 55, "$200,000"],
            ["Jaden Collins", "Attorney", "Santa Ana", 27, "$500,000"],
            [
              "Franky Rees",
              "Business Analyst",
              "St. Petersburg",
              22,
              "$50,000",
            ],
            ["Aaren Rose", "Business Consultant", "Toledo", 28, "$75,000"],
            [
              "Blake Duncan",
              "Business Management Analyst",
              "San Diego",
              65,
              "$94,000",
            ],
            [
              "Frankie Parry",
              "Agency Legal Counsel",
              "Jacksonville",
              71,
              "$210,000",
            ],
            ["Lane Wilson", "Commercial Specialist", "Omaha", 19, "$65,000"],
            ["Robin Duncan", "Business Analyst", "Los Angeles", 20, "$77,000"],
            [
              "Mel Brooks",
              "Business Consultant",
              "Oklahoma City",
              37,
              "$135,000",
            ],
            ["Harper White", "Attorney", "Pittsburgh", 52, "$420,000"],
            ["Kris Humphrey", "Agency Legal Counsel", "Laredo", 30, "$150,000"],
            ["Frankie Long", "Industrial Analyst", "Austin", 31, "$170,000"],
            ["Brynn Robbins", "Business Analyst", "Norfolk", 22, "$90,000"],
            ["Justice Mann", "Business Consultant", "Chicago", 24, "$133,000"],
            [
              "Addison Navarro",
              "Business Management Analyst",
              "New York",
              50,
              "$295,000",
            ],
            ["Jesse Welch", "Agency Legal Counsel", "Seattle", 28, "$200,000"],
            [
              "Eli Mejia",
              "Commercial Specialist",
              "Long Beach",
              65,
              "$400,000",
            ],
            ["Gene Leblanc", "Industrial Analyst", "Hartford", 34, "$110,000"],
            ["Danny Leon", "Computer Scientist", "Newark", 60, "$220,000"],
            ["Lane Lee", "Corporate Counselor", "Cincinnati", 52, "$180,000"],
            ["Jesse Hall", "Business Analyst", "Baltimore", 44, "$99,000"],
            ["Danni Hudson", "Agency Legal Counsel", "Tampa", 37, "$90,000"],
            [
              "Terry Macdonald",
              "Commercial Specialist",
              "Miami",
              39,
              "$140,000",
            ],
            ["Justice Mccarthy", "Attorney", "Tucson", 26, "$330,000"],
            ["Silver Carey", "Computer Scientist", "Memphis", 47, "$250,000"],
            ["Franky Miles", "Industrial Analyst", "Buffalo", 49, "$190,000"],
            ["Glen Nixon", "Corporate Counselor", "Arlington", 44, "$80,000"],
            [
              "Gabby Strickland",
              "Business Process Consultant",
              "Scottsdale",
              26,
              "$45,000",
            ],
            [
              "Mason Ray",
              "Computer Scientist",
              "San Francisco",
              39,
              "$142,000",
            ],
          ]}
          columns={["Name", "Title", "Location", "Age", "Salary"]}
          options={{ filterType: "dropdown", responsive: "scroll" }}
        />
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
