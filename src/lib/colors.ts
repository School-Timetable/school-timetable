import type { ThemeType } from "./stores/global_store";


export const lightThemeColors: readonly string[] = [
    "#fa968e",  // red
    "#79c9f7",  // blue
    "#88f28d",  // green
    "#f0ce78",  // yellow
    "#f2a477",  // orange
    "#c57ff0",  // purple
]

// aggiunto
export const darkThemeColors: readonly string[] = [
    "#540d10",  // red
    "#2a6587",  // blue
    "#2e6e31",  // green
    "#a17b1d",  // yellow
    "#8f461d",  // orange
    "#451c5e",  // purple
]


export function getCurrentColorScheme(theme: ThemeType): readonly string[]
{
    if (theme == "light") {
        return lightThemeColors;
    } else if (theme == "dark") {
        return darkThemeColors;
    } else {
        const windowDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
        return windowDarkMode ? darkThemeColors : lightThemeColors; 
    }
}