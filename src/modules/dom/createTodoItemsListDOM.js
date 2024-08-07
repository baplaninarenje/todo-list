import createTodoItemDOM from "./createTodoItemDOM";
import getStorageItem from "./../storage/getStorageItem";
import { btnsAddTask } from "./../../index";

const appendTodoItems = (todos, withReplacement = true) => {
  const todoItemsListDOM = document.querySelector(".todo-items-list");

  withReplacement ? todoItemsListDOM.replaceChildren() : todoItemsListDOM;
  todos.forEach((todo) => {
    const { title, description, dueDate, priority, isChecked, uuid } = todo;
    const todoItemDOM = createTodoItemDOM(
      title,
      description,
      dueDate,
      priority,
      isChecked,
      uuid
    );
    todoItemsListDOM.appendChild(todoItemDOM);
  });
};

export default function createTodoItemsListDOM(domElement) {
  const storageItemsNotCompleted = getStorageItem("todos").filter(
    (todo) => todo.isChecked === false
  );
  const dataProjectUuid = domElement.getAttribute("data-project-uuid");
  btnsAddTask.forEach((btnAddTask) => {
    btnAddTask.dataset.projectUuid = dataProjectUuid;
  });
  // Home project
  if (dataProjectUuid === "92da8517-0cf9-4741-937e-046ff150c7e1") {
    appendTodoItems(storageItemsNotCompleted);
  } else {
    const filteredItems = storageItemsNotCompleted.filter(
      (storageItem) => storageItem.projectUuid === dataProjectUuid
    );
    appendTodoItems(filteredItems);
  }
}

export { appendTodoItems };
