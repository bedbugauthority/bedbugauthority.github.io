import classNames from "classnames";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Link from "next/link";

const styles = theme => ({
  highlight: {
    backgroundColor: "yellow"
  },
  ul: {
    listStyleType: "none",
    padding: 0,
    margin: 0
  },
  textLine: {
    paddingRight: theme.spacing.unit,
    paddingLeft: theme.spacing.unit
  },
  li: {},
  liWithMargin: {
    margin: "1em 0"
  },
  textLineWrap: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis"
  }
});

class CellContents extends React.Component {
  constructor(props) {
    super(props);
  }

  escapeRegExp = literal_string => {
    return literal_string.replace(/[-[\]{}()*+!<=:?.\/\\^$|#\s,]/g, "\\$&");
  };

  highlighter = text => {
    if (this.props.searchText.length === 0) {
      return text;
    }

    const regex = new RegExp(
      "(" + this.escapeRegExp(this.props.searchText) + ")",
      "gim"
    );
    const blocks = text.split(regex);
    const contents = blocks.map((block, index) => {
      if (block.match(regex)) {
        return (
          <span key={index} className={this.props.classes.highlight}>
            {block}
          </span>
        );
      } else {
        return <span key={index}>{block}</span>;
      }
    });

    return <React.Fragment>{contents}</React.Fragment>;
  };

  linkify = (ref_id, lookupFunc = "") => {
    //TODO: modify url to link to correct resource here
    var href = "/static/";
    if (lookupFunc) {
      href += lookupFunc(ref_id);
    } else {
      href += ref_id;
    }
    return (
      <Link href={href}>
        <a>{ref_id}</a>
      </Link>
    );
  };

  parseArray = array => {
    const { dataAppend, width, wrap, biggerListSpacing, classes } = this.props;

    if (!wrap && array.length > 5) {
      array = array.slice(0, 4);
      array.push("...");
    }

    const append = dataAppend ? dataAppend : "";

    return (
      <ul className={classes.ul}>
        {array.map((item, index) => {
          return (
            <li
              className={biggerListSpacing ? classes.liWithMargin : classes.li}
              key={index}
            >
              <div
                className={classNames(classes.textLine, {
                  [classes.textLineWrap]: !wrap
                })}
              >
                {this.highlighter(item + append)}
              </div>
            </li>
          );
        })}
        <style jsx>{`
          ul {
            width: ${width}px;
          }
        `}</style>
      </ul>
    );
  };

  parseDict = dict => {
    var array = [];
    for (const [key, value] of Object.entries(dict)) {
      array.push(key.toString() + ": " + value.toString());
    }
    /*
    if (array.length > 0) {
      return this.parseArray(array);
    } else {
      return "";
    }*/
    return this.parseArray(array);
  };

  /* Special handling for custom column: otherReferencedProductAttributes */
  list_custom1_ToList = obj => {
    var list = [];

    for (var i = 0; i < obj.length; i++) {
      const dict = obj[i];
      const description = dict["Attribute Description"];
      const notes = dict["Notes"];
      const type = dict["Type"];
      const peer = dict["Peer Reviewed"];
      const ref = dict["Reference"];
      const ref_summary = ref + "-summary";
      const str =
        description +
        ": " +
        notes +
        " " +
        type +
        " study, " +
        (peer === "Yes" ? " " : "not ") +
        "peer-reviewed (" +
        ref +
        ", " +
        ref_summary +
        ").";
      list.push(str);
    }
    return list;
  };

  render() {
    const {
      className,
      searchText,
      onSearchTextMatch,
      contents,
      dataAppend,
      contentsType,
      refLookupById,
      classes
    } = this.props;
    var parsedContents;

    const append = dataAppend ? dataAppend : "";

    switch (contentsType) {
      case "list":
        parsedContents = this.parseArray(contents);
        break;
      case "list_custom1":
        const contentsToList = this.list_custom1_ToList(contents);
        parsedContents = this.parseArray(contentsToList);
        break;
      case "dictionary":
        parsedContents = this.parseDict(contents);
        break;
      case "link":
        // i.e. case: string, date, numeric
        parsedContents = (
          <div className={classes.textLine}>
            {this.linkify(
              this.highlighter(contents.toString() + append),
              refLookupById
            )}
          </div>
        );
        break;
      default:
        // i.e. case: string, date, numeric
        parsedContents = (
          <div className={classes.textLine}>
            {this.highlighter(contents.toString() + append)}
          </div>
        );
        break;
    }

    return <div className={className}>{parsedContents}</div>;
  }
}

CellContents.propTypes = {
  searchText: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CellContents);
