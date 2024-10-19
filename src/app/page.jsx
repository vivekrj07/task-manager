import SearchBar from "../Components/SearchBar";
import TaskForm from "../Components/TaskForm";
import TaskList from "../Components/TaskList";
import { fetchTasks } from "./actions";

export default async function Home({ searchParams }) {
  const tasks = await fetchTasks(searchParams["query"]);

  return (
    <>
      <SearchBar />
      <TaskForm />
      {tasks.length > 0 ? (
        <TaskList tasks={tasks} />
      ) : (
        <p className="mt-10 text-lg">No tasks found!</p>
      )}
    </>
  );
}
