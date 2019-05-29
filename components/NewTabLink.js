import { withStyles } from "@material-ui/core/styles";
import OpenInNew from "@material-ui/icons/OpenInNew";

const styles = theme => ({
  icon: { width: theme.spacing.unit * 1.5, height: theme.spacing.unit * 1.5 }
});

const NewTabLink = props => {
  const { children, href, classes } = props;

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

export default withStyles(styles)(NewTabLink);

/*
class NewTabLink extends React.Component {

  handleClick = e => {
    e.preventDefault();
    window.open(this.props.href, "_blank");
  };

  render() {
    const { children, href, classes } = this.props;
    return (
      <a href={href} onClick={this.handleClick}>
        {children}
        <OpenInNew className={classes.icon} />
      </a>
    );
  }
}
*/
