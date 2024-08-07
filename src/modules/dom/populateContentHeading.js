export default function populateContentHeading(titleProject) {
  const contentHeading = document.querySelector("#content-heading");
  contentHeading.textContent = titleProject;
  return contentHeading;
}
