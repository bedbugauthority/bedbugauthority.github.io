import SearchForm from "../components/SearchForm"

class DataTable extends React.Component {
  constructor(props) {
    super(props)
    this.state = { data: props.data }
  }

  render() {
    return (
      <div>
        <SearchForm />
        <ul>
          {this.state.data.map((item) => <li key={item.id}>{item.product}</li>)}
        </ul>
      </div>
    )
  }
}

export default DataTable
