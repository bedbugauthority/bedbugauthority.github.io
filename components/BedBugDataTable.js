import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import PropTypes from "prop-types";
import { cloneDeep } from "lodash";

import { MultiGrid, AutoSizer } from "react-virtualized";

import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";

import MoreInfoIcon from "../components/MoreInfoIcon";

import MUIDataTableToolbar from "./MUIDataTableToolbar";
import MUIDataTableToolbarSelect from "./MUIDataTableToolbarSelect";
import MUIDataTableFilterList from "./MUIDataTableFilterList";
import CellContents from "../components/CellContents";
import PaperScrollDialog from "../components/PaperScrollDialog";

import columnData from "../data/BedBugColumnData";
import productData from "../data/BedBugProductData";
import textLabels from "../data/textLabels";
import resource_list from "../data/resource_list.json";
import { resourceLookup, parseORPAColumn } from "../lib/helperFunctions";

const DEBUG = false;

const tableStyles = theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    flex: "1 1 auto",
    height: "100vh"
  },
  toolbar: {
    flex: "0 0 auto"
  },
  tableContainer: {
    flex: "1 1 auto"
  },
  table: {
    fontFamily: "Roboto, Helvetica, Arial, sans-serif"
  },
  headerIconContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  },
  sortIcon: {
    height: 16,
    width: 16,
    marginLeft: 8
  },
  tableCellContainer: {
    display: "flex",
    flexDirection: "row"
  },
  cell: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: 0
  },
  headCell: {
    fontSize: "0.75rem",
    fontWeight: "500",
    borderBottom: "1px solid gray",
    borderRight: "1px solid rgba(224, 224, 224, 1)"
  },
  fixedColumnCell: {
    fontSize: "0.8125rem",
    fontWeight: "500",
    borderRight: "1px solid gray",
    alignItems: "center",
    textAlign: "center",
    flexDirection: "row"
  },
  bodyCell: {
    borderRight: "1px solid rgba(224, 224, 224, 1)"
  },
  background_red: { backgroundColor: "Red" },
  background_orange: { backgroundColor: "OrangeRed" },
  background_yellow: { backgroundColor: "Gold" },
  background_green: { backgroundColor: "SpringGreen" },
  cellContents: {},
  headCellContents: {},
  sortableHeadCellContents: {
    cursor: "pointer"
  },
  bodyCellContents: {
    fontSize: "0.8125rem",
    fontWeight: "400"
  },
  cellSelected: {
    backgroundColor: theme.palette.grey[100]
  },
  cellHovered: {
    backgroundColor: theme.palette.grey[200]
  },
  dialogCell: {
    border: "0px solid black"
  },
  footer: {
    display: "flex",
    justifyContent: "center",
    flex: "0 0 auto",
    backgroundColor: "gray"
  },
  footerContent: {}
});

