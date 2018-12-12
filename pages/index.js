import Head from "next/head";
import BedBugDataTable from "../components/BedBugDataTable";
import textLabels from "../data/textLabels";
import withLayout from "../lib/withLayout";
import "babel-polyfill";

const Index = () => (
  <React.Fragment>
    <Head>
      <title>
        {textLabels.title} - {textLabels.siteName}
      </title>
      <meta
        name="description"
        content={textLabels.title + " - " + textLabels.siteName}
      />
    </Head>
    <BedBugDataTable />
  </React.Fragment>
);

export default withLayout(Index);
