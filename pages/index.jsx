import Head from "next/head"
import Layout from "../components/Layout"
import MyCustomDataTable from "../components/DataTable"
import CustomReactTable from "../components/CustomReactTable"
import FixedColumnTable from "../components/FixedColumnTable"
import MuiButton from "../components/MuiButton"
import BedBugProductData from "../data/BedBugProductData"

console.log("Imported data for " + BedBugProductData.length + " products.")
console.log(BedBugProductData)
const Index = () => (
  <div>
    <Head>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"
      />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
    </Head>
    <style jsx global>
      {`
        body {
          border: 0;
          margin: 0;
        }
      `}
    </style>
    <Layout>
      <h1>H1 Headline</h1>
      <MuiButton />
      <p>...paragraph text...</p>
      <MyCustomDataTable data={BedBugProductData} />
      <p>...more text...</p>
      <CustomReactTable data={BedBugProductData} />
      <p>...even more text...</p>
      <FixedColumnTable data={BedBugProductData} />
    </Layout>
  </div>
)

export default Index
