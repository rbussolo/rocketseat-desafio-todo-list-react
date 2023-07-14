import { ITask } from "./Tasks";
import { Trash } from '@phosphor-icons/react';
import styles from './Task.module.css';
import { CheckBox } from "./CheckBox";

interface TaskProps {
  task: ITask
  onCheckedTask: (taskId: number) => void;
  onRemoveTask: (taskId: number) => void;
}

export function Task({ task, onCheckedTask, onRemoveTask }: TaskProps) {
  const classTaskIsDone = task.isDone ? ' ' + styles.taskIsDone : '';

  function handleCheckedTask() {
    onCheckedTask(task.id);
  }

  function handleRemoveTask() {
    onRemoveTask(task.id);
  }

  return (
    <div className={styles.taskContainer + classTaskIsDone}>
      <CheckBox 
        isChecked={task.isDone} 
        onChecked={handleCheckedTask}
      />
      <span>{task.description}</span>
      <button onClick={handleRemoveTask} className={styles.delete}>
        <Trash size={16}  />
      </button>
    </div>
  );
}