import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

export const metadata = {
  title: "Task Manager | Vivek Kumar Singh",
  description: "Task manager created by Vivek Kumar Singh",
};

// layout.js
export default function Layout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Task Management App</title>
      </head>
      <body className={`${poppins.className} bg-gray-100`}>
        <div className="container mx-auto px-4 py-6">
          <header>
            <h1 className="text-4xl font-bold text-center text-blue-600 py-5">
              Task Management App
            </h1>
          </header>
          {children}
        </div>
      </body>
    </html>
  );
}
