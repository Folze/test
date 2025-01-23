import { observer } from "mobx-react-lite";
import { taskStore } from "../stores/TaskStore";
import { useState } from "react";

//               onChange={() => taskStore.toggleTaskCompletion(task)}

const TaskList = observer(() => {
  const [taskName, setTaskName] = useState("");
  const addNewTask = () => {
    if (taskName.trim()) {
      taskStore.addTask(taskName);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Task List</h1>
      <input
        type="text"
        placeholder="Добавьте задачу"
        value={taskName}
        onChange={(e) => {
          setTaskName(e.target.value);
        }}
      />
      <button
        onClick={() => {
          addNewTask();
        }}
      >
        Добавить задачу
      </button>
      <ul>
        {taskStore.array.map((task) => (
          <li>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => {
                taskStore.toggleTaskCompletion(task);
                console.log(task.completed);
              }}
            />
            {task.name}
          </li>
        ))}
      </ul>
    </div>
  );
});
export default TaskList;
