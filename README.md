# Task Management App

This is a simple **Task Management** web application built using **Next.js** with **React** and **Tailwind CSS**. It allows users to add, delete, edit, and search for tasks, as well as toggle task completion. The application also utilizes server-side actions to store task data in a JSON file.

## Features

- Add new tasks with a title, description, and priority level (Low, Medium, High).
- Edit existing tasks, including updating the task's details and priority.
- Delete tasks from the task list.
- Toggle task completion status (Mark tasks as completed or pending).
- Search tasks by title or description.
- Responsive layout with Tailwind CSS.
- Task data persistence using file-based storage.

## Tech Stack

- **Next.js**: Server-side rendering and static site generation.
- **React**: Frontend UI components.
- **Tailwind CSS**: Styling and layout management.
- **Node.js**: Server-side file system interaction.
- **File-based storage**: Task data is stored in a `tasks.json` file.

## Setup Instructions

### Prerequisites
- Node.js (v18 or later)
- npm or yarn (for installing dependencies)

### Steps
1. Clone the Repository:

```bash
git clone https://github.com/vivekrj07/task-manager.git
```

2. Navigate to the Project Directory:

```bash
cd task-manager
```

3. Install Dependencies:

```bash
yarn install
```
4. Run the Development Server:

```bash
yarn dev
```

The app will be available at `http://localhost:3000`.

## Sorting Tasks by Priority

### Approach
The app supports sorting tasks by their priority level, with priorities categorized as **High, Medium, and Low**. Tasks are sorted from highest priority to lowest.

### Steps for Sorting:
- **Client Request:** When the user interacts with dropdown, we sort the tasks array on client side.

- **Render Sorted List:** The sorted tasks are rendered in the TaskList component, allowing users to see their tasks ordered by priority.
