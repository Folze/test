import { makeAutoObservable } from "mobx";

export type Task = {
  name: string;
  completed: boolean;
  subtasks: Task[];
};

class TaskStore {
  array: Task[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  addTask(name: string) {
    const newTask: Task = {
      name,
      completed: false,
      subtasks: [],
    };
    this.array.push(newTask);
  }

  toggleTaskCompletion(task: Task) {
    task.completed = !task.completed;
  }
}

export const taskStore = new TaskStore();
export default taskStore;
