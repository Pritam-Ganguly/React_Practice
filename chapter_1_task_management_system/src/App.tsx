import {
  Button,
  OverlayDrawer,
  Title1,
  useRestoreFocusSource,
  useRestoreFocusTarget,
} from "@fluentui/react-components";
import { FormNew24Regular } from "@fluentui/react-icons";
import { useEffect, useState } from "react";
import type IItem from "./types/tasks";
import useStyle from "./App.styles";
import {
  getTasksFromLocalStorage,
  saveTasksToLocalStorage,
} from "./utils/TaskUtils";
import TaskList from "./components/TaskList";
import type { ActionProps } from "./types/tasks";
import TaskForm from "./components/TaskForm";

function App() {
  const styles = useStyle();
  const restoreFocusSource = useRestoreFocusSource();
  const restoreFocusTarget = useRestoreFocusTarget();

  const [tasks, setTasks] = useState<IItem[]>([]);
  const [currentTask, setCurrentTask] = useState<IItem | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState<boolean>(false);

  useEffect(() => {
    const storedTasks = getTasksFromLocalStorage();
    if (storedTasks) {
      setTasks(
        storedTasks.map((task) => ({
          ...task,
          createdAt: new Date(task.createdAt),
          dueDate: new Date(task.dueDate),
        }))
      );
    }
  }, []);

  useEffect(() => {
    saveTasksToLocalStorage(tasks);
  }, [tasks]);

  const onAddTaskHandler: ActionProps["onAddTask"] = (nItem) => {
    const newTask = {
      ...nItem,
      id: Date.now().toString(),
      createdAt: new Date(),
    };
    setTasks((prev) => [newTask, ...prev]);
  };

  const onUpdateTaskHandler: ActionProps["onUpdateTask"] = (updatedTask) => {
    setTasks((prev) => [
      ...prev.filter((t) => t.id != updatedTask.id),
      updatedTask,
    ]);
    setCurrentTask(null);
  };

  const onDeleteTaskHander: ActionProps["onDeleteTask"] = (id) => {
    setTasks((prev) => prev.filter((t) => t.id != id));
  };

  const onEditTaskHandler: (item: IItem) => void = (item) => {
    setCurrentTask(item);
    setIsPanelOpen(true);
  };

  const onPanelCloseHandler: () => void = () => {
    setIsPanelOpen(false);
  };

  return (
    <>
      <div className={styles.header}>
        <Title1 font="monospace" className={styles.title}>
          Task Management System
        </Title1>
        <Button
          appearance="primary"
          size="large"
          {...restoreFocusTarget}
          onClick={() => setIsPanelOpen(true)}
          className={styles.createNewTaskButton}
        >
          <FormNew24Regular /> Create New Task
        </Button>
      </div>
      <div className={styles.bodyContent}>
        <TaskList
          items={tasks}
          onDeleteItem={onDeleteTaskHander}
          onEditTask={onEditTaskHandler}
        />
      </div>

      <OverlayDrawer
        as="aside"
        {...restoreFocusSource}
        open={isPanelOpen}
        onOpenChange={(_: undefined, data: { open: boolean }) =>
          setIsPanelOpen(data.open)
        }
        className={styles.overlay}
      >
        <TaskForm
          currentTask={currentTask}
          onAddRequest={onAddTaskHandler}
          onUpdateRequest={onUpdateTaskHandler}
          onClose={onPanelCloseHandler}
        />
      </OverlayDrawer>
    </>
  );
}

export default App;
