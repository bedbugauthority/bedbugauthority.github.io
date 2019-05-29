import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import NewTabLink from "../components/NewTabLink";

const styles = theme => ({
  highlight: {
    backgroundColor: "yellow"
  }
});

const HighlightAndLinkify = props => {
  const escapeRegExp = literal_string => {
    return literal_string.replace(/[-[\]{}()*+!<=:?.\/\\^$|#\s,]/g, "\\$&");
  };
  const hrefRegex = /(.*?)[\[](.+?)[\]][\(](.+?)[\)](.*)/;
  const highlightRegex = new RegExp(
    "(" + escapeRegExp(props.searchText) + ")",
    "gim"
  );

  /** Find link locations and visible text **/
  var searchText = props.contents;
  var visibleText = "";
  var hrefs = [];
  var hrefStarts = [];
  var hrefEnds = [];
  var match = hrefRegex.exec(searchText);
  while (match) {
    hrefStarts.push(match[1].length + visibleText.length);
    hrefEnds.push(match[1].length + match[2].length + visibleText.length);
    visibleText += match[1] + match[2];
    hrefs.push(match[3]);
    searchText = match[4];
    match = hrefRegex.exec(searchText);
  }
  visibleText += searchText;

  /** Find highlight locations **/
  var hiStarts = [];
  var hiEnds = [];
  if (props.searchText.length === 0) {
    hiStarts = [];
    hiEnds = [];
  } else {
    var match = highlightRegex.exec(visibleText);
    while (match) {
      hiStarts.push(match.index);
      hiEnds.push(match.index + match[1].length);
      match = highlightRegex.exec(visibleText);
    }
  }

  /** Merge links and highlights **/
  var finalResult = [];
  var tempResult = [];
  var tempString = "";
  var hiStart = false;
  var hiEnd = false;
  var prevHighlighting = false;
  var linkStart = false;
  var linkEnd = false;
  var key = 0;
  for (var i = 0; i < visibleText.length; i++) {
    var ch = visibleText[i];
    hiStart = hiStarts.indexOf(i) >= 0;
    hiEnd = hiEnds.indexOf(i) >= 0;
    linkStart = hrefStarts.indexOf(i) >= 0;
    linkEnd = hrefEnds.indexOf(i) >= 0;

    if (linkStart || linkEnd) {
      if ((prevHighlighting || hiEnd) && tempString.length > 0) {
        tempResult.push(
          <span key={key} className={props.classes.highlight}>
            {tempString}
          </span>
        );
      } else {
        tempResult.push(<span key={key}>{tempString}</span>);
      }
      key += 1;
      if (linkEnd) {
        finalResult.push(
          <NewTabLink key={key} href={hrefs[hrefEnds.indexOf(i)]}>
            {tempResult}
          </NewTabLink>
        );
      } else {
        finalResult.push(...tempResult);
      }
      tempResult = [];
      tempString = "";
      key += 1;
    }

    if (hiEnd && tempString.length > 0) {
      tempResult.push(
        <span key={key} className={props.classes.highlight}>
          {tempString}
        </span>
      );
      tempString = "";
      key += 1;
    }

    if (hiStart && tempString.length > 0) {
      tempResult.push(<span key={key}>{tempString}</span>);
      tempString = "";
      key += 1;
    }

    tempString += ch;
    prevHighlighting = (hiStart || prevHighlighting) && !hiEnd;
  }
  /** Push any remaining temp results into final results **/
  hiEnd = hiEnds.indexOf(i) >= 0;
  linkEnd = hrefEnds.indexOf(i) >= 0;
  if (hiEnd && tempString.length > 0) {
    tempResult.push(
      <span key={key} className={props.classes.highlight}>
        {tempString}
      </span>
    );
  } else {
    tempResult.push(<span key={key}>{tempString}</span>);
  }
  if (linkEnd) {
    finalResult.push(
      <NewTabLink key={key} href={hrefs[hrefEnds.indexOf(i)]}>
        {tempResult}
      </NewTabLink>
    );
  } else {
    finalResult.push(...tempResult);
  }

  return finalResult;
};

export default withStyles(styles)(HighlightAndLinkify);
