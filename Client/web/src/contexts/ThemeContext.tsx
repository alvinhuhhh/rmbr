import React from "react";
import { ThemeProvider, createTheme } from "@mui/material";

export const ThemeContext = React.createContext({ mode: "light", toggleDarkMode: () => {} });

export function ThemeContextProvider({ children, ...props }: IThemeContextProviderProps) {
  const [mode, setMode] = React.useState<"light" | "dark">("light");
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: mode,
        },
      }),
    [mode]
  );

  const toggleDarkMode = () => {
    setMode((prevState) => (prevState === "light" ? "dark" : "light"));
    return;
  };

  return (
    <ThemeContext.Provider value={{ mode, toggleDarkMode }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
}

interface IThemeContextProviderProps {
  children: JSX.Element[];
}
