import createStorageItem from "../storage/createStorageItem";
import getStorageItem from "../storage/getStorageItem";
import getStorageItemByUuid from "../storage/getStorageItemByUuid";
import removeStorageItem from "../storage/removeStorageItem";
import populateNavProjectsList from "./populateNavProjectsList";
import populateTodayUpcomingAndcompletedCounter from "./populateTodayAndUpcomingCounter";

export default function checkboxHandler() {
  const todoItemsListDOM = document.querySelector(".todo-items-list");

  todoItemsListDOM.addEventListener("click", (e) => {
    const targetClass = e.target.classList;
    if (targetClass.contains("checkbox")) {
      const parentListItem = e.target.parentNode.parentNode.parentNode;
      const storageTodo = getStorageItemByUuid(
        "todos",
        parentListItem.dataset.uuid,
        "uuid"
      );
      storageTodo.isChecked = !storageTodo.isChecked;
      console.log(storageTodo);
      removeStorageItem("todos", parentListItem.dataset.uuid, "uuid");
      parentListItem.remove();
      createStorageItem("todos", storageTodo);
      const storageProjects = getStorageItem("projects");
      const storageTodos = getStorageItem("todos");
      populateTodayUpcomingAndcompletedCounter(storageTodos);
      populateNavProjectsList(
        storageProjects,
        storageTodos.filter((todo) => todo.isChecked === false)
      );
    }
  });
}