class BedBugDataTable extends React.Component {
  constructor() {
    super();

    this.tableRef = false;
    this.resourceList = resource_list;

    /* save the style set by react-virtualized's table CellRenderer so we can
         reuse the style in our dialog */
    this.cellStyle = null;

    // list of displayed columns - properties: {id, name, columnIndex, displayIndex}
    this.displayColumns = columnData.reduce((result, column, columnIndex) => {
      if (column.visible) {
        result.push({
          id: column.id,
          name: column.textLabel,
          type: column.type,
          columnIndex: columnIndex,
          displayIndex: result.length
        });
      }
      return result;
    }, []);

    const initialDisplayData = productData.map(product =>
      [product["id"]].concat(
        this.displayColumns.map(column => product[column.id])
      )
    );

    // build index of text (organized by column) for removing columns that don't match the search text
    this.textIndex = columnData.map(column =>
      productData.reduce((columnResult, productRow) => {
        const productId = productRow["id"];
        const productValue = productRow[column.id];
        switch (column.type) {
          case "dictionary":
            for (const key in productValue) {
              const text = key + ": " + productValue[key];
              if (!columnResult[text]) {
                columnResult[text] = [productId];
              } else {
                columnResult[text].push(productId);
              }
            }
            break;
          case "list":
            for (const index in productValue) {
              if (!columnResult[productValue[index]]) {
                columnResult[productValue[index]] = [productId];
              } else {
                columnResult[productValue[index]].push(productId);
              }
            }
            break;
          case "list_custom1":
            const list = parseORPAColumn(productValue);
            for (const index in list) {
              if (!columnResult[list[index]]) {
                columnResult[list[index]] = [productId];
              } else {
                columnResult[list[index]].push(productId);
              }
            }
            break;
          case "string":
          case "link":
          case "date":
            if (!columnResult[productValue]) {
              columnResult[productValue] = [productId];
            } else {
              columnResult[productValue].push(productId);
            }
            break;
          default:
            if (DEBUG) {
              console.log("WARNING: Unexpected column.type:", column.type);
            }
            break;
        }

        return columnResult;
      }, {})
    );

    this.initialFilterData = columnData.map(column =>
      productData.reduce((columnResult, productRow) => {
        const productValue = productRow[column.id];
        switch (column.type) {
          case "dictionary":
            for (const key in productValue) {
              if (columnResult.indexOf(key) === -1) {
                columnResult.push(key);
              }
            }
            break;
          case "list":
            for (const index in productValue) {
              if (columnResult.indexOf(productValue[index]) === -1) {
                columnResult.push(productValue[index]);
              }
            }
            break;
          case "list_custom1":
            // The column otherReferencedProductAttributes is not filterable
            break;
          case "string":
          case "link":
          case "date":
            if (columnResult.indexOf(productValue) === -1) {
              columnResult.push(productValue);
            }
            break;
          default:
            if (DEBUG) {
              console.log("WARNING: Unexpected column.type:", column.type);
            }
            break;
        }

        return columnResult.sort();
      }, [])
    );

    this.state = {
      // 2D array containing data to display
      displayData: initialDisplayData,
      // table index of the hovered row
      hoveredRow: null,
      // table indices of the selected rows
      selectedRows: {
        data: [],
        lookup: {}
      },
      // one array of unique column values per row in column data
      filterData: cloneDeep(this.initialFilterData),
      // one element per column in columnData
      filterList: columnData.map(() => []),
      // user input from search field
      searchText: "",
      // list of product ids that have content matching the search text
      searchMatchProductIds: [],
      // index of column sorted by, default: productData order
      sortColumnIndex: null,
      // sortDirection: "asc" or "desc"
      sortDirection: "asc",
      // used by popover dialog component
      cellDialog: {
        open: false,
        row: null,
        column: null
      },
      // true on first render, false otherwise
      initialUpdate: true
    };
    if (DEBUG) {
      console.log("columnData: ", columnData);
      console.log("productData: ", productData);
    }
  }

  /* Call this when table data is updated, but number of rows stays the same. */
  forceTableRefresh() {
    this.multiGridRef.forceUpdateGrids();
  }

  /* Call this when number of rows might change (e.g. on sort/filter update). */
  updateDisplayData = () => {
    // recalculate displayData from scratch
    this.setState(prevState => {
      var displayData = productData.reduce((result, product) => {
        const productId = product["id"];
        var filteredOut = false;

        // check that product meets search criteria
        if (
          prevState.searchText.length > 0 &&
          !prevState.searchMatchProductIds[productId]
        ) {
          filteredOut = true;
        }

        // check that product meets filter criteria
        const productRow = this.displayColumns.reduce(
          (rowResult, column, columnIndex) => {
            if (filteredOut) return [];

            const cellData = product[column.id];
            const filters = prevState.filterList[columnIndex];

            if (!this.meetsFilterCriteria(cellData, column.type, filters))
              filteredOut = true;

            rowResult.push(product[column.id]);
            return rowResult;
          },
          [productId]
        );
        if (!filteredOut) result.push(productRow);
        return result;
      }, []);

      const { sortColumnIndex, sortDirection } = prevState;
      if (sortColumnIndex !== null) {
        console.log("sortAsType:", columnData[sortColumnIndex].sortAsType);
        const columnSorter = this.getColumnSorter(
          columnData[sortColumnIndex].sortAsType
        );

        displayData.sort(columnSorter(prevState.sortColumnIndex + 1)); // +1 because first displaydata row is id (not displayed)
        if (prevState.sortDirection === "asc") {
          displayData.reverse();
        }
      }

      return {
        displayData: displayData,
        initialUpdate: false
      };
    });

    // refresh display with new state
    this.forceTableRefresh();
  };

  getColumnSorter = sortAsType => {
    if (sortAsType === "duration") {
      return this.durationColumnSorter;
    }
    return this.standardColumnSorter;
  };

  standardColumnSorter = sortByIndex => {
    return function(rowA, rowB) {
      return this.genericSort(rowA[sortByIndex], rowB[sortByIndex]);
    }.bind(this);
  };

