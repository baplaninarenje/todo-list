export default function editTodoItem(
  title,
  description,
  dueDate,
  priority,
  isChecked,
  projectName,
  uuid,
  projectUuid
) {
  return {
    title,
    description,
    dueDate,
    priority,
    isChecked,
    projectName,
    uuid,
    projectUuid,
  };
}
