import { MouseEvent } from "react";
import themes from "../themes";
import { LinkItem } from "../App";
import { dispatch } from "../events";
import NavLink from "./NavLink";

function Menu(props: { id: string; linkItems: LinkItem[], currentLink: string }) {
  const theme = themes.dark;

  function onLinkElClick(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    const navLink = event.target as HTMLAnchorElement;
    dispatch("nav-link:click", navLink, {});
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
        customStyles={{ textAlign: "right" }}
      />
    );
  });

  return (
    <div
      id={props.id}
      style={{
        display: "none",
        flexDirection: "column",
        padding: "1em 0",
        backgroundColor: "inherit",
      }}
    >
      <nav style={{ display: "flex", flexDirection: "column" }}>{linkEls}</nav>
    </div>
  );
}

export default Menu;
