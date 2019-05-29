import classNames from "classnames";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import NewTabLink from "../components/NewTabLink";
import HighlightAndLinkify from "../components/HighlightAndLinkify";
import {
  getORPARefs,
  parseORPAColumn,
  hrefMarkup
} from "../lib/helperFunctions";

const styles = theme => ({
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

const CellContents = props => {
  const parseArray = array => {
    const { width, wrap, biggerListSpacing, classes } = props;

    var lineEllipsized = false;
    if (!wrap && array.length > 5) {
      const num_hidden = array.length - 4;
      array = array.slice(0, 4);
      array.push("... (" + num_hidden + " more)");
      lineEllipsized = true;
    }

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
                {
                  <HighlightAndLinkify
                    contents={item}
                    searchText={props.searchText}
                  />
                }
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

  const dictToList = dict => {
    var array = [];
    for (const [key, value] of Object.entries(dict)) {
      array.push(key.toString() + ": " + value.toString());
    }
    return array;
  };

  const parseItem = item => {
    var array;

    /** Convert everything into a list. One item per line in a cell. **/
    switch (props.contentsType) {
      case "list":
        array = item;
        break;
      case "list_custom1": // i.e. Other Referenced Product Attributes
        array = parseORPAColumn(item, hrefMarkup);
        break;
      case "dictionary":
        array = dictToList(item);
        break;
      case "link": // i.e. 'Other References' column
        array = [item]; // TODO: remove this line before publishing

        const resources = props.resourceLookup(item, "allOtherLinks");
        if (resources) {
          for (var i = 0; i < resources.length; i++) {
            array.push(
              hrefMarkup(resources[i][0], "/static/" + resources[i][1])
            );
          }
        }
        break;
      case "string":
      case "date":
      case "numeric":
      default:
        // i.e. case: string, date, numeric
        array = [item.toString()];
        break;
    }

    return parseArray(array);
  };

  return <div className={props.classNames}>{parseItem(props.contents)}</div>;
};

export default withStyles(styles)(CellContents);
