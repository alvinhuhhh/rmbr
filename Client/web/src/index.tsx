import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "./styles/theme";
import App from "./pages/App";
import Public from "./pages/Public";
import NotFound from "./pages/NotFound";
import TodoLists from "./pages/TodoLists";
import TodoList from "./pages/TodoList";

const root = createRoot(document.getElementById("root") as HTMLElement);

function PublicRoute({ children }: { children: JSX.Element }) {
  let location = useLocation();

  if (sessionStorage.getItem("jwt")) {
    return <Navigate to="/app/lists" state={{ from: location }} replace />;
  }

  return children;
}

function PrivateRoute({ children }: { children: JSX.Element }) {
  let location = useLocation();

  if (!sessionStorage.getItem("jwt")) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
}

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route
            path="/"
            element={
              <PublicRoute>
                <Public />
              </PublicRoute>
            }
          />
          <Route
            path="/app"
            element={
              <PrivateRoute>
                <App />
              </PrivateRoute>
            }
          >
            <Route path="lists" element={<TodoLists />} />
            <Route path="lists/:listId" element={<TodoList />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
