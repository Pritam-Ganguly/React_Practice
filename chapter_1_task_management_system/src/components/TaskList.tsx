import type IItem from "../types/tasks";
import TaskItem from "./TaskItem";
import { useTaskListStyles } from "./TaskList.styles";

type TaskListProps = {
  items: IItem[];
  onDeleteItem: (id: string) => void;
  onEditTask: (item: IItem) => void;
};

const TaskList: React.FC<TaskListProps> = ({
  items,
  onEditTask,
  onDeleteItem,
}) => {
  const styles = useTaskListStyles();
  return (
    <div className={styles.main}>
      <section className={styles.section}>
        {items.map((item, i) => (
          <TaskItem
            key={i}
            item={item}
            onDelete={onDeleteItem}
            onEdit={onEditTask}
          />
        ))}
      </section>
    </div>
  );
};

export default TaskList;
