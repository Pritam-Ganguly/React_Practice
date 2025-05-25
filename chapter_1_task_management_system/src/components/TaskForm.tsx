import {
  Button,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerHeaderTitle,
  Field,
  Input,
  Label,
  Radio,
  RadioGroup,
  Textarea,
  useId,
  type InputOnChangeData,
  type RadioGroupOnChangeData,
  type TextareaOnChangeData,
} from "@fluentui/react-components";
import {
  CalendarDate24Regular,
  DocumentHeader24Regular,
  Status24Regular,
  TextDescriptionLtr24Filled,
} from "@fluentui/react-icons";
import { DatePicker } from "@fluentui/react-datepicker-compat";
import { useTaskFormStyles } from "./TaskForm.styles";
import type IItem from "../types/tasks";
import { useState } from "react";
import type { TaskStatus } from "../types/tasks";

interface ITaskFormProps {
  currentTask: IItem | null;
  onAddRequest: (nItem: Omit<IItem, "id" | "createdAt">) => void;
  onUpdateRequest: (updateTask: IItem) => void;
  onClose: () => void;
}

const TaskForm: React.FC<ITaskFormProps> = ({
  currentTask,
  onAddRequest,
  onUpdateRequest,
  onClose,
}) => {
  const styles = useTaskFormStyles();
  const titleId = useId("title-input");
  const forUpdate: boolean = !!currentTask;

  const [currentItem, setCurrentItem] = useState<
    Omit<IItem, "id" | "createdAt">
  >(
    currentTask || {
      title: "",
      description: "",
      dueDate: new Date(),
      status: "not-started",
    }
  );

  const handleTitleChange: (
    ev: React.ChangeEvent<HTMLInputElement>,
    data: InputOnChangeData
  ) => void = (_, data) => {
    setCurrentItem((prev) => ({ ...prev, title: data.value }));
  };

  const handleDescriptionChange: (
    ev: React.ChangeEvent<HTMLTextAreaElement>,
    data: TextareaOnChangeData
  ) => void = (_, data) => {
    setCurrentItem((prev) => ({ ...prev, description: data.value }));
  };

  const handleSelectDate: (date: Date | null | undefined) => void = (date) => {
    if (date) {
      setCurrentItem((prev) => ({ ...prev, dueDate: date }));
    }
  };

  const handleOnRadioChange: (
    ev: React.FormEvent<HTMLDivElement>,
    data: RadioGroupOnChangeData
  ) => void = (_, data) => {
    setCurrentItem((prev) => ({ ...prev, status: mapToStatus(data.value) }));
  };

  const handleSubmit: (ev: React.FormEvent) => void = (ev) => {
    ev.preventDefault();
    if (forUpdate) {
      onUpdateRequest(currentItem as IItem);
    } else {
      onAddRequest(currentItem);
    }
    onClose();
  };

  const mapToStatus: (st: string) => TaskStatus = (st) => {
    switch (st) {
      case "completed":
        return "completed";
      case "in-progress":
        return "in-progress";
      default:
        return "not-started";
    }
  };

  return (
    <>
      <DrawerHeader>
        <DrawerHeaderTitle>
          {forUpdate ? "Edit Task" : "Create New Task"}
        </DrawerHeaderTitle>
      </DrawerHeader>
      <DrawerBody>
        <section className={styles.form}>
          <div className={styles.container}>
            <Label htmlFor={titleId} className={styles.label}>
              <DocumentHeader24Regular /> Enter Title
            </Label>
            <Input
              appearance="outline"
              id={titleId}
              className={styles.input}
              value={currentItem.title}
              onChange={handleTitleChange}
            />
          </div>
          <Field
            size="medium"
            label={
              <div className={styles.label}>
                <TextDescriptionLtr24Filled /> Enter Description
              </div>
            }
            className={styles.container}
          >
            <Textarea
              className={styles.input}
              value={currentItem.description}
              onChange={handleDescriptionChange}
            />
          </Field>
          <Field
            label={
              <div className={styles.label}>
                <CalendarDate24Regular /> Enter Due Date
              </div>
            }
            className={styles.container}
          >
            <DatePicker
              className={styles.input}
              placeholder="Select due date"
              value={currentItem.dueDate}
              onSelectDate={handleSelectDate}
            />
          </Field>
          <Field
            label={
              <div className={styles.label}>
                <Status24Regular /> Status
              </div>
            }
            className={styles.container}
          >
            <RadioGroup
              value={currentItem.status}
              onChange={handleOnRadioChange}
            >
              <Radio value="completed" label="Completed" />
              <Radio value="in-progress" label="In Progress" />
              <Radio value="not-started" label="Not Started" />
            </RadioGroup>
          </Field>
        </section>
      </DrawerBody>
      <DrawerFooter className={styles.drawerFooter}>
        <Button onClick={handleSubmit} appearance="primary">
          {forUpdate ? "Update" : "Create"}
        </Button>
        <Button onClick={onClose} appearance="outline">
          Cancel
        </Button>
      </DrawerFooter>
    </>
  );
};

export default TaskForm;
