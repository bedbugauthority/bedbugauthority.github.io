import resource_list from "../data/resource_list.json";

// __all__ = [resourceLookup, hrefMarkup, parseORPAColumn]

export const resourceLookup = (productId, resourceType) => {
  const resourceDict = resource_list[resourceType];
  const resource = resourceDict ? resourceDict[productId] : null;
  return resource;
};

export const hrefMarkup = (text, href) => {
  if (!href) {
    return text;
  }
  return "[" + text + "]" + "(" + href + ")";
};

export const parseORPAColumn = obj => {
  var list = [];
  for (var i = 0; i < obj.length; i++) {
    const dict = obj[i];
    const description = dict["Attribute Description"];
    const notes = dict["Notes"];
    const type = dict["Type"];
    const peer = dict["Peer Reviewed"];
    const ref = dict["Reference"];
    const refHref = ref
      ? "/static/" + resourceLookup(ref, "labAndField")
      : "N/A";
    const refSummary = ref + "-summary";
    const refSummaryHref =
      "/static/" + ref ? resourceLookup(ref, "labAndFieldSummary") : "N/A";
    const str =
      description +
      ": " +
      notes +
      " " +
      type +
      " study, " +
      (peer === "Yes" ? " " : "not ") +
      "peer-reviewed " +
      hrefMarkup(ref, refHref) +
      ", " +
      hrefMarkup(refSummary, refSummaryHref) +
      ".";
    list.push(str);
  }
  return list;
};
