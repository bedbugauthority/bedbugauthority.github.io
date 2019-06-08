import { makeStyles } from "@material-ui/styles";
import classNames from "classnames";
import NewTabLink from "../components/NewTabLink";
import HighlightAndLinkify from "../components/HighlightAndLinkify";
import { parseORPAColumn, hrefMarkup } from "../lib/helperFunctions";

const useStyles = makeStyles(theme => ({
  ul: {
    listStyleType: "none",
    padding: 0,
    margin: 0
  },
  textLine: {
    paddingRight: theme.spacing(1),
    paddingLeft: theme.spacing(1)
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
}));

const CellContents = React.memo(props => {
  const classes = useStyles();
  const parseArray = array => {
    const { width, wrap, biggerListSpacing } = props;

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

  const parseDict = dict => {
    var array = [];
    for (const [key, value] of Object.entries(dict)) {
      array.push(key.toString() + ": " + value.toString());
    }
    return array;
  };

  const parseLinks = item => {
    const resources = props.resourceLookup(item, "allOtherLinks");
    var array = [];
    if (resources) {
      for (var i = 0; i < resources.length; i++) {
        array.push(hrefMarkup(resources[i][0], "/static/" + resources[i][1]));
      }
    }
    return array;
  };

  const parseItem = item => {
    var array;

    /** Convert everything into an array. One item per line in a cell. **/
    switch (props.contentsType) {
      case "list":
        array = item;
        break;
      case "list_custom1": // i.e. Other Referenced Product Attributes
        array = parseORPAColumn(item, hrefMarkup);
        break;
      case "dictionary":
        array = parseDict(item);
        break;
      case "link": // i.e. 'Other References' column
        // TODO: remove 'item' before publishing
        array = [item, ...parseLinks(item)];
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
});

export default CellContents;
