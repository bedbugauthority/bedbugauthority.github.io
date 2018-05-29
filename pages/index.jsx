import Head from 'next/head'
import Layout from '../components/Layout'
import MyCustomDataTable from '../components/DataTable'
import BedBugProductData from '../data/BedBugProductData'

console.log('Imported data for ' + BedBugProductData.length + ' products.')
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
      <p>...paragraph text...</p>
      <MyCustomDataTable data={BedBugProductData} />
    </Layout>
  </div>
)

export default Index
