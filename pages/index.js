import Head from "next/head"
import Button from "@material-ui/core/Button"
import DataTable from "../components/DataTable"
import withLayout from "../lib/withLayout"

const Index = () => (
  <React.Fragment>
    <Head>
      <title>Index page</title>
      <meta name="description" content="This is description of Index page" />
    </Head>
    <DataTable />
  </React.Fragment>
)

export default withLayout(Index)
