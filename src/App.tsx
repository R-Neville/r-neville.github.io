import { useEffect, useState, useCallback, useMemo } from "react";
import themes from "./themes";
import { slideDown, slideUp } from "./helpers";
import { addEvent, removeEvent } from "./events";
import Header from "./components/Header";
import Section from "./components/Section";
import Footer from "./components/Footer";
import GitSrc from "./assets/images/github-8-64.png";
import LinkedInSrc from "./assets/images/linkedin-3-64.png";
import Expander from "./components/Expander";

export interface LinkItem {
  text: string;
  selector: string;
}

const MENU_ID = "menu";
const TOP_SECTION_ID = "welcome";
const ABOUT_SECTION_ID = "about";
const SKILLS_SECTION_ID = "skills";
const PROJECTS_SECTION_ID = "projects";
const CONTACT_SECTION_ID = "contact";
const MAX_MENU_WIDTH = 920;
const MY_GITHUB = "https://github.com/R-Neville";
const MY_LINKEDIN = "www.linkedin.com/in/r-neville";

function App() {
  let theme = themes.dark;

  const appLinks = useMemo(() => {
    return [
      {
        text: "Welcome",
        selector: `#${TOP_SECTION_ID}`,
      },
      {
        text: "About",
        selector: `#${ABOUT_SECTION_ID}`,
      },
      {
        text: "Skills",
        selector: `#${SKILLS_SECTION_ID}`,
      },
      {
        text: "Projects",
        selector: `#${PROJECTS_SECTION_ID}`,
      },
      {
        text: "Contact",
        selector: `#${CONTACT_SECTION_ID}`,
      },
    ];
  }, []);

  const [currentSection, setCurrentSection] = useState(appLinks[0].selector);
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

  const observerCallback = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        const section = entry.target;
        if (entry.isIntersecting) {
          setCurrentSection(`#${section.id}`);
        }
      });
    },
    []
  );

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
            setCurrentSection(sectionId);
            section.scrollIntoView({ behavior: "smooth" });
          }
        });
        setMenuVisible(false);
        hamburger.style.backgroundColor = "inherit";
      } else {
        const section = document.querySelector(sectionId);
        if (section) {
          setCurrentSection(sectionId);
          section.scrollIntoView({ behavior: "smooth" });
        }
      }
    },
    [menuVisible]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(observerCallback);
    const sections = document.querySelectorAll("section");
    sections.forEach((section) => {
      observer.observe(section);
    });
    addEvent(window, "resize", onWindowResize);
    addEvent(document, "hamburger:click", onHamburgerClick);
    addEvent(document, "nav-link:click", onNavLinkClick);
    return () => {
      sections.forEach((section) => {
        observer.unobserve(section);
      });
      removeEvent(window, "resize", onWindowResize);
      removeEvent(document, "hamburger:click", onHamburgerClick);
      removeEvent(document, "nav-link:click", onNavLinkClick);
    };
  }, [
    menuVisible,
    theme,
    observerCallback,
    onWindowResize,
    onHamburgerClick,
    onNavLinkClick,
  ]);

  const pStyles = {
    color: theme.bgAccent,
    fontSize: "1em",
  };

  const buildTopSection = () => {
    return (
      <Section
        id={TOP_SECTION_ID}
        heading={"👋 Hi!"}
        children={[
          <p key={1} style={pStyles}>
            My name is Robbie. I'm a junior JavaScript and TypeScript developer,
            and this is my portfolio site!
          </p>,
          <Expander
            key={2}
            children={[
              <p key={1} style={{ display: "none", ...pStyles }}>
                I'm a passionate programmer and I've use numerous languages in
                the past, including C, C++, and Python, but I am particularly
                drawn to Web development.
              </p>,
              <p key={2} style={{ display: "none", ...pStyles }}>
                I'm familiar with Node.js - I've worked on a handful of personal
                Express.js websites - and I'm currently learning Ruby on Rails.
              </p>,
              <p key={3} style={{ display: "none", ...pStyles }}>
                I'm also into Electron.js and I'm building my own IDE!
              </p>,
            ]}
          />,
        ]}
      />
    );
  };

  const buildAboutSection = () => {
    return (
      <Section
        id={ABOUT_SECTION_ID}
        heading={"📖 About Me"}
        children={[
          <p key={1} style={pStyles}>
            I was born in Australia, and grew up in rural Queensland. I
            discovered programming after I finished highschool, and studied
            IT at the University of Southern Queensland for two years
            before enrolling in a Web development bootcamp at Coder Academy. I'm
            due to finish in November, 2022, and can't wait to kickstart my
            career in the industry!
          </p>,
          <img
            key={2}
            src={"/images/country-road.jpg"}
            alt=""
            style={{ width: "100%", maxWidth: "250px" }}
          ></img>,
        ]}
      />
    );
  };

  const buildSkillsSection = () => {
    return (
      <Section
        id={SKILLS_SECTION_ID}
        heading={"🧰 My Skills"}
        children={[<p key={1} style={pStyles}></p>]}
      />
    );
  };

  const buildProjectsSection = () => {
    return <Section id={PROJECTS_SECTION_ID} heading={"🛠️ Projects"} />;
  };

  const buildContactSection = () => {
    return (
      <Section
        id={CONTACT_SECTION_ID}
        heading={"📥 Contact"}
        children={[
          <p key={1} style={pStyles}>
            If you would like to contact me about work or collaboration, please
            don't hesitate to connect with me on LinkedIn!
          </p>,
          <div key={2}>
            <a href={MY_LINKEDIN} style={{ margin: "0.5em" }}>
              <img src={LinkedInSrc} alt="LinkedIn"></img>
            </a>
            <a href={MY_GITHUB} style={{ margin: "0.5em" }}>
              <img src={GitSrc} alt="GitHub"></img>
            </a>
          </div>,
        ]}
      />
    );
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
        key={currentSection}
        title={"R-Neville"}
        linkItems={appLinks}
        currentLink={currentSection}
      />
      <main
        style={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
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
