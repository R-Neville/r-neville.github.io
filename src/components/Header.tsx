import { MouseEvent } from "react";
import { LinkItem } from "../App";
import { dispatch } from "../events";
import NavLink from "./NavLink";
import themes from "../themes";
import Hamburger from "./Hamburger";
import Menu from "./Menu";

function Header(props: { title: string; linkItems: LinkItem[]; currentLink: string }) {
  const theme = themes.dark;

  function onLinkElClick(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    const navLink = event.target as HTMLAnchorElement;
    dispatch("nav-link:click", navLink, {});
  }

  const linkEls = props.linkItems.map((li, index) => {
    const active = li.url === props.currentLink;
    return (
      <NavLink
        key={index}
        href={li.url}
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
        position: "sticky",
        top: 0,
        padding: "1em",
        backgroundColor: theme.bgAccent,
        userSelect: "none",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1 style={{ margin: 0, color: theme.fgPrimary }}>
          {props.title}
        </h1>
        <nav style={{ display: "none" }}>{linkEls}</nav>
        <Hamburger />
      </div>
      <Menu id={"menu"} linkItems={props.linkItems} currentLink={props.currentLink}/>
    </header>
  );
}

export default Header;
