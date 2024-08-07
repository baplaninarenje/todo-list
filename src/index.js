import "./styles/reset.css";
import "./styles/style.css";
import createTodoItemsListDOM from "./modules/dom/createTodoItemsListDOM";
import populateNavProjectsList from "./modules/dom/populateNavProjectsList";
import getStorageItem from "./modules/storage/getStorageItem";
import createStorageItem from "./modules/storage/createStorageItem";
import createProjectItemDOM from "./modules/dom/createProjectItemDOM";
import populateProjectNamesOptionsList from "./modules/dom/populateProjectNamesOptionsList";
import createTodoItem from "./modules/logic/createTodoItem";
import editTodoItem from "./modules/logic/editTodoItem";
import editProjectItem from "./modules/logic/editProjectItem";
import createProjectItem from "./modules/logic/createProjectItem";
import removeStorageItem from "./modules/storage/removeStorageItem";
import getStorageItemByUuid from "./modules/storage/getStorageItemByUuid";
import { format } from "date-fns";
import populateContentHeading from "./modules/dom/populateContentHeading";
import { appendTodoItems } from "./modules/dom/createTodoItemsListDOM";
import populateTodayUpcomingAndcompletedCounter from "./modules/dom/populateTodayAndUpcomingCounter";
import checkboxHandler from "./modules/dom/checkboxHandler";

const homeProject = {
  title: "Home",
  colorProject: "rgb(102, 102, 102)",
  projectUuid: "92da8517-0cf9-4741-937e-046ff150c7e1",
};
if (!("projects" in localStorage)) {
  createStorageItem("projects", homeProject);
}

const storageProjects = getStorageItem("projects");
const storageTodos = getStorageItem("todos");
populateTodayUpcomingAndcompletedCounter(storageTodos);
const btnsAddTask = document.querySelectorAll(".btn-add-task");
createProjectItemDOM(homeProject.title, homeProject.projectUuid);
populateNavProjectsList(
  storageProjects,
  storageTodos.filter((todo) => todo.isChecked === false)
);

// completed todos
const completedBtn = document.querySelector("#completed");
completedBtn.addEventListener("click", () => {
  editProject.style = "display: none";
  const currentStorageTodos = getStorageItem("todos");
  const completedTodos = currentStorageTodos.filter(
    (todo) => todo.isChecked === true
  );
  populateContentHeading("Completed");
  appendTodoItems(completedTodos);
});

checkboxHandler();
// completed todos

// today's todos

const todayBtn = document.querySelector("#today");
todayBtn.addEventListener("click", () => {
  editProject.style = "display:none";
  const today = format(new Date(), "yyyy-MM-dd");
  const currentStorageTodos = getStorageItem("todos").filter(
    (todo) => todo.isChecked === false
  );
  const todaysTodos = currentStorageTodos.filter(
    (todo) => todo.dueDate === today
  );
  const pastTodos = currentStorageTodos.filter(
    (todo) => todo.dueDate < today && todo.dueDate !== ""
  );
  populateContentHeading("Today");
  appendTodoItems(todaysTodos);

  if (pastTodos.length !== 0) {
    const todoItemsListDOM = document.querySelector(".todo-items-list");
    todoItemsListDOM.lastChild
      ? (todoItemsListDOM.lastChild.style =
          "border-bottom: solid 1px var(--red-color)")
      : todoItemsListDOM;
    const pastDueHeader = document.createElement("h3");
    pastDueHeader.className = "past-due";
    pastDueHeader.innerHTML = `&#9202; Past Due`;
    todoItemsListDOM.appendChild(pastDueHeader);

    appendTodoItems(pastTodos, false);
  }
});
// today's todos

// Upcoming's todos

const upcomingBtn = document.querySelector("#upcoming");
upcomingBtn.addEventListener("click", () => {
  editProject.style = "display: none";
  const today = format(new Date(), "yyyy-MM-dd");
  const currentStorageTodos = getStorageItem("todos").filter(
    (todo) => todo.isChecked === false
  );
  const upcomingTodos = currentStorageTodos.filter(
    (todo) => todo.dueDate > today
  );
  populateContentHeading("Upcoming");
  appendTodoItems(upcomingTodos);
});
// Upcoming's todos

