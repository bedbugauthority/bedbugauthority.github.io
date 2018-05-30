import ReactTable from "react-table"
import createTable from "react-table-hoc-fixed-columns"

const ReactTableFixedColumns = createTable(ReactTable)

class FixedColumnTable extends React.Component {
  constructor(props) {
    super(props)
    this.state = { data: props.data }
  }

  render() {
    const { data } = this.state.data
    return (
      <ReactTableFixedColumns
        innerRef={c => {
          console.log("c", c)
        }}
        data={data}
        getTdProps={() => ({ style: { textAlign: "center" } })}
        filterable
        columns={[
          {
            Header: "Id",
            accessor: "id",
            fixed: true
          },
          {
            Header: "Product",
            accessor: "product",
            fixed: true
          },
          {
            Header: "Other",
            columns: [
              {
                Header: "Manufacturer",
                accessor: "manufacturer"
              },
              {
                Header: "SDS",
                accessor: "sds"
              }
            ]
          }
        ]}
        defaultPageSize={5}
      />
    )
  }
}

export default FixedColumnTable
