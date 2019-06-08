import { makeStyles } from "@material-ui/styles";
import Link from "next/link";
import Toolbar from "@material-ui/core/Toolbar";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles(theme => ({
  header: {
    display: "block",
    top: 0,
    width: "100%",
    minWidth: 512,
    background: "#FFF",
    WebkitAlignSelf: "stretch",
    alignSelf: "stretch"
  },
  headerInner: {
    display: "-webkit-flex",
    display: "flex",
    WebkitFlex: "1 0 auto",
    flex: "1 0 auto",
    WebkitJustifyContent: "space-between",
    justifyContent: "space-between",
    padding: 8,
    position: "relative",
    width: "100%"
  },
  floatLeft: {
    display: "-webkit-flex",
    display: "flex",
    WebkitFlex: "1 1 auto",
    flex: "1 1 auto",
    WebkitAlignSelf: "center",
    alignSelf: "center",
    WebkitAlignItems: "center",
    alignItems: "center",
    verticalAlign: "middle",
    height: 48,
    paddingRight: 32
  },
  floatRight: {
    display: "-webkit-flex",
    display: "flex",
    WebkitFlex: "0 0 auto",
    flex: "0 0 auto",
    WebkitAlignSelf: "center",
    alignSelf: "center",
    WebkitJustifyContent: "flex-end",
    justifyContent: "flex-end",
    verticalAlign: "middle",
    height: 48,
    paddingLeft: 32,
    paddingRight: 4
  },
  image: {
    height: 48,
    width: 48,
    marginRight: 8
  },
  link: {
    margin: "auto",
    marginRight: 15
  }
}));

const Header = props => {
  const classes = useStyles();

  return (
    <header className={classes.header}>
      <div className={classes.headerInner}>
        <div className={floatLeft}>
          <img
            src="../static/cartoon-bedbug-image-placeholder.jpg"
            className={classes.image}
          />
          <h1>Bed Bug Authority</h1>
        </div>
        <div className={classes.floatRight}>
          <Link prefetch href="/link1">
            <a className={classes.link}>Link1</a>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default withStyles(styles)(Header);
