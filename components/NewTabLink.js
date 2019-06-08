import { makeStyles } from "@material-ui/styles";
import OpenInNew from "@material-ui/icons/OpenInNew";

const useStyles = makeStyles(theme => ({
  icon: { width: theme.spacing(1.5), height: theme.spacing(1.5) }
}));

const NewTabLink = props => {
  const classes = useStyles();
  const { children, href } = props;

  const handleClick = e => {
    e.preventDefault();
    window.open(href, "_blank");
  };

  return (
    <a href={href} onClick={handleClick}>
      {children}
      <OpenInNew className={classes.icon} />
    </a>
  );
};

export default NewTabLink;
