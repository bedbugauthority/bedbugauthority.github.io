import resource_list from "../data/resource_list.json";

export function resourceLookup(productId, resourceType) {
  const resourceDict = resource_list[resourceType];
  const resource = resourceDict ? resourceDict[productId] : null;
  return resource;
}

export function getORPARefs(obj, linker) {
  var list = [];
  for (var i = 0; i < obj.length; i++) {
    const dict = obj[i];
    const ref = dict["Reference"];
    const refHref = ref ? resourceLookup(ref, "labAndField") : "N/A";
    const refSummary = ref + "-summary";
    const refSummaryHref = ref
      ? resourceLookup(ref, "labAndFieldSummary")
      : "N/A";
    list.push(
      <React.Fragment>
        <span>(</span>
        {linker(ref, refHref)}
        <span>, </span>
        {linker(refSummary, refSummaryHref)}
        <span>).</span>
      </React.Fragment>
    );
  }
  return list;
}

export function parseORPAColumn(obj) {
  var list = [];
  for (var i = 0; i < obj.length; i++) {
    const dict = obj[i];
    const description = dict["Attribute Description"];
    const notes = dict["Notes"];
    const type = dict["Type"];
    const peer = dict["Peer Reviewed"];
    const str =
      description +
      ": " +
      notes +
      " " +
      type +
      " study, " +
      (peer === "Yes" ? " " : "not ") +
      "peer-reviewed ";
    list.push(str);
  }
  return list;
}
