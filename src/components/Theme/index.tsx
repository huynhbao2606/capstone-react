import { useEffect, useState } from "react";
type Mode = "light" | "dark" | "system";

function applyTheme(mode: Mode) {
    const root = document.documentElement;
    if (mode === "dark") root.classList.add("dark");
    else if (mode === "light") root.classList.remove("dark");
    else {
        if (window.matchMedia("(prefers-color-scheme: dark)").matches)
            root.classList.add("dark");
        else root.classList.remove("dark");
    }
}

export default function ThemeToggle() {
    const [mode, setMode] = useState<Mode>(() => {
        const stored = localStorage.getItem("theme");
        return stored === "light" || stored === "dark" ? (stored as Mode) : "system";
    });

    useEffect(() => {
        if (mode === "system") localStorage.removeItem("theme");
        else localStorage.setItem("theme", mode);
        applyTheme(mode);
    }, [mode]);

    const systemDark =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches;

    return (
        <div className="flex items-center gap-2">
            <label className="text-sm text-gray-700 dark:text-gray-200">Theme:</label>
            <select
                value={mode}
                onChange={(e) => setMode(e.target.value as Mode)}
                className="rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 px-2 py-1"
            >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="system">System {systemDark ? "(Dark)" : "(Light)"}</option>
            </select>
        </div>
    );
}
