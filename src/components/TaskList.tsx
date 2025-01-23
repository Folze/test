import { observer } from "mobx-react-lite";
import { taskStore } from "../stores/TaskStore";
import { useState } from "react";
import "../styles/global.css";

const TaskList = observer(() => {
  const [taskName, setTaskName] = useState("");

  const addNewTask = () => {
    if (taskName.trim()) {
      taskStore.addTask(taskName);
      setTaskName("");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="text-center text-3xl font-semibold text-blue-600 mb-6">
        Task List
      </div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Добавьте задачу"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <button
        onClick={addNewTask}
        className="w-full p-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Добавить задачу
      </button>

      <ul className="mt-6 space-y-4">
        {taskStore.array.map((task, index) => (
          <li
            key={index}
            className="flex items-center justify-between p-3 bg-gray-100 rounded-lg shadow-sm"
          >
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => {
                  taskStore.toggleTaskCompletion(task);
                  console.log(task.completed);
                }}
                className="form-checkbox h-5 w-5 text-blue-500"
              />
              <span
                className={task.completed ? "line-through text-gray-500" : ""}
              >
                {task.name}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
});

export default TaskList;
