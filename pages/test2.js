import Head from "next/head"
import withLayout from "../lib/withLayout"

// remove these imports when done testing
import MUIDataTable from "../components/custom-mui-datatable/MUIDataTable"
import { data, columnData } from "../data/TestData"

const test2 = () => (
  <React.Fragment>
    <Head>
      <title>The Bed Bug Authority's Bed Bug Products Table</title>
      <meta
        name="description"
        content="This is the description of the test page..."
      />
    </Head>

    <MUIDataTable title={"MUIDataTable"} data={data} columns={columnData} />
  </React.Fragment>
)

export default withLayout(test2)
