"use client";

import { useState } from "react";
import Task from "./Task";

export default function TaskList({ tasks }) {
  const [sortOrder, setSortOrder] = useState("highToLow");

  const sortedTasks = [...tasks].sort((a, b) => {
    const priorityOrder = { high: 1, medium: 2, low: 3 };
    if (sortOrder === "highToLow") {
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    } else {
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    }
  });

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };

  return (
    <div className="task-list">
      <div className="flex my-4 items-center">
        <label className="mr-2">Sort by Priority:</label>
        <select
          value={sortOrder}
          onChange={handleSortChange}
          className="border-2 border-blue-500 rounded-md p-2"
        >
          <option value="highToLow">High to Low</option>
          <option value="lowToHigh">Low to High</option>
        </select>
      </div>
      {sortedTasks.map((task) => (
        <Task key={task.id} task={task} />
      ))}
    </div>
  );
}
