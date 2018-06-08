import React from "react"

const Todos = (props) => (
  <React.Fragment>
    <h1>DEBUG AREA:</h1>
    <p>Search text: {props.searchText}</p>
    <h1>TODOS:</h1>
    <ul>
      <li>Filter: implement FilterSideBar</li>
      <li>SearchBar: filter down to only rows with relevant results</li>
      <li>.</li>
      <li>Visual: design product summary</li>
      <li>
        Visual: improve display for active ingredients (searchBar highlight
        should still work)
      </li>
      <li>.</li>
      <li>DataTable: add remaining columns</li>
      <li>DataTable: make product name sticky on horizontal scroll</li>
      <li>DataTable: clicking row should open product summary</li>
      <li>DataTable: download all button / print preview all selected (?)</li>
      <li>DataTable: refactor</li>
      <li>.</li>
      <li>TBD: move /static/... files to CDN (?)</li>
    </ul>
  </React.Fragment>
)

export default Todos
