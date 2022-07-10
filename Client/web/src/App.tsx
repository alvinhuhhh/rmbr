import React from "react";
import { Routes, Route } from "react-router-dom";

// pages
import Todo from "./pages/Todo";

export default function App() {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<Todo />} />
      </Route>
    </Routes>
  );
}
