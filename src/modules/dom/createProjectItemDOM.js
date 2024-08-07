import createTodoItemsListDOM from "./createTodoItemsListDOM";
import populateContentHeading from "./populateContentHeading";
import { btnsAddTask } from "./../../index";

export default function createProjectItemDOM(titleProject, projectUuid) {
  populateContentHeading(titleProject);

  btnsAddTask.forEach((btnAddTask) => {
    btnAddTask.dataset.projectUuid = projectUuid;
  });

  createTodoItemsListDOM(btnsAddTask[0]);
}
