"use server";

import fs from "fs/promises";
import path from "path";

const dataFilePath = path.join(process.cwd(), "data", "tasks.json");

async function getTasks() {
  try {
    const data = await fs.readFile(dataFilePath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

async function saveTasks(tasks) {
  await fs.writeFile(dataFilePath, JSON.stringify(tasks, null, 2));
}

export async function fetchTasks(query) {
  const tasks = await getTasks();
  if (query) {
    query = query.toLowerCase();
    return tasks.filter((t) =>
      `${t.title} ${t.description}`.toLowerCase().includes(query)
    );
  }
  return tasks;
}

export async function createTask(task) {
  const tasks = await getTasks();
  const newTask = { ...task, id: Date.now() };
  tasks.push(newTask);
  await saveTasks(tasks);
  return newTask;
}

export async function updateTask(id, updatedTask) {
  const tasks = await getTasks();
  const index = tasks.findIndex((task) => task.id === id);
  if (index !== -1) {
    tasks[index] = { ...tasks[index], ...updatedTask };
    await saveTasks(tasks);
    return tasks[index];
  }
  return null;
}

export async function deleteTask(id) {
  const tasks = await getTasks();
  const filteredTasks = tasks.filter((task) => task.id !== id);
  await saveTasks(filteredTasks);
  return true;
}

export async function toggleTaskCompletion(id) {
  const tasks = await getTasks();
  const index = tasks.findIndex((task) => task.id === id);
  if (index !== -1) {
    tasks[index].completed = !tasks[index].completed;
    await saveTasks(tasks);
    return tasks[index];
  }
  return null;
}

export async function updateAllTasks(tasks) {
  await saveTasks(tasks);
  return tasks;
}
