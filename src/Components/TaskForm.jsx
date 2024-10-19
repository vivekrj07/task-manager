"use client";

import { useState, useTransition } from "react";
import { createTask } from "../app/actions";
import { useRouter } from "next/navigation";

export default function TaskForm() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("low");
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (e) => {
    e.preventDefault();

    startTransition(async () => {
      try {
        const newTask = {
          title,
          description,
          priority,
          completed: false,
        };

        const createdTask = await createTask(newTask);
        router.refresh();

        // clear input fields
        setTitle("");
        setDescription("");
        setPriority("low");
      } catch (error) {
        console.error("Failed to create task:", error);
      }
    });
  };

  return (
    <div className="task-form bg-white p-4 rounded-lg shadow-lg ">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          required
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task title"
          className="border rounded p-2 w-full mb-2"
          disabled={isPending}
        />
        <textarea
          value={description}
          required
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Task description"
          className="border rounded p-2 w-full mb-2"
          disabled={isPending}
        />
        <select
          value={priority}
          required
          onChange={(e) => setPriority(e.target.value)}
          className="border rounded p-2 w-full mb-2"
          disabled={isPending}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <button
          type="submit"
          className="bg-blue-500 text-white rounded p-2 w-full"
          disabled={isPending}
        >
          {isPending ? "Adding..." : "Add Task"}
        </button>
      </form>
    </div>
  );
}
