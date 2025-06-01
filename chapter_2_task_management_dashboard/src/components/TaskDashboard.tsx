import {
  Body1,
  Button,
  Caption1,
  Card,
  CardHeader,
  CardPreview,
  Checkbox,
  Input,
  Label,
  PresenceBadge,
  Spinner,
  Subtitle1,
  Text,
  Title1,
  useId,
} from "@fluentui/react-components";
import {
  ClipboardTaskAdd24Regular,
  ClipboardTextEdit24Regular,
  TextDescriptionRtl24Regular,
} from "@fluentui/react-icons";
import useStyles from "./TaskDashboard.styles";
import { useEffect, useState } from "react";
import axios from "axios";

interface ITask {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  createdDate: Date;
}

const TaskDashBoard: React.FC = () => {
  const titleId = useId("title");
  const titleDescription = useId("Description");
  const styles = useStyles();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [newTask, setNewTasks] = useState<Omit<ITask, "createdDate">>({
    completed: false,
    id: 0,
    title: "",
    description: "",
  });
  const [editTaskId, setEditTaskId] = useState<number | null>(null);

  useEffect(() => {
    let hasMounted = true;
    const fetchData = async () => {
      try {
        setIsLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 500));
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/todos?_limit=5"
        );
        const currentTask: ITask[] = response.data.map((task: any) => ({
          id: task.id,
          title: task.title,
          description: "description for task" + task.title,
          completed: task.completed,
          createdDate: new Date(),
        }));
        if (hasMounted) {
          setTasks(currentTask);
        }
      } catch (ex: any) {
        if (hasMounted) {
          setError(`An error has occured ${ex.Message}`);
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();

    return () => {
      hasMounted = false;
    };
  }, []);

  useEffect(() => {
    if (tasks.length === 0) return;
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    if (!editTaskId) return;
    const reOrder = () => {
      setTasks((prev) => [
        ...prev.filter((p) => p.id === editTaskId),
        ...prev.filter((p) => p.id !== editTaskId),
      ]);
    };
    reOrder();
  }, [editTaskId]);

  useEffect(() => {
    const handleKeyDown = (key: any) => {
      if (key.key === "Escape" && editTaskId) {
        setEditTaskId(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [editTaskId]);

  useEffect(() => {
    console.warn("Component Unloaded");
  });

  useEffect(() => {
    if (newTask.id === 0) return;
    const timer = setTimeout(() => {
      console.log("Refresh Page");
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, [newTask]);

  useEffect(() => {
    const handleOnline = () => {
      setError(null);
    };

    const handleOffline = () => {
      setError("You're offline");
    };
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const handleAddNewTask = () => {
    try {
      setIsLoading(true);
      const task: ITask = {
        ...newTask,
        id: tasks.length + 1,
        createdDate: new Date(),
      };
      setTasks((prev) => [...prev, task]);
      setNewTasks({
        completed: false,
        id: 0,
        title: "",
        description: "",
      });
    } catch (er: any) {
      setError(`An error occured: ${er.Message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateTask: (
    task: ITask,
    item: keyof ITask,
    value: string | boolean
  ) => void = (task, item, value) => {
    setTasks((prev) => [
      { ...task, [item]: value },
      ...prev.filter((p) => p.id !== task.id),
    ]);
  };

  const handleSaveTask = async () => {
    try {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 400));
      setEditTaskId(null);
    } catch (er: any) {
      setError(`An error has occured ${er.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete: (id: number) => void = async (id) => {
    try {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 300));
      setTasks((prev) => prev.filter((task) => task.id !== id));
    } catch (er: any) {
      setError(`An error has occured ${er.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className={styles.header}>
        <Title1>Task Management Dashboard</Title1>
        {error && <div>{error}</div>}
      </div>
      <div></div>
      <div className={styles.activeBody}>
        <div className={styles.input}>
          <>
            <Label htmlFor={titleId}>
              <Subtitle1 className={styles.inputLabel}>Task Title</Subtitle1>
            </Label>
            <Input
              contentAfter={<ClipboardTextEdit24Regular />}
              type="text"
              id={titleId}
              value={newTask.title}
              onChange={(_, data) =>
                setNewTasks((prev) => ({ ...prev, title: data.value }))
              }
            />
          </>
          <>
            <Body1>Enter title of new task</Body1>
          </>
        </div>
        <div className={styles.input}>
          <>
            <Label htmlFor={titleDescription}>
              <Subtitle1 className={styles.inputLabel}>
                Task Description
              </Subtitle1>
            </Label>
            <Input
              contentAfter={<TextDescriptionRtl24Regular />}
              type="text"
              id={titleDescription}
              value={newTask.description}
              onChange={(_, data) =>
                setNewTasks((prev) => ({ ...prev, description: data.value }))
              }
            />
          </>
          <>
            <Body1>Enter description of new task</Body1>
          </>
        </div>
        <Button
          appearance="primary"
          icon={<ClipboardTaskAdd24Regular />}
          className={styles.createNewTaskButton}
          onClick={handleAddNewTask}
        >
          Create New Task
        </Button>
      </div>
      {isLoading ? (
        <Spinner labelPosition="after" label="Loading tasks" />
      ) : (
        <div className={styles.listBody}>
          {tasks.map((task, i) =>
            task.id === editTaskId ? (
              <Card
                className={styles.card}
                orientation="horizontal"
                key={task.id + i}
              >
                <CardPreview className={styles.horizontalCardImage}>
                  <ClipboardTextEdit24Regular />
                </CardPreview>
                <>
                  <Label htmlFor={titleId}>
                    <Text>Task Title</Text>
                  </Label>
                  <Input
                    type="text"
                    value={task.title}
                    onChange={(_, data) =>
                      handleUpdateTask(task, "title", data.value)
                    }
                  />
                  <Label htmlFor={titleId}>
                    <Text>Task Description</Text>
                  </Label>
                  <Input
                    type="text"
                    value={task.description}
                    onChange={(_, data) =>
                      handleUpdateTask(task, "description", data.value)
                    }
                  />
                  <Checkbox
                    checked={task.completed}
                    onChange={(_, data) =>
                      handleUpdateTask(task, "completed", data.checked)
                    }
                    label="Done"
                  />
                </>
                <Button appearance="primary" onClick={handleSaveTask}>
                  Save
                </Button>
              </Card>
            ) : (
              <Card
                className={styles.card}
                orientation="horizontal"
                key={task.id + i}
              >
                <CardPreview className={styles.horizontalCardImage}>
                  <ClipboardTextEdit24Regular />
                </CardPreview>
                {task.completed && <PresenceBadge />}
                <CardHeader
                  header={<Text weight="semibold">{task.title}</Text>}
                  description={
                    <Caption1 className={styles.caption}>
                      {task.description}
                    </Caption1>
                  }
                />
                <Button
                  appearance="primary"
                  onClick={() => setEditTaskId(task.id)}
                >
                  Edit
                </Button>
                <Button
                  appearance="outline"
                  onClick={() => handleDelete(task.id)}
                >
                  Delete
                </Button>
              </Card>
            )
          )}
        </div>
      )}
      <div></div>
    </>
  );
};

export default TaskDashBoard;
