import { MouseEvent } from "react";
import Theme from "../Theme";
import { LinkItem } from "../App";
import { dispatch } from "../events";
import NavLink from "./NavLink";
import PaletteIcon from "./PaletteIcon";

function Menu(props: { theme: Theme, id: string; linkItems: LinkItem[], currentLink: string }) {
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
        customStyles={{ textAlign: "center" }}
      />
    );
  });

  return (
    <div
      id={props.id}
      style={{
        display: "none",
        flexDirection: "column",
        alignItems: "center",
        padding: "1em 0",
        backgroundColor: "inherit",
      }}
    >
      <nav style={{ display: "flex", flexDirection: "column" }}>{linkEls}</nav>
      <button
          className="change-theme"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "50px",
            height: "50px",
            border: "none",
            borderRadius: "50%",
            margin: "1em",
            backgroundColor: theme.fgPrimary,
            cursor: "pointer",
          }}
          onClick={onChangeThemeButtonClick}
        >
          <PaletteIcon width={30} height={30}color={theme.bgAccent}/>
        </button>
    </div>
  );
}

export default Menu;
