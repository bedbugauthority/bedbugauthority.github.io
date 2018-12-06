import { withStyles } from "@material-ui/core/styles";
import OpenInNew from "@material-ui/icons/OpenInNew";

const styles = theme => ({
  icon: { width: theme.spacing.unit * 1.5, height: theme.spacing.unit * 1.5 }
});

class NewTabLink extends React.Component {
  constructor(props) {
    super(props);
  }

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

export default withStyles(styles)(NewTabLink);
