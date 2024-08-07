import todoPrioColorHandler from "../logic/todoPrioColorHandler";
import {
  todoItemBtnDateContent,
  todoItemTitleRightContent,
} from "./nodesInnerHtmlContent";

export default function createTodoItemDOM(
  titleTodo,
  description,
  dueDate,
  priority,
  isChecked = false,
  uuid
) {
  const todoItem = document.createElement("li");
  todoItem.className = "todo-item";
  todoItem.setAttribute("data-uuid", uuid);

  // todo-item-title
  const todoItemTitle = document.createElement("div");
  todoItemTitle.className = "todo-item-title";

  const todoItemTitleLeft = document.createElement("div");
  todoItemTitleLeft.className = "todo-item-title-left";

  const todoItemTitleRight = document.createElement("div");
  todoItemTitleRight.className = "todo-item-title-right";

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.name = "checkbox";
  checkbox.className = "checkbox";
  checkbox.checked = isChecked;

  const todoTitle = document.createElement("button");
  todoTitle.className = "todo-title";
  todoTitle.textContent = titleTodo;

  todoItemTitleLeft.append(checkbox, todoTitle);

  todoItemTitleRight.innerHTML = todoItemTitleRightContent;

  todoItemTitle.append(todoItemTitleLeft, todoItemTitleRight);

  // todo-item-description
  const todoItemDescription = document.createElement("button");
  todoItemDescription.className = "todo-item-description";
  todoItemDescription.textContent = description;

  // todo-item-date-label
  const todoItemDateLabel = document.createElement("div");
  todoItemDateLabel.className = "todo-item-date-label";
  const btnDate = document.createElement("button");
  btnDate.innerHTML = todoItemBtnDateContent;

  const spanDueDate = document.createElement("span");

  spanDueDate.className = "due-date";
  spanDueDate.textContent = dueDate;

  btnDate.appendChild(spanDueDate);

  const prioFlagSpanColor = todoPrioColorHandler(priority);
  const prioFlagSpan = createPrioFlagSpan(prioFlagSpanColor);

  todoItemDateLabel.append(btnDate, prioFlagSpan);

  todoItem.append(todoItemTitle, todoItemDescription, todoItemDateLabel);

  return todoItem;
}

function createPrioFlagSpan(prioFlagSpanColor) {
  const prioFlagSpan = document.createElement("span");
  prioFlagSpan.className = "prio-flag";
  prioFlagSpan.innerHTML = `&#9873;`;

  if (!prioFlagSpanColor) prioFlagSpan.style.display = "none";
  else prioFlagSpan.style.color = prioFlagSpanColor;
  return prioFlagSpan;
}
