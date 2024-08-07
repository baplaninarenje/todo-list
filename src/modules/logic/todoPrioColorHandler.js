export default function todoPrioColorHandler(priority) {
  let color;
  switch (priority) {
    case "p4":
      color = "rgba(0, 0, 0, 0.4)";
      break;

    case "p3":
      color = "rgb(36, 111, 224)";
      break;

    case "p2":
      color = "rgb(235, 137, 9)";
      break;

    case "p1":
      color = "rgb(209, 69, 59)";
      break;

    default:
      color = false;
      break;
  }
  return color;
}
