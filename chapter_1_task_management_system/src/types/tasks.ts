export type TaskStatus = "completed" | "in-progress" | "not-started";

export default interface IItem {
  id: string;
  title: string;
  description: string;
  createdAt: Date;
  status: TaskStatus;
  dueDate: Date;
}

export type ActionProps = {
  onAddTask: (nItem: Omit<IItem, "id" | "createdAt">) => void;
  onUpdateTask: (updateTask: IItem) => void;
  onDeleteTask: (id: string) => void;
};
