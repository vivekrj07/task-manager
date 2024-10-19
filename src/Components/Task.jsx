"use client";

import { useState, useTransition } from "react";
import {
  updateTask,
  deleteTask as deleteTaskAction,
  toggleTaskCompletion,
} from "../app/actions";
import { useRouter } from "next/navigation";

export default function Task({ task }) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({
    title: task.title,
    description: task.description,
    priority: task.priority,
  });
  const [isWaiting, startTransition] = useTransition();

  const handleEdit = async () => {
    startTransition(async () => {
      const updated = await updateTask(task.id, { ...task, ...editedTask });
      if (updated) {
        router.refresh();
        setIsEditing(false);
      }
    });
  };

  const handleDelete = async () => {
    startTransition(async () => {
      await deleteTaskAction(task.id);
      router.refresh();
    });
  };

  const handleToggleCompletion = async () => {
    startTransition(async () => {
      const updated = await toggleTaskCompletion(task.id);
      if (updated) {
        router.refresh();
      }
    });
  };

  return (
    <div className="task-item bg-white p-4 rounded-lg shadow-md">
      {isEditing ? (
        <>
          <div className="flex items-center  justify-between">
            <input
              type="text"
              className="border-2 border-blue-500 rounded-md p-2 mb-2"
              value={editedTask.title}
              onChange={(e) =>
                setEditedTask({ ...editedTask, title: e.target.value })
              }
            />
            <textarea
              className="border-2 border-blue-500 rounded-md p-2 mb-2"
              value={editedTask.description}
              onChange={(e) =>
                setEditedTask({ ...editedTask, description: e.target.value })
              }
            />
            <select
              className="border-2 border-blue-500 rounded-md p-2 mb-2"
              value={editedTask.priority}
              onChange={(e) =>
                setEditedTask({ ...editedTask, priority: e.target.value })
              }
            >
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
            <button
              onClick={handleEdit}
              className="bg-blue-500 text-white rounded-md p-2 disabled:opacity-50"
            >
              Save
            </button>
          </div>
        </>
      ) : (
        <>
          <h3 className="text-xl font-semibold">{task.title}</h3>
          <p className="text-gray-700">{task.description}</p>
          <p
            className={`text-${
              task.priority === "high"
                ? "red"
                : task.priority === "medium"
                ? "yellow"
                : "green"
            }-600`}
          >
            Priority: {task.priority}
          </p>
          <div className="flex space-x-2 mt-3">
            <button
              onClick={handleToggleCompletion}
              className="bg-green-500 text-white rounded-md px-4 py-2 disabled:opacity-50"
            >
              {task.completed ? "Mark as Pending" : "Mark as Completed"}
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white rounded-md px-4 py-2 disabled:opacity-50"
            >
              Delete
            </button>
            <button
              onClick={() => setIsEditing(true)}
              className="bg-yellow-500 text-white rounded-md px-4 py-2 disabled:opacity-50"
            >
              Edit
            </button>
          </div>
        </>
      )}
    </div>
  );
}
