import { withStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";

const styles = theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  },
  icon: {
    width: theme.spacing.unit * 2,
    height: theme.spacing.unit * 2
    //marginLeft: -theme.spacing.unit
  }
});

const MoreInfoIcon = props => {
  /*
  state = {
    open: false
  };

  handleTooltipOpen = () => {
    this.setState({ open: true });
  };

  handleTooltipClose = () => {
    this.setState({ open: false });
  };*/
  const { hoverText, classes } = props;
  return (
    <span className={classes.root}>
      <Tooltip disableFocusListener disableTouchListener title={hoverText}>
        <HelpOutlineIcon className={classes.icon} />
      </Tooltip>
    </span>
  );
};

export default withStyles(styles)(MoreInfoIcon);
