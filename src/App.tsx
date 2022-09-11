import { useEffect, useState, useCallback, MouseEvent } from "react";
import themes from "./themes";
import { slideDown, slideUp } from "./helpers";
import { addEvent, removeEvent } from "./events";
import Header from "./components/Header";
import Section from "./components/Section";
import Footer from "./components/Footer";
import Expander from "./components/Expander";
import CompetencyGraph, { SkillInfo } from "./components/CompetencyGraph";

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
const HEADER_HEIGHT = 75;
const MY_LINKEDIN = "https://linkedin.com/in/r-neville";

const skills = [
  {
    name: "CSS",
    competency: 10,
  },
  {
    name: "JavaScript",
    competency: 9,
  },
  {
    name: "TypeScript",
    competency: 7,
  },
  {
    name: "React.js",
    competency: 7,
  },
  {
    name: "Ruby",
    competency: 7,
  },
  {
    name: "Node.js",
    competency: 6,
  },
  {
    name: "Electron.js",
    competency: 6,
  },
  {
    name: "Ruby on Rails",
    competency: 6,
  },
  {
    name: "Express.js",
    competency: 5,
  },
  {
    name: "python",
    competency: 4,
  },
  {
    name: "C++",
    competency: 4,
  },
  {
    name: "Qt5",
    competency: 4,
  },
] as SkillInfo[];

const appLinks = [
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
] as LinkItem[];

