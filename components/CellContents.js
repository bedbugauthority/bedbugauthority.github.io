import React from "react"
import classNames from "classnames"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"

const styles = (theme) => ({
  highlight: {
    backgroundColor: "yellow",
  },
  ul: {
    listStyleType: "none",
    padding: 0,
    margin: 0,
  },
  textLine: {
    paddingRight: theme.spacing.unit / 2,
    paddingLeft: theme.spacing.unit / 2,
  },
})

class CellContents extends React.Component {
  constructor(props) {
    super(props)
  }

  escapeRegExp = (literal_string) => {
    return literal_string.replace(/[-[\]{}()*+!<=:?.\/\\^$|#\s,]/g, "\\$&")
  }

  highlighter = (text) => {
    if (this.props.searchText.length === 0) {
      return text
    }
    const regex = new RegExp(
      "(" + this.escapeRegExp(this.props.searchText) + ")",
      "gim",
    )
    const blocks = text.split(regex)
    return (
      <React.Fragment>
        {blocks.map((block, index) => {
          if (block.match(regex)) {
            return (
              <span key={index} className={this.props.classes.highlight}>
                {block}
              </span>
            )
          } else {
            return <span key={index}>{block}</span>
          }
        })}
      </React.Fragment>
    )
  }

  parseArray = (array) => {
    return (
      <ul className={this.props.classes.ul}>
        {array.map((item, index) => {
          return (
            <li key={index}>
              <div className={this.props.classes.textLine}>
                {this.highlighter(item)}
              </div>
            </li>
          )
        })}
      </ul>
    )
  }

  parseDict = (dict) => {
    var array = []
    for (const [key, value] of Object.entries(dict)) {
      array.push(key.toString() + ": " + value.toString())
    }
    return this.parseArray(array)
  }

  render() {
    const { searchText, contents, classes } = this.props
    var parsedContents

    if (Array.isArray(contents)) {
      parsedContents = this.parseArray(contents)
    } else if (typeof contents === "object" && contents !== null) {
      parsedContents = this.parseDict(contents)
    } else {
      parsedContents = (
        <div className={classes.textLine}>
          {this.highlighter(contents.toString())}
        </div>
      )
    }

    return <React.Fragment>{parsedContents}</React.Fragment>
  }
}

CellContents.propTypes = {
  searchText: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(CellContents)