  // Untested, unused. Change to generic category column sorter?
  signalWordColumnSorter = sortByIndex => {
    return function(rowA, rowB) {
      const orderMap = {
        None: 0,
        Caution: 1,
        Warning: 2,
        Danger: 3
      };
      const mappedA =
        rowA[sortByIndex] in orderMap ? orderMap[rowA[sortByIndex]] : 100;
      const mappedB =
        rowB[sortByIndex] in orderMap ? orderMap[rowB[sortByIndex]] : 100;
      return genericSort(mappedA, mappedB);
    };
  };

  durationColumnSorter = sortByIndex => {
    // find first mention of "XX Days/Weeks/Etc", convert to days, and compare as usual

    return function(rowA, rowB) {
      const durationToDaysMap = {
        day: 1,
        week: 7,
        month: 30,
        year: 365,
        unknown: -1
      };

      const myRegexp = /(\d+ (?:day|week|month|year))/;

      const regexA = myRegexp.exec(rowA[sortByIndex][0] || "");
      const regexB = myRegexp.exec(rowB[sortByIndex][0] || "");
      const piecesA = (regexA ? regexA[0] : "1 unknown").split(" ");
      const piecesB = (regexB ? regexB[0] : "1 unknown").split(" ");
      // (e.g. piecesA = ['2', 'weeks'], piecesB = ['1', 'unknown'])

      // if no data, assign lowest duration
      if (piecesA.length !== 2) {
        return -1;
      } else if (piecesB.length !== 2) {
        return 1;
      }
      // approximate number of days
      const daysA = parseInt(piecesA[0]) * durationToDaysMap[piecesA[1]];
      const daysB = parseInt(piecesB[0]) * durationToDaysMap[piecesB[1]];
      return this.genericSort(daysA, daysB);
    }.bind(this);
  };

  genericSort = (A, B) => {
    if (A === B) {
      return 0;
    } else {
      return A < B ? -1 : 1;
    }
  };

  meetsFilterCriteria = (cellData, columnType, filters) => {
    // if no filters are active:
    if (filters.length === 0) return true;

    var meetsOneFilter = false;
    switch (columnType) {
      case "dictionary":
        for (const filterIndex in filters) {
          if (Object.keys(cellData).indexOf(filters[filterIndex]) >= 0) {
            meetsOneFilter = true;
          }
        }
        break;
      case "list":
        for (const filterIndex in filters) {
          if (cellData.indexOf(filters[filterIndex]) >= 0) {
            meetsOneFilter = true;
          }
        }
        break;
      case "list_custom1":
        for (const filterIndex in filters) {
          if (cellData.indexOf(filters[filterIndex]) >= 0) {
            meetsOneFilter = true;
          }
        }
        break;
      case "string":
        for (const filterIndex in filters) {
          if (cellData == filters[filterIndex]) {
            meetsOneFilter = true;
          }
        }
        break;
    }
    return meetsOneFilter;
  };

