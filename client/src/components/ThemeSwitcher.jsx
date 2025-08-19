// src/components/ThemeSwitcher.jsx
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../redux/theme/themeSlice";

export default function ThemeSwitcher({ className = "" }) {
  const theme = useSelector((state) => state.theme.mode);
  const dispatch = useDispatch();

  return (
    <button
      onClick={() => dispatch(toggleTheme())}
      className={`p-2 rounded transition-colors ${className}`}
      aria-label="Toggle Theme"
    >
      {theme === "dark" ? "🌙" : "🌞"}
    </button>
  );
}
