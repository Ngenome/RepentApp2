const tintColorLight = "#2f95dc";
const tintColorDark = "#12ccff";

export default {
  common: {
    translucentBackground: "rgba(0, 18, 41, 0.55)",
    tint: "#5e02f2",
    text: {
      foreground: "#ffffff",
    },
  },
  light: {
    text: "#000",
    swash: "rgba(66, 135, 245, 0.99)",
    translucentBackground: "rgba(200, 218, 241, 0.95)",
    absoluteBackground: "#fff",
    light: "#c7c7c7",
    viewBackground: "#fff",
    mediumDark: "#7d7d7d",
    background: "#f0f0f0",
    tint: tintColorLight,
    tabIconDefault: "#ccc",
    tabIconSelected: tintColorLight,
    danger: "red",
    success: "#08d134",
  },
  dark: {
    text: "#fff",
    swash: "rgba(66, 135, 245, 0.1)",
    translucentBackground: "rgba(0, 18, 41, 0.55)",
    absoluteBackground: "#000",
    light: "#6e6e6e",
    mediumDark: "#7d7d7d",
    viewBackground: "#262626",
    background: "#000",
    tint: tintColorDark,
    tabIconDefault: "#ccc",
    tabIconSelected: tintColorDark,
    danger: "red",
    success: "#08d134",
  },
};
