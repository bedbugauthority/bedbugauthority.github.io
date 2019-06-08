import { makeStyles } from "@material-ui/styles";
import { useState } from "react";

import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import { MUIPopover, MUIPopoverTarget, MUIPopoverContent } from "./MUIPopover";
import MUIDataTableFilter from "./MUIDataTableFilter";
import MUIDataTableViewCol from "./MUIDataTableViewCol";
import MUIDataTableSearch from "./MUIDataTableSearch";
import SearchIcon from "@material-ui/icons/Search";
import DownloadIcon from "@material-ui/icons/CloudDownload";
import PrintIcon from "@material-ui/icons/Print";
import ViewColumnIcon from "@material-ui/icons/ViewColumn";
import FilterIcon from "@material-ui/icons/FilterList";
import { merge } from "lodash";
import ReactToPrint from "react-to-print";
import textLabels from "../data/textLabels";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    display: "flex",
    flexDirection: "row"
  },
  left: {
    flex: "0 0 auto"
  },
  spacer: {
    flex: "1 1 100%"
  },
  actions: {
    display: "flex",
    flexDirection: "row",
    flex: "0 0 auto",
    textAlign: "right"
  },
  titleRoot: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end"
  },
  titleText: { minWidth: 250 },
  subheadingText: { paddingLeft: 20, color: "gray", minWidth: 150 },
  icon: {
    "&:hover": {
      color: "#307BB0"
    }
  },
  iconActive: {
    color: "#307BB0"
  },
  searchIcon: {
    display: "inline-flex",
    marginTop: "10px",
    marginRight: "8px"
  }
}));

const MUIDataTableToolbar = props => {
  const classes = useStyles();
  const {
    data,
    columns,
    filterData,
    filterList,
    onFilterUpdate,
    onResetFilters,
    searchText,
    onSearchTextChange,
    onToggleViewColumn,
    title,
    tableRef
  } = props;

  const [iconActive, setIconActive] = useState(null);
  const [openSearch, setOpenSearch] = useState(false);
  const handleCSVDownload = () => {
    //const { data, columns } = this.props;

    const CSVHead =
      columns
        .reduce((soFar, column) => soFar + '"' + column.name + '",', "")
        .slice(0, -1) + "\r\n";
    const CSVBody = data
      .reduce((soFar, row) => soFar + '"' + row.data.join('","') + '"\r\n', [])
      .trim();

    /* taken from react-csv */
    const csv = `${CSVHead}${CSVBody}`;
    const blob = new Blob([csv], { type: "text/csv" });
    const dataURI = `data:text/csv;charset=utf-8,${csv}`;

    const URL = window.URL || window.webkitURL;
    const downloadURI =
      typeof URL.createObjectURL === "undefined"
        ? dataURI
        : URL.createObjectURL(blob);

    let link = document.createElement("a");
    link.setAttribute("href", downloadURI);
    link.setAttribute("download", "tableDownload.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const setActiveIcon = iconName => {
    setIconActive(iconName);
    setOpenSearch(iconName === "search" ? true : false);
  };

  const getActiveIcon = (styles, iconName) => {
    return iconActive !== iconName ? styles.icon : styles.iconActive;
  };

  const handleHideSearch = () => {
    onSearchTextChange("");
    setIconActive(null);
    setOpenSearch(false);
  };

  const {
    search,
    downloadCsv,
    print,
    viewColumns,
    filterTable
  } = textLabels.toolbar;

  const showSearch = true;
  const showDownloadCsv = false;
  const showPrint = false;
  const showFilterColumns = false;
  const showFilterRows = true;

  var searchButton = null;

  return (
    <Toolbar
      className={classes.root}
      role={"toolbar"}
      aria-label={"Table Toolbar"}
    >
      {/* On left, either show: SearchBar or Table Title */}
      {openSearch === true ? (
        <MUIDataTableSearch
          searchText={searchText}
          onSearchTextChange={onSearchTextChange}
          onHide={handleHideSearch}
        />
      ) : (
        <div className={classes.left}>
          <div className={classes.titleRoot} aria-hidden={"true"}>
            <Typography variant="h5" className={classes.titleText}>
              {textLabels.title}
            </Typography>
            <Typography variant="subtitle2" className={classes.subheadingText}>
              {textLabels.subheadingText}
            </Typography>
          </div>
        </div>
      )}

      <div className={classes.spacer} />

      {/* On right, show: Toolbar Actions */}
      <div className={classes.actions}>
        {showSearch ? (
          <IconButton
            aria-label={search}
            buttonRef={el => (searchButton = el)}
            classes={{
              root: getActiveIcon(classes, "search")
            }}
            onClick={() => setActiveIcon("search")}
          >
            <SearchIcon />
          </IconButton>
        ) : (
          false
        )}

        {showDownloadCsv ? (
          <Tooltip title={downloadCsv}>
            <IconButton
              aria-label={downloadCsv}
              classes={{ root: classes.icon }}
              onClick={handleCSVDownload}
            >
              <DownloadIcon />
            </IconButton>
          </Tooltip>
        ) : (
          false
        )}
        {showPrint ? (
          <Tooltip title={print}>
            <span>
              <ReactToPrint
                trigger={() => (
                  <IconButton
                    aria-label={print}
                    classes={{ root: classes.icon }}
                  >
                    <PrintIcon />
                  </IconButton>
                )}
                content={() => tableRef()}
              />
            </span>
          </Tooltip>
        ) : (
          false
        )}
        {showFilterColumns ? (
          <MUIPopover refExit={() => setActiveIcon(null)} container={tableRef}>
            <MUIPopoverTarget>
              <IconButton
                aria-label={viewColumns}
                classes={{
                  root: getActiveIcon(classes, "viewcolumns")
                }}
                onClick={() => setActiveIcon("viewcolumns")}
              >
                <Tooltip title={viewColumns}>
                  <ViewColumnIcon />
                </Tooltip>
              </IconButton>
            </MUIPopoverTarget>
            <MUIPopoverContent>
              <MUIDataTableViewCol
                data={data}
                columns={columns}
                onColumnUpdate={onToggleViewColumn}
              />
            </MUIPopoverContent>
          </MUIPopover>
        ) : (
          false
        )}
        {showFilterRows ? (
          <MUIPopover refExit={() => setActiveIcon(null)} container={tableRef}>
            <MUIPopoverTarget>
              <IconButton
                aria-label={filterTable}
                classes={{
                  root: getActiveIcon(classes, "filter")
                }}
                onClick={() => setActiveIcon("filter")}
              >
                <Tooltip title={filterTable}>
                  <FilterIcon />
                </Tooltip>
              </IconButton>
            </MUIPopoverTarget>
            <MUIPopoverContent>
              <MUIDataTableFilter
                columns={columns}
                filterList={filterList}
                filterData={filterData}
                onFilterUpdate={onFilterUpdate}
                onFilterReset={onResetFilters}
              />
            </MUIPopoverContent>
          </MUIPopover>
        ) : (
          false
        )}
      </div>
    </Toolbar>
  );
  //  }
};

export default MUIDataTableToolbar;
