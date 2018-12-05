import classNames from "classnames";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import NewTabLink from "../components/NewTabLink";

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

    this.appendNoHighlight = [];
    this.doneAppending = false;
  }

  escapeRegExp = literal_string => {
    return literal_string.replace(/[-[\]{}()*+!<=:?.\/\\^$|#\s,]/g, "\\$&");
  };

  highlighter = (text, textAppendNoHighlight) => {
    if (this.props.searchText.length === 0) {
      return (
        <React.Fragment>
          <span>{text}</span>
          {textAppendNoHighlight ? <span>{textAppendNoHighlight}</span> : null}
        </React.Fragment>
      );
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

    const append = textAppendNoHighlight ? (
      <span>{textAppendNoHighlight}</span>
    ) : null;

    return (
      <React.Fragment>
        {contents}
        {append ? append : null}
      </React.Fragment>
    );
  };

  linkify = (contents, filename) => {
    if (filename == null) {
      return contents;
    }
    const href = "/static/" + filename;

    return <NewTabLink href={href}>{contents}</NewTabLink>;
  };

  parseArray = (array, linkifyRows) => {
    const { width, wrap, biggerListSpacing, classes } = this.props;

    var lineEllipsized = false;
    if (!wrap && array.length > 5) {
      array = array.slice(0, 4);
      array.push("...");
      lineEllipsized = true;
    }

    var filename = null;

    return (
      <ul className={classes.ul}>
        {array.map((item, index) => {
          if (linkifyRows) {
            filename = linkifyRows[index];
          }
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
                {lineEllipsized && index >= 4
                  ? this.highlighter(item)
                  : this.linkify(
                      this.highlighter(item, this.appendNoHighlight[index]),
                      filename
                    )}
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

  /* Special handling for custom column: Other References */
  ref_lookup_ToList = prodId => {
    return prodId;
  };

  /* Special handling for custom column: Other Referenced Product Attributes */
  list_custom1_ToList = obj => {
    const { resourceLookup } = this.props;

    var list = [];

    for (var i = 0; i < obj.length; i++) {
      const dict = obj[i];
      const description = dict["Attribute Description"];
      const notes = dict["Notes"];
      const type = dict["Type"];
      const peer = dict["Peer Reviewed"];
      const ref = dict["Reference"];
      const refHref = ref ? resourceLookup(ref, "labAndField") : "N/A";
      const refSummary = ref + "-summary";
      const refSummaryHref = ref
        ? resourceLookup(ref, "labAndFieldSummary")
        : "N/A";
      const str =
        description +
        ": " +
        notes +
        " " +
        type +
        " study, " +
        (peer === "Yes" ? " " : "not ") +
        "peer-reviewed ";
      if (!this.doneAppending) {
        this.appendNoHighlight.push(
          <React.Fragment>
            <span>(</span>
            {this.linkify(ref, refHref)}
            <span>, </span>
            {this.linkify(refSummary, refSummaryHref)}
            <span>).</span>
          </React.Fragment>
        );
      }

      list.push(str);
    }
    this.doneAppending = true;
    return list;
  };

  render() {
    const {
      className,
      searchText,
      onSearchTextMatch,
      contents,
      contentsType,
      resourceLookup,
      refType,
      linkResourceName,
      classes
    } = this.props;
    var parsedContents;

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
        if (refType === "reference") {
          // i.e. Other References column
          const resources = resourceLookup(contents, "allOtherLinks");
          var array = [contents];
          var links = [null];
          if (resources) {
            for (var i = 0; i < resources.length; i++) {
              array.push(resources[i][0]);
              links.push(resources[i][1]);
            }
          }
          parsedContents = (
            <div className={classes.textLine}>
              {this.linkify(
                this.highlighter(contents.toString()),
                linkResourceName
              )}
            </div>
          );
          parsedContents = this.parseArray(array, links);
          break;
        } else {
          parsedContents = (
            <div className={classes.textLine}>
              {this.linkify(
                this.highlighter(contents.toString()),
                linkResourceName
              )}
            </div>
          );
        }
        break;
      default:
        // i.e. case: string, date, numeric
        parsedContents = (
          <div className={classes.textLine}>
            {this.highlighter(contents.toString())}
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