  cellRenderer = ({ rowIndex, columnIndex, key, style, isInDialog }) => {
    const { classes } = this.props;
    const {
      hoveredRow,
      selectedRows,
      displayData,
      sortColumnIndex,
      sortDirection
    } = this.state;

    if (isInDialog) {
      if (!rowIndex || !columnIndex) {
        return false;
      }
    }

    const column = columnData[columnIndex];

    const isHeader = rowIndex === 0;
    const isSortableHeader = isHeader && column.sortable;
    const isStickyColumn = columnIndex === 0;
    const isBodyCell = !isHeader && !isStickyColumn;
    const isHovered = rowIndex > 0 && rowIndex && !isInDialog === hoveredRow;
    const isSelected = rowIndex in selectedRows.lookup;
    const hasBiggerDialogMargins = column.biggerDialogMargins;

    const searchText = isHeader ? "" : this.state.searchText;
    var contents = isHeader
      ? column.textLabel
      : displayData[rowIndex - 1][columnIndex + 1]; // first row is header, first column is product id (not actually displayed)

    if (!contents && contents !== "") {
      if (DEBUG) {
        console.log(
          "ERROR: no contents for ( rowIndex , columnIndex ) --> (",
          rowIndex,
          ",",
          columnIndex,
          ")"
        );
      }
      contents = rowIndex - 1 + ", " + columnIndex;
    }

    const handleCellClick = (rowIndex, columnIndex) => {
      if (rowIndex === 0 && columnData[columnIndex].sortable) {
        this.handleToggleSortColumn(columnIndex);
      }
      // TODO: change if to check cell state and only expand cell when it has been truncated
      if (rowIndex > 0 && columnIndex > 0) {
        this.handleClickOpenDialog(rowIndex, columnIndex);
      }
      return false;
    };

    var backgroundClass = null;
    if (rowIndex > 0 && column.backgroundStyleTextMatcher) {
      backgroundClass =
        classes["background_" + column.backgroundStyleTextMatcher[contents]];
    }

    const cellClassName = classNames(classes.cell, {
      [classes.headCell]: isHeader,
      [classes.sortableHeadCell]: isSortableHeader,
      [classes.fixedColumnCell]: isStickyColumn,
      [classes.bodyCell]: isBodyCell,
      [classes.cellHovered]: isHovered,
      [classes.cellSelected]: isSelected,
      [backgroundClass]: column.backgroundStyleTextMatcher,
      [classes.dialogCell]: isInDialog // last in list to override border assignment
    });

    const cellContentsClassName = classNames(classes.cellContents, {
      [classes.headCellContents]: isHeader,
      [classes.bodyCellContents]: isBodyCell,
      [classes.sortableHeadCellContents]: isSortableHeader
    });

    //TODO: add mark to truncated cells (problem: how to detect elipsized cells?)
    return (
      <TableCell
        component="div"
        className={cellClassName}
        key={key}
        style={style}
        onMouseEnter={() => {
          this.setState({ hoveredRow: rowIndex });
          this.forceTableRefresh();
        }}
        onMouseLeave={() => {
          this.setState({ hoveredRow: null });
          this.forceTableRefresh();
        }}
        onClick={handleCellClick.bind(null, rowIndex, columnIndex)}
      >
        <span className={classes.tableCellContainer}>
          {isHeader && columnIndex == sortColumnIndex ? (
            <React.Fragment>
              {sortDirection == "desc" ? (
                <span className={classes.headerIconContainer}>
                  <ArrowDownwardIcon className={classes.sortIcon} />
                </span>
              ) : (
                <span className={classes.headerIconContainer}>
                  <ArrowUpwardIcon className={classes.sortIcon} />
                </span>
              )}
            </React.Fragment>
          ) : (
            false
          )}
          <CellContents
            className={cellContentsClassName}
            contents={contents}
            backgroundToolStyles={column.backgroundToolStyles}
            contentsType={isHeader ? "string" : column.type}
            width={isInDialog ? 500 : column.width}
            biggerListSpacing={
              isInDialog ? column.biggerDialogListSpacing : false
            }
            searchText={searchText}
            wrap={isInDialog || isHeader || isStickyColumn}
            refType={column.id}
            linkResourceName={
              column.type === "link"
                ? this.refLookupByRowIx(rowIndex, column.id)
                : null
            }
            productId={
              column.type === "link" ? this.productIdLookup(rowIndex) : null
            }
            resourceLookup={rowIndex > 0 ? resourceLookup : null}
          />
          {false && isHeader && column.helpText ? (
            <MoreInfoIcon hoverText={column.helpText} />
          ) : null}
        </span>
      </TableCell>
    );
  };

  productIdLookup = rowIndex => {
    if (rowIndex <= 0) {
      return "";
    }
    return this.state.displayData[rowIndex - 1][0]; // first column (not displayed) is product id
  };

  refLookupByRowIx = (rowIndex, refType) => {
    if (rowIndex <= 0) {
      return null;
    }
    const productId = this.productIdLookup(rowIndex);
    return resourceLookup(productId, refType);
  };

  handleFilterUpdate = (columnIndex, filterValue, filterType) => {
    // update FilterList
    this.setState(prevState => {
      var filterList = cloneDeep(prevState.filterList);
      filterList[columnIndex] = filterValue === "" ? [] : filterValue.sort();
      return { filterList: filterList };
    });
    this.updateDisplayData();
  };

  handleToggleSortColumn = columnIndex => {
    this.setState(prevState => {
      var direction =
        prevState.sortColumnIndex === columnIndex &&
        prevState.sortDirection === "desc"
          ? "asc"
          : "desc";
      return {
        sortColumnIndex: columnIndex,
        sortDirection: direction
      };
    });
    this.updateDisplayData();
  };

  handleResetFilters = () => {
    this.setState(prevState => ({
      filterData: cloneDeep(this.initialFilterData),
      filterList: columnData.map(() => [])
    }));

    this.updateDisplayData();
  };

  handleSearchTextChange = searchText => {
    var newState = { searchText: searchText };
    if (searchText.length > 0) {
      newState["searchMatchProductIds"] = this.findSearchMatchProducts(
        searchText
      );
    } else {
      newState["searchMatchProductIds"] = [];
    }
    this.setState(newState);
    this.updateDisplayData();
  };

