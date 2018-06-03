import SearchBar from "../components/SearchBar"

class DataTable extends React.Component {
  constructor(props) {
    super(props)
    this.state = { data: props.data }
  }

  render() {
    return (
      <div>
        <SearchBar />
        <ul>
          {this.state.data.map((item) => <li key={item.id}>{item.product}</li>)}
        </ul>
      </div>
    )
  }
}

export default DataTable
