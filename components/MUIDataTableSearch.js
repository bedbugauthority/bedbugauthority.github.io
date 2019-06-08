import { makeStyles } from "@material-ui/styles";
import React, { useEffect } from "react";
import Grow from "@material-ui/core/Grow";
import TextField from "@material-ui/core/TextField";
import SearchIcon from "@material-ui/icons/Search";
import IconButton from "@material-ui/core/IconButton";
import ClearIcon from "@material-ui/icons/Clear";
import textLabels from "../data/textLabels";

const useStyles = makeStyles(theme => ({
  main: {
    display: "flex",
    flex: "1 0 auto"
  },
  searchIcon: {
    marginTop: "10px",
    marginRight: "8px"
  },
  searchText: {
    flex: "0.8 0",
    minWidth: 600
  },
  clearIcon: {
    "&:hover": {
      color: "#FF0000"
    }
  }
}));

const MUIDataTableSearch = props => {
  const classes = useStyles();
  const { searchText, onSearchTextChange, onHide } = props;

  const onKeyDown = event => {
    if (event.keyCode === 27) {
      onHide();
    }
  };

  const handleSearchTextChange = event =>
    onSearchTextChange(event.target.value);

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown, false);
    return () => {
      document.removeEventListener("keydown", onKeyDown, false);
    };
  });

  var rootRef = null;

  return (
    <Grow appear in={true} timeout={300}>
      <div className={classes.main} ref={el => (rootRef = el)}>
        <SearchIcon className={classes.searchIcon} />
        <TextField
          className={classes.searchText}
          value={searchText}
          onChange={handleSearchTextChange}
          autoFocus={true}
          InputProps={{
            "aria-label": textLabels.toolbar.search
          }}
          fullWidth={true}
        />
        <IconButton className={classes.clearIcon} onClick={onHide}>
          <ClearIcon />
        </IconButton>
      </div>
    </Grow>
  );
};

export default MUIDataTableSearch;
