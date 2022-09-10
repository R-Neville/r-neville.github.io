import { useEffect, useState, useCallback } from "react";
import themes from "./themes";
import { slideDown, slideUp } from "./helpers";
import { addEvent, removeEvent } from "./events";
import Header from "./components/Header";
import Section from "./components/Section";
import Footer from "./components/Footer";

export interface LinkItem {
  text: string;
  url: string;
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
    },
    {
      text: "About",
      url: `#${ABOUT_SECTION_ID}`,
    },
    {
      text: "Skills",
      url: `#${SKILLS_SECTION_ID}`,
    },
    {
      text: "Projects",
      url: `#${PROJECTS_SECTION_ID}`,
    },
    {
      text: "Contact",
      url: `#${CONTACT_SECTION_ID}`,
    },
  ];

  let theme = themes.dark;

  const [currentLink, setCurrentLink] = useState(appLinks[0].url);
  const [menuVisible, setMenuVisible] = useState(false);

  const onWindowResize = useCallback(() => {
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
  }, []);

  const onHamburgerClick = useCallback(
    (event: CustomEvent) => {
      const hamburger = event.target as HTMLElement;
      const menu = document.getElementById(MENU_ID);
      if (!menu) return;
      if (menuVisible) {
        slideUp(menu, 5);
        setMenuVisible(false);
        hamburger.style.backgroundColor = "inherit";
      } else {
        slideDown(menu, "flex", 5);
        setMenuVisible(true);
        hamburger.style.backgroundColor = theme.bgPrimary;
      }
    },
    [menuVisible, theme]
  );

  const onNavLinkClick = useCallback(
    (event: CustomEvent) => {
      const navLink = event.target as HTMLAnchorElement;
      const sectionId = navLink.href.split("/").reverse()[0];
      const menu = document.getElementById(MENU_ID);
      if (!menu) return;
      const hamburger = document.querySelector(
        "header .hamburger"
      ) as HTMLElement;
      if (menuVisible) {
        slideUp(menu, 5, () => {
          const section = document.querySelector(sectionId);
          if (section) {
            setCurrentLink(sectionId);
            section.scrollIntoView({ block: "start", behavior: "smooth" });
          }
        });
        setMenuVisible(false);
        hamburger.style.backgroundColor = "inherit";
      } else {
        const section = document.querySelector(sectionId);
        if (section) {
          setCurrentLink(sectionId);
          section.scrollIntoView({ block: "start", behavior: "smooth" });
        }
      }
    },
    [menuVisible]
  );

  useEffect(() => {
    addEvent(window, "resize", onWindowResize);
    addEvent(document, "hamburger:click", onHamburgerClick);
    addEvent(document, "nav-link:click", onNavLinkClick);
    return () => {
      removeEvent(window, "resize", onWindowResize);
      removeEvent(document, "hamburger:click", onHamburgerClick);
      removeEvent(document, "nav-link:click", onNavLinkClick);
    };
  }, [menuVisible, theme, onWindowResize, onHamburgerClick, onNavLinkClick]);

  const buildTopSection = () => {
    return <Section id={TOP_SECTION_ID} heading={"Welcome!"} />;
  };

  const buildAboutSection = () => {
    return <Section id={ABOUT_SECTION_ID} heading={"About Me"} />;
  };

  const buildSkillsSection = () => {
    return <Section id={SKILLS_SECTION_ID} heading={"My Skills"} />;
  };

  const buildProjectsSection = () => {
    return <Section id={PROJECTS_SECTION_ID} heading={"Current Projects"} />;
  };

  const buildContactSection = () => {
    return <Section id={CONTACT_SECTION_ID} heading={"Contact"} />;
  };

  return (
    <div
      id="app"
      style={{
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        width: "100%",
        backgroundColor: theme.bgSecondary,
      }}
    >
      <Header
        title={"R-Neville"}
        linkItems={appLinks}
        currentLink={currentLink}
      />
      <main
        style={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          padding: "1em",
        }}
      >
        {buildTopSection()}
        {buildAboutSection()}
        {buildSkillsSection()}
        {buildProjectsSection()}
        {buildContactSection()}
      </main>
      <Footer linkItems={appLinks} />
    </div>
  );
}

export default App;
