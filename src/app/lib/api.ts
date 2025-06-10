import axios from "axios";
import { Task, TaskInput } from "../types";

const api = axios.create({
  baseURL: "http://localhost:8000", // make sure it's exactly this
});


export const getTasks = async (): Promise<Task[]> => {
  const res = await api.get("/tasks");
  return res.data;
};

export const createTask = async (task: TaskInput): Promise<Task> => {
  const res = await api.post("/tasks", task);
  return res.data;
};

export const updateTask = async (id: number, task: TaskInput): Promise<Task> => {
  const res = await api.put(`/tasks/${id}`, task);
  return res.data;
};

export const deleteTask = async (id: number) => {
  return api.delete(`/tasks/${id}`);
};

export const searchTasks = async (params: Record<string, string>): Promise<Task[]> => {
  const res = await api.get("/search", { params });
  return res.data;
};
