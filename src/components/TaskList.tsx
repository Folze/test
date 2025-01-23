import { observer } from "mobx-react-lite";
import { taskStore, Task } from "../stores/TaskStore";
import { useState } from "react";
import "../styles/global.css";

const TaskList = observer(() => {
  const [taskName, setTaskName] = useState("");
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const addNewTask = () => {
    if (taskName.trim()) {
      taskStore.addTask(taskName);
      setTaskName("");
    }
  };

  const openModal = (task: Task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedTask(null);
    setIsModalOpen(false);
  };

  // Функция для обработки клика по задаче (исключая чекбокс)
  const handleTaskClick = (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>,
    task: Task
  ) => {
    if (
      !(e.target instanceof HTMLInputElement && e.target.type === "checkbox")
    ) {
      openModal(task);
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
            className="flex items-center justify-between p-3 bg-gray-100 rounded-lg shadow-sm cursor-pointer"
            onClick={(e) => handleTaskClick(e, task)}
          >
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => taskStore.toggleTaskCompletion(task)}
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

      {/* Модальное окно */}
      {isModalOpen && selectedTask && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 relative">
            <h2 className="text-xl font-semibold mb-4">
              Задача: {selectedTask.name}
            </h2>
            <p className="mb-4">
              Завершена: {selectedTask.completed ? "Да" : "Нет"}
            </p>
            <div className="flex justify-end">
              <button
                onClick={closeModal}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
              >
                Закрыть
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

export default TaskList;
