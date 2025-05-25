import { Button, Card, CardHeader, Text } from "@fluentui/react-components";
import {
  Delete24Filled,
  BoxEdit24Filled,
  ClipboardTask24Filled,
} from "@fluentui/react-icons";
import type IItem from "../types/tasks";
import { useTaskITemStyles } from "./TaskItem.styles";
import { formatDate } from "../utils/TaskUtils";

type TaskITemProps = {
  item: IItem;
  onDelete: (id: string) => void;
  onEdit: (item: IItem) => void;
};

const TaskItem: React.FC<TaskITemProps> = ({ item, onDelete, onEdit }) => {
  const styles = useTaskITemStyles();
  return (
    <>
      <Card className={styles.card}>
        <CardHeader
          image={
            <ClipboardTask24Filled
              className={
                item.status === "completed"
                  ? styles.iconCompleted
                  : item.status === "in-progress"
                  ? styles.iconInProgress
                  : styles.iconNotStarted
              }
            />
          }
          header={<Text weight="semibold">{item.title}</Text>}
          action={
            <>
              <Button onClick={() => onEdit(item)}>
                <BoxEdit24Filled />
              </Button>
              <Button onClick={() => onDelete(item.id)}>
                <Delete24Filled />
              </Button>
            </>
          }
        />
        <p className={styles.text}>{item.description}</p>
        <footer className={styles.footer}>
          Due date: {formatDate(item.dueDate)}
        </footer>
      </Card>
    </>
  );
};

export default TaskItem;
