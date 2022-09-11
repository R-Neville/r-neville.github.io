import { MouseEvent } from "react";
import { LinkItem } from "../App";
import { dispatch } from "../events";
import Theme from "../Theme";
import NavLink from "./NavLink";
import Hamburger from "./Hamburger";
import Menu from "./Menu";
import PaletteIcon from "./PaletteIcon";

function Header(props: {
  theme: Theme;
  title: string;
  linkItems: LinkItem[];
  currentLink: string;
}) {
  const theme = props.theme;

  function onLinkElClick(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    const navLink = event.target as HTMLAnchorElement;
    dispatch("nav-link:click", navLink, {});
  }

  function onChangeThemeButtonClick(event: MouseEvent<HTMLButtonElement>) {
    const button = event.target as HTMLElement;
    dispatch("change-theme-button:click", button, {});
  }

  const linkEls = props.linkItems.map((li, index) => {
    const active = li.selector === props.currentLink;
    return (
      <NavLink
        key={index}
        href={li.selector}
        text={li.text}
        color={theme.fgPrimary}
        active={active}
        activeBg={theme.bgPrimary}
        onClick={onLinkElClick}
      />
    );
  });
  return (
    <header
      style={{
        display: "flex",
        flexDirection: "column",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        padding: "1em",
        backgroundColor: theme.bgAccent,
        userSelect: "none",
      }}
    >
      <div
        className="header"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1 style={{ margin: 0, color: theme.fgPrimary }}>{props.title}</h1>
        <nav style={{ display: "none" }}>
          {linkEls}{" "}
          <button
            className="change-theme"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "40px",
              height: "40px",
              border: "none",
              borderRadius: "50%",
              marginLeft: "1em",
              backgroundColor: theme.fgPrimary,
              cursor: "pointer",
            }}
            onClick={onChangeThemeButtonClick}
          >
            <PaletteIcon width={25} height={25} color={theme.bgAccent} />
          </button>
        </nav>

        <Hamburger lineColor={theme.fgPrimary} />
      </div>
      <Menu
        theme={theme}
        id={"menu"}
        linkItems={props.linkItems}
        currentLink={props.currentLink}
      />
    </header>
  );
}

export default Header;