function App() {
  let theme = themes.dark;

  const initialSkill = {} as SkillInfo;

  const [currentSection, setCurrentSection] = useState(appLinks[0].selector);
  const [menuVisible, setMenuVisible] = useState(false);
  const [currentSkill, setCurrentSkill] = useState(initialSkill);

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

  const onWindowScroll = useCallback(() => {
    if (menuVisible) {
      const menu = document.getElementById(MENU_ID);
      const hamburger = document.querySelector(
        "header .hamburger"
      ) as HTMLElement;
      if (menu) {
        menu.style.display = "none";
        setMenuVisible(false);
        hamburger.style.backgroundColor = "inherit";
      }
    }
  }, [menuVisible]);

  const observerCallback = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      for (let entry of entries) {
        const section = entry.target;
        const selector = `#${section.id}`;
        if (entry.isIntersecting && selector !== currentSection) {
          setCurrentSection(selector);
          break;
        }
      }
    },
    [currentSection]
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
            (section.previousElementSibling as HTMLElement).scrollIntoView({
              behavior: "smooth",
            });
          }
        });
        setMenuVisible(false);
        hamburger.style.backgroundColor = "inherit";
      } else {
        const section = document.querySelector(sectionId);
        if (section) {
          (section.previousElementSibling as HTMLElement).scrollIntoView({
            behavior: "smooth",
          });
        }
      }
    },
    [menuVisible]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.5,
    });
    const sections = document.querySelectorAll("section");
    sections.forEach((section) => {
      observer.observe(section);
    });
    addEvent(window, "resize", onWindowResize);
    addEvent(window, "scroll", onWindowScroll);
    addEvent(document, "hamburger:click", onHamburgerClick);
    addEvent(document, "nav-link:click", onNavLinkClick);
    return () => {
      sections.forEach((section) => {
        observer.unobserve(section);
      });
      removeEvent(window, "resize", onWindowResize);
      removeEvent(window, "scroll", onWindowScroll);
      removeEvent(document, "hamburger:click", onHamburgerClick);
      removeEvent(document, "nav-link:click", onNavLinkClick);
    };
  }, [
    menuVisible,
    theme,
    observerCallback,
    onWindowResize,
    onWindowScroll,
    onHamburgerClick,
    onNavLinkClick,
  ]);

  function spacerDiv() {
    return <div style={{ width: "100%", height: HEADER_HEIGHT + "px" }}></div>;
  }

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
            showText={"Show More"}
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
            I was born and raised in Queensland, Australia. I discovered
            programming after finishing highschool and I'm due to finish a Web
            dev bootcamp through Coder Academy in November, 2022.
          </p>,
          <Expander
            key={2}
            showText={"Show More"}
            children={[
              <p key={1} style={{ display: "none", ...pStyles }}>
                I'm a quick learner and transitioning to new languages or
                frameworks isn't a worry for me.
              </p>,
              <p key={2} style={{ display: "none", ...pStyles }}>
                I like to style all my projects with custom CSS/Sass!
              </p>,
            ]}
          />,
        ]}
      />
    );
  };

  const buildSkillsSection = () => {
    const skillDivs = skills.map((skill, index) => {
      function onMouseEnter(event: MouseEvent<HTMLDivElement>) {
        const skillDiv = event.target as HTMLElement;
        skillDiv.style.backgroundColor = theme.bgAccent;
        setCurrentSkill(skill);
      }

      function onMouseLeave(event: MouseEvent<HTMLDivElement>) {
        const skillDiv = event.target as HTMLElement;
        const bars = document.querySelectorAll(".comp-graph .bar");
        skillDiv.style.backgroundColor = theme.bgPrimary;
        bars.forEach((bar) => {
          (bar as HTMLElement).style.backgroundColor = "inherit";
        });
        setCurrentSkill(initialSkill);
      }

      return (
        <div
          key={index}
          className="skill"
          style={{
            padding: "0.5em 1em",
            margin: "0.5em",
            backgroundColor: theme.bgPrimary,
            color: theme.fgPrimary,
            cursor: "pointer",
          }}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          {skill.name}
        </div>
      );
    });

    return (
      <Section
        id={SKILLS_SECTION_ID}
        heading={"🧰 My Skills"}
        children={[
          <p key={1} style={pStyles}>
            These are some of the languages and frameworks that I have
            experience with. Hover over or click one to see how I rate* myself!
          </p>,
          <div
            key={2}
            className={"skills"}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            {skillDivs}
          </div>,
          <CompetencyGraph key={3} skill={currentSkill} />,
          <p
            key={4}
            style={{
              fontSize: "0.7em",
              color: theme.bgPrimary,
              textAlign: "center",
            }}
          >
            * Ratings are out of 15, with the following competency ranges:
            Beginner (1-3), Familiar (4-6), Proficient (7-9), Advanced (10-12),
            and Expert (13-15). I have been at least highly familiar with all of
            these technologies at some point - the ratings reflect my current
            working knowledge.
          </p>,
        ]}
      />
    );
  };

  const buildProjectsSection = () => {
    return <Section id={PROJECTS_SECTION_ID} heading={"🛠️ Projects"} />;
  };

  const buildContactSection = () => {
    const anchorStyles = {
      padding: "0.5em 1em",
      border: `1px solid ${theme.bgAccent}`,
      margin: "0.5em",
      fontSize: "1em",
      color: theme.bgAccent,
      textDecoration: "none",
    };

    function onAnchorMouseEnter(event: MouseEvent<HTMLAnchorElement>) {
      const anchor = event.target as HTMLElement;
      anchor.style.backgroundColor = theme.bgAccent;
      anchor.style.color = theme.fgPrimary;
    }

    function onAnchorMouseLeave(event: MouseEvent<HTMLAnchorElement>) {
      const anchor = event.target as HTMLElement;
      anchor.style.backgroundColor = "inherit";
      anchor.style.color = theme.bgAccent;
    }

    return (
      <Section
        id={CONTACT_SECTION_ID}
        heading={"📥 Contact"}
        children={[
          <p key={1} style={pStyles}>
            If you would like to contact me about work or collaboration, please
            don't hesitate to connect with me on LinkedIn!
          </p>,
          <a
            key={2}
            href={MY_LINKEDIN}
            style={anchorStyles}
            onMouseEnter={onAnchorMouseEnter}
            onMouseLeave={onAnchorMouseLeave}
          >
            LinkedIn
          </a>,
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
        {spacerDiv()}
        {buildTopSection()}
        {spacerDiv()}
        {buildAboutSection()}
        {spacerDiv()}
        {buildSkillsSection()}
        {spacerDiv()}
        {buildProjectsSection()}
        {spacerDiv()}
        {buildContactSection()}
      </main>
      <Footer linkItems={appLinks} />
    </div>
  );
}

export default App;
