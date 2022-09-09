import { useEffect, useState } from "react";
import themes from "./themes";
import Header from "./components/Header";
import { slideDown, slideUp } from "./helpers";

export interface LinkItem {
  text: string;
  url: string;
  active: boolean;
}

const MENU_ID = "menu";
const TOP_SECTION_ID = "welcome";
const ABOUT_SECTION_ID = "about";
const SKILLS_SECTION_ID = "skills";
const PROJECTS_SECTION_ID = "projects";
const CONTACT_SECTION_ID = "contact";
const MAX_MENU_WIDTH = 920;

function App() {
  const appLinks = [
    {
      text: "Welcome",
      url: `#${TOP_SECTION_ID}`,
      active: true,
    },
    {
      text: "About",
      url: `#${ABOUT_SECTION_ID}`,
      active: false,
    },
    {
      text: "Skills",
      url: `#${SKILLS_SECTION_ID}`,
      active: false,
    },
    {
      text: "Projects",
      url: `#${PROJECTS_SECTION_ID}`,
      active: false,
    },
    {
      text: "Contact",
      url: `#${CONTACT_SECTION_ID}`,
      active: false,
    },
  ];

  const [menuVisible, setMenuVisible] = useState(false);

  useEffect(() => {
    const onWindowResize = () => {
      const hamburger = document.querySelector(
        "header .hamburger"
      ) as HTMLElement;
      const menu = document.getElementById(MENU_ID);
      if (!menu) return;
      if (window.innerWidth >= MAX_MENU_WIDTH) {
        slideUp(menu, 5);
        setMenuVisible(false);
        hamburger.style.backgroundColor = "inherit";
      }
    };
    const onHamburgerClick = () => {
      const hamburger = document.querySelector(
        "header .hamburger"
      ) as HTMLElement;
      const menu = document.getElementById(MENU_ID);
      if (!menu) return;
      if (menuVisible) {
        slideUp(menu, 5);
        setMenuVisible(false);
        hamburger.style.backgroundColor = "inherit";
      } else {
        slideDown(menu, "flex", 5);
        setMenuVisible(true);
        hamburger.style.backgroundColor = themes.dark.bgAccent;
      }
    };
    
    
    window.addEventListener("resize", onWindowResize);
    document.addEventListener("hamburger:click", onHamburgerClick);
    return () => {
      window.removeEventListener("resize", onWindowResize);
      document.removeEventListener("hamburger:click", onHamburgerClick);
    };
  }, [menuVisible]);

  return (
    <div
      id="app"
      style={{
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        width: "100%",
        backgroundColor: themes.dark.bgHighlight,
      }}
    >
      <Header title={"R-Neville"} linkItems={appLinks} />
      <main style={{ flexGrow: 1, display: "flex" }}></main>
    </div>
  );
}

export default App;
