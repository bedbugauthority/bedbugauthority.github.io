import Head from "next/head"
import BedBugDataTable from "../components/BedBugDataTable"
import withLayout from "../lib/withLayout"

import AutoSizer from "react-virtualized/dist/commonjs/AutoSizer"
import MuiTable from "../src"

const data = [
  { id: 1, name: "Cupcake", calories: 305, fat: 3.7, carbs: 67, protein: 4.3 },
  { id: 2, name: "Donut", calories: 452, fat: 25.0, carbs: 51, protein: 4.9 },
  { id: 3, name: "Eclair", calories: 262, fat: 16.0, carbs: 24, protein: 6.0 },
  {
    id: 4,
    name: "Frozen yogurt",
    calories: 159,
    fat: 6.0,
    carbs: 24,
    protein: 4.0,
  },
  {
    id: 5,
    name: "Gingerbread",
    calories: 356,
    fat: 16.0,
    carbs: 49,
    protein: 3.9,
  },
  {
    id: 6,
    name: "Honeycomb",
    calories: 408,
    fat: 3.2,
    carbs: 87,
    protein: 6.5,
  },
  {
    id: 7,
    name: "Ice cream sandwich",
    calories: 237,
    fat: 9.0,
    carbs: 37,
    protein: 4.3,
  },
  {
    id: 8,
    name: "Jelly Bean",
    calories: 375,
    fat: 0.0,
    carbs: 94,
    protein: 0.0,
  },
  { id: 9, name: "KitKat", calories: 518, fat: 26.0, carbs: 65, protein: 7.0 },
  {
    id: 10,
    name: "Lollipop",
    calories: 392,
    fat: 0.2,
    carbs: 98,
    protein: 0.0,
  },
  {
    id: 11,
    name: "Marshmallow",
    calories: 318,
    fat: 0.0,
    carbs: 81,
    protein: 2.0,
  },
  { id: 12, name: "Nougat", calories: 360, fat: 19.0, carbs: 9, protein: 37.0 },
  { id: 13, name: "Oreo", calories: 437, fat: 18.0, carbs: 63, protein: 4.0 },
]

const techniqDataTable = () => (
  <React.Fragment>
    <Head>
      <title>Bed Bug Products - Bed Bug Authority</title>
      <meta name="description" content="This is description of test page" />
    </Head>

    <AutoSizer>
      {({ width, height }) => (
        <MuiTable
          data={data}
          columns={[
            { name: "firstName", header: "First Name" },
            { name: "lastName", header: "Last Name", onHeaderClick: false },
          ]}
          width={width}
          style={{ backgroundColor: "white" }}
          includeHeaders={true}
          onHeaderClick={(column) =>
            alert(`Clicked '${column.name}' header in column`)
          }
          onCellClick={(column, data) =>
            alert(
              `Clicked cell in column '${column.name}' containing '${
                data[column.name]
              }'`,
            )
          }
        />
      )}
    </AutoSizer>
  </React.Fragment>
)

export default withLayout(techniqDataTable)
