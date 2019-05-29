import Head from "next/head";
import BedBugDataTable from "../components/BedBugDataTable";
import textLabels from "../data/textLabels";
import withLayout from "../lib/withLayout";

const Index = () => [
  <Head>
    <title>
      {textLabels.title} - {textLabels.siteName}
    </title>
    <meta
      name="description"
      content={textLabels.title + " - " + textLabels.siteName}
    />
  </Head>,
  <BedBugDataTable />
];

export default withLayout(Index);
