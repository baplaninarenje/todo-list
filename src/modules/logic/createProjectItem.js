import { v4 as uuidv4 } from "uuid";

export default function createProjectItem(title, colorProject) {
  const projectUuid = uuidv4();
  return {
    title,
    colorProject,
    projectUuid,
  };
}
