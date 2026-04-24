export const setTheme = (mode) => {
  const root = document.documentElement;

  if (mode === "dark") {
    root.classList.add("dark");
    localStorage.setItem("theme", "dark");
  } else {
    root.classList.remove("dark");
    localStorage.setItem("theme", "light");
  }
};

export const getTheme = () => {
  return localStorage.getItem("theme") || "light";
};