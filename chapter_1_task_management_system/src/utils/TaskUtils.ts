import type IItem from "../types/tasks";

export const saveTasksToLocalStorage: (items: IItem[]) => void = (
  items: IItem[]
) => {
  localStorage.setItem("tasks", JSON.stringify(items));
};

export const getTasksFromLocalStorage: () => IItem[] | undefined = () => {
  const tasks = localStorage.getItem("tasks");
  return tasks ? JSON.parse(tasks) : undefined;
};

// export const formatDate: (date: Date) => string = (date) => {
//   let day = date.getDate().toString();
//   if (day.length < 2) {
//     day = "0" + day;
//   }
//   let month = date.getMonth().toString();
//   if (month.length < 2) {
//     month = "0" + month;
//   }
//   const year = date.getFullYear().toString().slice(2);
//   return `${day}/${month}/${year}`;
// };

export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    day: "numeric",
    month: "short",
  }).format(date);
};
