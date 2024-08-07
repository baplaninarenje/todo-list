import { v4 as uuidv4 } from "uuid";

export default function createTodoItem(
  title,
  description,
  dueDate,
  priority,
  isChecked,
  projectName,
  projectUuid
) {
  const uuid = uuidv4();
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
