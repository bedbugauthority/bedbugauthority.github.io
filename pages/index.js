import Head from "next/head";
import BedBugDataTable from "../components/BedBugDataTable";
import textLabels from "../data/textLabels";
import "babel-polyfill";

const Index = () => {
  return [
    <Head key={0}>
      <title>
        {textLabels.title} - {textLabels.siteName}
      </title>
      <meta
        name="description"
        content={textLabels.title + " - " + textLabels.siteName}
      />
    </Head>,
    <BedBugDataTable key={1} />
  ];
};

export default Index;
