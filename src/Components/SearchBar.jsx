"use client";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

export default function SearchBar() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleSearch = useCallback(() => {
    if (!query) {
      router.replace("/");
    } else {
      router.replace(`/?query=${query}`);
    }
  }, [router, query]);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center justify-center my-5"
    >
      <input
        className="border-2 border-blue-500 rounded-md p-2 w-full max-w-md mx-2"
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search tasks..."
      />
      <button
        type="submit"
        className="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600"
      >
        Search
      </button>
    </form>
  );
}
