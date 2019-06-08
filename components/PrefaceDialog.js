import { withStyles } from "@material-ui/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import SearchIcon from "@material-ui/icons/Search";
import FilterIcon from "@material-ui/icons/FilterList";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import withMobileDialog from "@material-ui/core/withMobileDialog";

const styles = theme => ({
  root: { margin: 0 },
  content: { paddingBottom: 0 },
  tipsTextArea: { display: "flex", flexDirection: "column" },
  tipsList: { marginLeft: theme.spacing(2) },
  tipsItem: {
    display: "flex",
    flexDirection: "row"
  },
  disclaimerTextArea: { maxHeight: "135px" }
});

const PrefaceDialog = props => {
  const { open, fullScreen, handleClose, classes } = props;
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        fullScreen={fullScreen}
        scroll="body"
        aria-labelledby="preface-dialog-title"
        className={classes.root}
      >
        <DialogTitle id="preface-dialog-title">Why This Site?</DialogTitle>
        <DialogContent className={classes.content}>
          <DialogContentText>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </DialogContentText>
        </DialogContent>
        <DialogTitle>Quick Tips:</DialogTitle>
        <DialogContent className={classes.content}>
          <DialogContentText className={classes.tipsTextArea}>
            <span className={classes.tipsList}>
              <span className={classes.tipsItem}>
                {"• "}
                <SearchIcon />- Click on this search icon (top-right corner) to
                find a keyword/phrase (e.g. "mattress").
              </span>
              <span className={classes.tipsItem}>
                {"• "}
                <FilterIcon />- Click on this filter icon (top-right corner) to
                filter results by column (e.g. Formulation = "").
              </span>
              <span className={classes.tipsItem}>
                • Expand Cell - click on any table cell with an elipsis (…) to
                view the full contents of the cell.
              </span>
              <span className={classes.tipsItem}>
                • Sort - click on a column header to sort by that column. Click
                again to reverse the sort direction. (Note: not all columns are
                sortable).
              </span>
            </span>
          </DialogContentText>
        </DialogContent>
        <DialogTitle>Terms of Use and Disclaimer:</DialogTitle>
        <DialogContent className={classes.content}>
          <DialogContentText className={classes.disclaimerTextArea}>
            Your use of this site constitutes an agreement to the following
            terms.
            <br />
            <br />
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
            <br />
            <br />
            It has survived not only five centuries, but also the leap into
            electronic typesetting, remaining essentially unchanged. It was
            popularised in the 1960s with the release of Letraset sheets
            containing Lorem Ipsum passages, and more recently with desktop
            publishing software like Aldus PageMaker including versions of Lorem
            Ipsum.
            <br />
            <br />
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
            <br />
            <br />
            It has survived not only five centuries, but also the leap into
            electronic typesetting, remaining essentially unchanged. It was
            popularised in the 1960s with the release of Letraset sheets
            containing Lorem Ipsum passages, and more recently with desktop
            publishing software like Aldus PageMaker including versions of Lorem
            Ipsum.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Okay
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default withStyles(styles)(
  withMobileDialog({ breakpoint: "xs" })(PrefaceDialog)
);