  findSearchMatchProducts = searchText => {
    var resultIds = {};
    for (const columnKey in this.textIndex) {
      const columnTextDict = this.textIndex[columnKey];
      for (const key in columnTextDict) {
        if (key.toLowerCase().indexOf(searchText) > -1) {
          var matchingIds = columnTextDict[key];
          for (const idKey in matchingIds) {
            resultIds[matchingIds[idKey]] = true;
          }
        }
      }
    }
    return resultIds;
  };

  handleClickOpenDialog = (rowIndex, columnIndex) => {
    if (columnData[columnIndex].canOpenDialog) {
      this.setState({
        cellDialog: {
          open: true,
          row: rowIndex,
          column: columnIndex
        }
      });
    }
  };

  handleCloseDialog = () => {
    this.setState({
      cellDialog: {
        open: false,
        row: null,
        column: null
      }
    });
  };

  getColumnWidth = index => {
    return columnData[index].width;
  };

  getRowHeight = index => {
    // 17=font height, 5 text rows, +10 for breathing room
    return index === 0 ? 40 : 17 * 5 + 10;
  };

  render() {
    if (!productData || !productData.length) {
      console.log("Warning: product data not found.");
      return false;
    }

    if (DEBUG) {
      console.log("State on BedBugDataTable render: ", this.state);
    }
    const { classes } = this.props;

    const {
      displayData,
      filterData,
      filterList,
      selectedRows,
      searchText,
      hoveredRow,
      cellDialog
    } = this.state;

    const dataTableToolbar = (
      <div className={classes.toolbar}>
        <MUIDataTableToolbar
          columns={columnData}
          data={productData}
          searchText={searchText}
          filterData={filterData}
          filterList={filterList}
          tableRef={() => this.tableContent}
          onFilterUpdate={this.handleFilterUpdate}
          onResetFilters={this.handleResetFilters}
          onSearchTextChange={this.handleSearchTextChange}
          onToggleViewColumn={this.handleToggleViewColumn}
        />
        <MUIDataTableFilterList
          columns={columnData}
          filterList={filterList}
          onFilterUpdate={this.handleFilterUpdate}
        />
      </div>
    );

    const displayRowCount = displayData.length;
    const width = 500;
    const containerHeight = 800;
    const multiGridHeight = 400;
    const dataTable = (
      <div className={classes.tableContainer}>
        <AutoSizer>
          {({ height, width }) => (
            <Table className={classes.table} component="div">
              <MultiGrid
                cellRenderer={this.cellRenderer}
                ref={el => (this.multiGridRef = el)}
                width={width}
                columnWidth={({ index }) => this.getColumnWidth(index)}
                columnCount={this.displayColumns.length}
                fixedColumnCount={1}
                height={height}
                rowHeight={({ index }) => this.getRowHeight(index)}
                rowCount={displayRowCount + 1}
                fixedRowCount={1}
                classNameTopLeftGrid={"topLeftGrid"}
                classNameTopRightGrid={"topRightGrid"}
                classNameBottomLeftGrid={"bottomLeftGrid"}
                classNameBottomRightGrid={"bottomRightGrid"}
              />
            </Table>
          )}
        </AutoSizer>
      </div>
    );

    const paperScrollDialog = (
      <PaperScrollDialog
        open={cellDialog.open}
        handleClickOpen={this.handleClickOpenDialog}
        handleClose={this.handleCloseDialog}
      >
        <Table className={classes.table} component="div">
          {this.cellRenderer({
            rowIndex: cellDialog.row,
            columnIndex: cellDialog.column,
            key: 0,
            style: this.cellStyle,
            isInDialog: true
          })}
        </Table>
      </PaperScrollDialog>
    );

    const footer = (
      <div className={classes.footer}>
        <div className={classes.footerContent}>
          <p>Todos</p>
          <ul>
            <li>add column tooltips to explain terms (?)</li>
            <li>add filters for otherReferencedProductAttributes column</li>
            <li>add reference links/downloads</li>
          </ul>
          <p>Made with: Next.js, Material-UI, react-virtualized</p>
          <p>
            Thanks to <a href="https://github.com/techniq/mui-table">techniq</a>{" "}
            and <a href="https://github.com/gregnb/mui-datatables">gregnb</a>{" "}
            for your excellent work on mui-table and mui-datatables.
          </p>
        </div>
      </div>
    );

    return (
      <div className={classes.root} ref={el => (this.tableContent = el)}>
        {dataTableToolbar}
        {dataTable}
        {paperScrollDialog}
        {false ? footer : false}
      </div>
    );
  }
}

export default withStyles(tableStyles)(BedBugDataTable);