// querySelectors
const btnAddProject = document.querySelector("#btn-add-project");
const dialogAddProject = document.querySelector("#dialog-add-project");
const dialogCloseProject = document.querySelector("#dialog-close-project");
const formProject = document.querySelector("#form-project");
const titleProject = document.querySelector("#title-project");
const colorProject = document.querySelector("#color-project");
// querySelectors

// handler functions
function handleSubmitProject() {
  return createProjectItem(titleProject.value, colorProject.value);
}

// handler functions
btnAddProject.addEventListener("click", () => {
  dialogAddProject.classList.remove("edit-project");
  dialogAddProject.showModal();
});

dialogCloseProject.addEventListener("click", () => {
  dialogAddProject.close();
});

// clear form when dialog closed on ESC
dialogAddProject.addEventListener("close", () => {
  formProject.reset();
});

formProject.addEventListener("submit", (e) => {
  e.preventDefault();
  if (dialogAddProject.classList.contains("edit-project")) {
    const editedProjectItem = handleSubmitEditProject();
    createStorageItem("projects", editedProjectItem);
    dialogAddProject.close();
    createProjectItemDOM(
      editedProjectItem.title,
      editedProjectItem.projectUuid
    );

    const storageProjects = getStorageItem("projects");
    const storageTodos = getStorageItem("todos").filter(
      (todo) => todo.isChecked === false
    );
    populateNavProjectsList(storageProjects, storageTodos);
  } else {
    const projectItem = handleSubmitProject();
    createStorageItem("projects", projectItem);
    dialogAddProject.close();

    editProject.setAttribute("data-project-uuid", projectItem.projectUuid);

    createProjectItemDOM(projectItem.title, projectItem.projectUuid);

    const storageProjects = getStorageItem("projects");
    const storageTodos = getStorageItem("todos").filter(
      (todo) => todo.isChecked === false
    );
    populateNavProjectsList(storageProjects, storageTodos);
  }
});

// querySelectors add task

const dialogAddTodo = document.querySelector("#dialog-add-todo");
const dialogCloseTodo = document.querySelector("#dialog-close-todo");
const formTodo = document.querySelector("#form-todo");
const project = document.querySelector("#project");
const description = document.querySelector("#description");
const titleTodo = document.querySelector("#title-todo");
const dueDate = document.querySelector("#dueDate");
const priority = document.querySelector("#priority");
// querySelectors add task

// add task
btnsAddTask.forEach((btnAddTask) => {
  btnAddTask.addEventListener("click", () => {
    dialogAddTodo.showModal();
    populateProjectNamesOptionsList(project);
  });
});

dialogCloseTodo.addEventListener("click", () => {
  dialogAddTodo.close();
});

// clear form when dialog closed on ESC
dialogAddTodo.addEventListener("close", () => {
  formTodo.reset();
});

function handleSubmitTodo() {
  return createTodoItem(
    titleTodo.value,
    description.value,
    dueDate.value,
    priority.value,
    false,
    project.value,
    project.childNodes[project.selectedIndex].getAttribute("data-project-uuid")
  );
}

formTodo.addEventListener("submit", (e) => {
  e.preventDefault();
  const todoItem = handleSubmitTodo();
  createStorageItem("todos", todoItem);
  dialogAddTodo.close();
  const selectedOption = project.childNodes[project.selectedIndex];
  createProjectItemDOM(
    selectedOption.textContent,

    selectedOption.getAttribute("data-project-uuid")
  );
  const storageProjects = getStorageItem("projects");
  const storageTodos = getStorageItem("todos").filter(
    (todo) => todo.isChecked === false
  );
  populateTodayUpcomingAndcompletedCounter(storageTodos);
  populateNavProjectsList(storageProjects, storageTodos);
});
// add task

