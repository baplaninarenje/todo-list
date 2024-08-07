import getStorageItem from "../storage/getStorageItem";
import { btnsAddTask } from "./../../index";

export default function populateProjectNamesOptionsList(projectDom) {
  projectDom.replaceChildren();
  const storageProjects = getStorageItem("projects");
  storageProjects.forEach((project) => {
    const optionProjectName = document.createElement("option");
    optionProjectName.value = project.title;
    optionProjectName.textContent = project.title;
    optionProjectName.dataset.projectUuid = project.projectUuid;

    if (
      btnsAddTask[0].getAttribute("data-project-uuid") === project.projectUuid
    ) {
      optionProjectName.selected = true;
    }

    projectDom.appendChild(optionProjectName);
  });
}
