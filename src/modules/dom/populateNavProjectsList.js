import removeStorageItem from "../storage/removeStorageItem";
import createProjectItemDOM from "./createProjectItemDOM";

export default function populateNavProjectsList(storageProjects, storageTodos) {
  const navProjectDiv = document.querySelector(".nav-project");
  const navProjectListDiv = document.querySelector(".nav-project-list");
  navProjectListDiv.replaceChildren();
  storageProjects.forEach((project) => {
    const todoCounter =
      project.projectUuid === "92da8517-0cf9-4741-937e-046ff150c7e1" // Home project
        ? storageTodos.length
        : storageTodos.filter(
            (todo) => todo.projectUuid === project.projectUuid
          ).length;

    const navItemProjectBtn = document.createElement("button");
    navItemProjectBtn.setAttribute("data-project-uuid", project.projectUuid);
    navItemProjectBtn.classList.add("nav-item", "btn-nav-project");

    const navItemLeftDiv = document.createElement("div");
    navItemLeftDiv.className = "nav-item-left";
    const todoCounterOrSvgDeleteDiv = document.createElement("div");
    todoCounterOrSvgDeleteDiv.className = "todo-counter-or-svg-delete";

    const hashSpan = document.createElement("span");
    hashSpan.textContent = "# ";
    hashSpan.style.color = project.colorProject;
    navItemLeftDiv.appendChild(hashSpan);

    navItemLeftDiv.appendChild(document.createTextNode(project.title));

    const todoCounterSpan = document.createElement("span");
    todoCounterSpan.className = "todo-counter";
    todoCounterSpan.textContent = todoCounter;

    const svgDelete = document.createElement("button");
    svgDelete.className = "svg-delete";
    svgDelete.textContent = "🚮";

    todoCounterOrSvgDeleteDiv.append(todoCounterSpan, svgDelete);

    navItemProjectBtn.append(navItemLeftDiv, todoCounterOrSvgDeleteDiv);
    navProjectListDiv.appendChild(navItemProjectBtn);

    navProjectDiv.appendChild(navProjectListDiv);
  });

  const navProjectItemLeftDivs = document.querySelectorAll(".nav-item-left");
  const btnsDelete = document.querySelectorAll("button.svg-delete");

  function handleNavProjectBtn(navProjectBtn) {
    const titleProject = navProjectBtn.childNodes[0].textContent;
    createProjectItemDOM(titleProject, navProjectBtn.dataset.projectUuid);
  }

  navProjectItemLeftDivs.forEach((navItemLeftDiv) => {
    navItemLeftDiv.addEventListener("click", (e) => {
      handleNavProjectBtn(e.target.parentNode);
      const editProject = document.querySelector("#edit-project");
      editProject.setAttribute(
        "data-project-uuid",
        e.target.parentNode.dataset.projectUuid
      );

      if (
        e.target.parentNode.dataset.projectUuid !==
        "92da8517-0cf9-4741-937e-046ff150c7e1"
      ) {
        editProject.style = "display: flex";
      } else editProject.style = "display: none";
    });
  });

  btnsDelete.forEach((btnDelete) => {
    btnDelete.addEventListener("click", (e) => {
      const projectUuid = e.target.parentNode.parentNode.dataset.projectUuid;
      removeStorageItem("projects", projectUuid);
      removeStorageItem("todos", projectUuid);
      location.reload();
    });
  });
}
