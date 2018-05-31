import AppHead from "../components/AppHead"
import MuiAppContainer from "../components/MuiAppContainer"
import Layout from "../components/Layout"
import FilterBar from "../components/FilterBar"
import CheckboxesGroup from "../components/CheckboxesGroup"
import FilterCard from "../components/FilterCard"
import MyCustomDataTable from "../components/DataTable"
import CustomReactTable from "../components/CustomReactTable"
import FixedColumnTable from "../components/FixedColumnTable"
import MuiButton from "../components/MuiButton"
import ToggleGroup from "../components/ToggleGroup"
import BedBugProductData from "../data/BedBugProductData"

const filterBarItems = {
  Manufacturers: ["FMC", "Bayer", "Amvac"],
  Formulations: ["WP", "EC", "A", "D", "SC"],
  "Mattress Application": ["Yes", "No"],
  "Active Ingredient": [
    "acetamiprid",
    "bifenthrin",
    "pyrethrins",
    "deltamethrin",
  ],
}

const dataItems = {
  FMC: true,
  Bayer: true,
  Amvac: true,
}

console.log("Imported data for " + BedBugProductData.length + " products.")
console.log(BedBugProductData)
const Index = () => (
  <div>
    <AppHead />
    <MuiAppContainer>
      <Layout>
        <p>
          The bed bug product matrix lets you search and filter all known bed
          bug products. Every effort has been made to present factual
          information only. No content should be construed as a recommendation
          or advice.
        </p>
        <FilterBar data={filterBarItems} />
        <FilterCard label="Manufacturers">
          <CheckboxesGroup dataItems={dataItems} />
        </FilterCard>
        <FilterCard label="other">
          <ToggleGroup dataItems={dataItems} />
        </FilterCard>
        <p>...paragraph text...</p>
        <MyCustomDataTable data={BedBugProductData} />
        <p>...more text...</p>
        <CustomReactTable data={BedBugProductData} />
        <p>...even more text...</p>
        <FixedColumnTable data={BedBugProductData} />
      </Layout>
    </MuiAppContainer>
  </div>
)

export default Index
