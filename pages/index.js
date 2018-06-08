import Head from "next/head"
import Button from "@material-ui/core/Button"
import DataTable from "../components/DataTable"
import withLayout from "../lib/withLayout"

import PersistentDrawer from "../components/PersistentDrawer"

const Index = () => (
  <React.Fragment>
    <Head>
      <title>Bed Bug Products - Bed Bug Authority</title>
      <meta name="description" content="This is description of Index page" />
    </Head>
    <DataTable />
    <PersistentDrawer />
  </React.Fragment>
)

export default withLayout(Index)