// querySelectors edit task
const todoItemsListDOM = document.querySelector(".todo-items-list");
const dialogEditTodo = document.querySelector("#dialog-edit-todo");
const dialogCloseTodoEdit = document.querySelector("#dialog-close-todo-edit");
const formTodoEdit = document.querySelector("#form-todo-edit");
const descriptionEdit = document.querySelector("#description-edit");
const titleTodoEdit = document.querySelector("#title-edit-todo");
const dueDateEdit = document.querySelector("#dueDate-edit");
const priorityEdit = document.querySelector("#priority-edit");
const projectEdit = document.querySelector("#project-edit");
// querySelectors edit task

todoItemsListDOM.addEventListener("click", (e) => {
  const targetClass = e.target.classList;
  // edit task
  if (
    targetClass.contains("btn-edit-task") ||
    targetClass.contains("todo-title")
  ) {
    const parentListItem = e.target.parentNode.parentNode.parentNode;
    const storageTodo = getStorageItem("todos").filter(
      (todo) => todo.uuid === parentListItem.dataset.uuid
    )[0];

    const {
      title,
      description,
      dueDate,
      priority,
      isChecked,
      projectName,
      uuid,
      projectUuid,
    } = storageTodo;

    dialogEditTodo.setAttribute("data-uuid", uuid);
    descriptionEdit.value = description;
    titleTodoEdit.value = title;
    dueDateEdit.value = dueDate;
    priorityEdit.value = priority;

    populateProjectNamesOptionsList(projectEdit);

    dialogEditTodo.showModal();
    projectEdit.childNodes.forEach((node) => {
      if (node.dataset.projectUuid === projectUuid) node.selected = true;
    });
  }
  // delete-task
  if (targetClass.contains("btn-delete-task")) {
    const parentListItem = e.target.parentNode.parentNode.parentNode;
    removeStorageItem("todos", parentListItem.dataset.uuid, "uuid");
    parentListItem.remove();
    const storageProjects = getStorageItem("projects");
    const storageTodos = getStorageItem("todos").filter(
      (todo) => todo.isChecked === false
    );
    populateTodayUpcomingAndcompletedCounter(storageTodos);
    populateNavProjectsList(storageProjects, storageTodos);
  }
});

dialogCloseTodoEdit.addEventListener("click", () => {
  dialogEditTodo.close();
});

// clear form when dialog closed on ESC
dialogEditTodo.addEventListener("close", () => {
  formTodoEdit.reset();
});

function handleSubmitEditTodo(e) {
  const uuid = e.target.parentNode.dataset.uuid;
  removeStorageItem("todos", uuid, "uuid");
  return editTodoItem(
    titleTodoEdit.value,
    descriptionEdit.value,
    dueDateEdit.value,
    priorityEdit.value,
    false,
    projectEdit.value,
    uuid,
    projectEdit.childNodes[projectEdit.selectedIndex].getAttribute(
      "data-project-uuid"
    )
  );
}

formTodoEdit.addEventListener("submit", (e) => {
  e.preventDefault();
  const todoItem = handleSubmitEditTodo(e);
  createStorageItem("todos", todoItem);
  dialogEditTodo.close();
  createTodoItemsListDOM(btnsAddTask[0]);
  const storageProjects = getStorageItem("projects");
  const storageTodos = getStorageItem("todos").filter(
    (todo) => todo.isChecked === false
  );
  populateTodayUpcomingAndcompletedCounter(storageTodos);
  populateNavProjectsList(storageProjects, storageTodos);
});
// edit task

// edit project
const editProject = document.querySelector("#edit-project");
editProject.addEventListener("click", (e) => {
  if (e.target.id === "edit-project") {
    const storageProject = getStorageItemByUuid(
      "projects",
      e.target.dataset.projectUuid
    );
    titleProject.value = storageProject.title;
    colorProject.value = storageProject.colorProject;
    dialogAddProject.classList.add("edit-project");
    dialogAddProject.showModal();
  }
});

function handleSubmitEditProject() {
  const projectUuid = editProject.dataset.projectUuid;
  removeStorageItem("projects", projectUuid);
  return editProjectItem(titleProject.value, colorProject.value, projectUuid);
}
export { btnsAddTask };
