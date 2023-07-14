import { PlusCircle, ClipboardText } from '@phosphor-icons/react';
import styles from './Tasks.module.css';
import { useState } from 'react';
import { Task } from './Task';

export interface ITask {
  id: number;
  description: string;
  isDone: boolean;
}

export function Tasks() {
  const [tasks, setTasks] = useState<ITask[]>([{
    id: 1,
    description: "Terminar esta tela",
    isDone: false
  }, {
    id: 2,
    description: "Ir treinar",
    isDone: true
  }, {
    id: 3,
    description: "Ir tomar banho",
    isDone: false
  }]);

  const [taskId, setTaskId] = useState(tasks.length);
  const [newTaskText, setNewTaskText] = useState('');

  function handleCheckedTask(id: number){
    const tasksUpdatedWithCheck = tasks.map(task => {
      if (task.id === id) task.isDone = !task.isDone

      return task;
    })

    setTasks(tasksUpdatedWithCheck);
  }

  function handleCreateNewTask(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const newTaskId = taskId + 1;
    const newTask: ITask = {
      id: newTaskId,
      description: newTaskText,
      isDone: false
    }
    
    setTasks([newTask, ...tasks]);
    setTaskId(newTaskId);
    setNewTaskText('');
  }

  function handleRemoveTask(id: number) {
    const tasksWithoutRemovedOne = tasks.filter(task => task.id !== id);

    setTasks(tasksWithoutRemovedOne);
  }

  const isNewTaskEmpty = newTaskText.length === 0;
  const countOfTask = tasks.length;
  const countOfTaskDoned = tasks.filter(task => task.isDone).length;
  const textTaskDone = `${countOfTaskDoned} de ${countOfTask}`;

  return (
    <main className={styles.container}>
      <form onSubmit={handleCreateNewTask} className={styles.newTask}>
        <input 
          type='text'
          placeholder='Adicione uma nova tarefa'
          value={newTaskText}
          onChange={(event) => setNewTaskText(event.target.value)}
        />

        <button
          type="submit"
          disabled={isNewTaskEmpty}
        >
          Criar <PlusCircle size={16} />
        </button>
      </form>

      <div className={styles.tasks}>
        <div className={styles.tasksResume}>
          <div className={styles.createdTasks}>
            <span>Tarefas criadas</span>
            <span className={styles.countTasks}>
              { countOfTask }
            </span>
          </div>

          <div className={styles.fineshedTasks}>
            <span>Concluídas</span>
            <span className={styles.countTasks}>
              { textTaskDone }
            </span>
          </div>
        </div>

        <div className={styles.tasksList}>
          { tasks.length ? (
            tasks.map(task => {
              return (
                <Task 
                  key={task.id}
                  task={task}
                  onCheckedTask={handleCheckedTask}
                  onRemoveTask={handleRemoveTask}
                />
              );
            })
          ) : (
            <div className={styles.emptyListTasks}>
              <ClipboardText size={56} />
              <p>Você não tem tarefas cadastradas</p>
              <span>Crie tarefas e organize seus itens a fazer</span>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}