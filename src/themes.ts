import Theme from "./Theme";

const light = {
  name: "light",
  bgPrimary: "#5D6D7E",
  bgSecondary: "#85929E",
  bgHighlight: "#AEB6BF",
  bgAccent: "#34495E",
  fgPrimary: "#D6DBDF",
  fgSecondary: "#EBEDEF",
} as Theme;

const dark = {
  name: "dark",
  bgPrimary: "#D6DBDF",
  bgSecondary: "#AEB6BF",
  bgHighlight: "#85929E",
  bgAccent: "#EBEDEF",
  fgPrimary: "#2E4053",
  fgSecondary: "#283747",
} as Theme;

const themes = [light, dark];

export default themes;
