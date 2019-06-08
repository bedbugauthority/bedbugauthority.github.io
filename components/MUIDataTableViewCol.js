import { makeStyles } from "@material-ui/styles";
import Checkbox from "@material-ui/core/Checkbox";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import textLabels from "../data/textLabels";

const useStyles = makeStyles(theme => ({
  root: {
    padding: "16px 24px 16px 24px",
    fontFamily: "Roboto"
  },
  title: {
    marginLeft: "-7px",
    fontSize: "14px",
    color: "#424242",
    textAlign: "left",
    fontWeight: 500
  },
  formGroup: {
    marginTop: "8px"
  },
  formControl: {},
  checkbox: {
    width: "32px",
    height: "32px"
  },
  checkboxRoot: {
    "&$checked": {
      color: "#027cb5"
    }
  },
  checked: {},
  label: {
    fontSize: "15px",
    marginLeft: "8px",
    color: "#4a4a4a"
  }
}));

const MUIDataTableViewCol = props => {
  const classes = useStyles();
  const { columns } = props;

  const handleColChange = index => {
    props.onColumnUpdate(index);
  };

  return (
    <FormControl
      component={"fieldset"}
      className={classes.root}
      aria-label={textLabels.viewColumns.titleAria}
    >
      <Typography variant="caption" className={classes.title}>
        {textLabels.viewColumns.title}
      </Typography>
      <FormGroup className={classes.formGroup}>
        {columns.map((column, index) => {
          return (
            <FormControlLabel
              key={index}
              classes={{
                root: classes.formControl,
                label: classes.label
              }}
              control={
                <Checkbox
                  className={classes.checkbox}
                  classes={{
                    root: classes.checkboxRoot,
                    checked: classes.checked
                  }}
                  onChange={handleColChange.bind(null, index)}
                  checked={column.display}
                  value={column.name}
                />
              }
              label={column.name ? column.name : column}
            />
          );
        })}
      </FormGroup>
    </FormControl>
  );
};

export default MUIDataTableViewCol;
