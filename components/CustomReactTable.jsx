import ReactTable from "react-table"
//import "react-table/react-table.css"

class CustomReactTable extends React.Component {
  constructor(props) {
    super(props)
    this.state = { data: props.data }
  }

  render() {
    const { data } = this.state.data
    return (
      <div>
        <ReactTable
          data={data}
          columns={[
            {
              Header: "",
              columns: [
                {
                  Header: "Id",
                  id: "id",
                  accessor: "id"
                },
                {
                  Header: "Product",
                  accessor: "product"
                },
                {
                  Header: "Manufacturer",
                  accessor: "manufacturer"
                }
              ]
            }
          ]}
          defaultPageSize={5}
          className="-striped -highlight"
        />
      </div>
    )
  }
}

export default CustomReactTable
