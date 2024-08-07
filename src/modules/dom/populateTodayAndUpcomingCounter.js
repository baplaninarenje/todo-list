import { format } from "date-fns";

export default function populateTodayUpcomingAndcompletedCounter(
  currentStorageTodos
) {
  const today = format(new Date(), "yyyy-MM-dd");
  const todayOrPastDueTodosCount = currentStorageTodos
    .filter((todo) => todo.isChecked === false)
    .filter((todo) => todo.dueDate <= today && todo.dueDate !== "").length;

  const todayCounterSpan = document.querySelector("#todo-today-counter");
  todayCounterSpan.textContent = todayOrPastDueTodosCount;

  const upcomingTodosCount = currentStorageTodos
    .filter((todo) => todo.isChecked === false)
    .filter((todo) => todo.dueDate > today).length;
  const upcomingCounterSpan = document.querySelector("#todo-upcoming-counter");
  upcomingCounterSpan.textContent = upcomingTodosCount;

  const completedTodosCount = currentStorageTodos.filter(
    (todo) => todo.isChecked === true
  ).length;
  const completedCounterSpan = document.querySelector(
    "#todo-completed-counter"
  );
  completedCounterSpan.textContent = completedTodosCount;
}
