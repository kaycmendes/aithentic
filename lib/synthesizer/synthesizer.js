export const synthesizeText = (filterResults) => {
  // Combines outputs from each filter layer into one coherent, human-like text.
  // For now, it simply joins the individual results.
  return filterResults.join(" ");
}; 