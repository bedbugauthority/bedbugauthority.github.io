import { makeStyles } from "@material-ui/styles";
import Chip from "@material-ui/core/Chip";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    justifyContent: "left",
    flexWrap: "wrap",
    margin: "0px 16px 0px 16px"
  },
  chip: {
    margin: "8px 8px 0px 0px"
  }
}));

const MUIDataTableFilterList = props => {
  const classes = useStyles();
  const { columns, filterList, onFilterUpdate } = props;

  return (
    <div className={classes.root}>
      {filterList.map((item, index) =>
        item.length === 0 ? (
          false
        ) : (
          <Chip
            className={classes.chip}
            label={columns[index].textLabel + ": " + item.toString()}
            key={index}
            onDelete={onFilterUpdate.bind(null, index, "", "multiselect")}
          />
        )
      )}
    </div>
  );
};

export default MUIDataTableFilterList;
