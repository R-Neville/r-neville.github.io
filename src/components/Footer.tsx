import { MouseEvent } from "react";
import { LinkItem } from "../App";
import { dispatch } from "../events";
import themes from "../themes";
import NavLink from "./NavLink";

function Footer(props: { linkItems: LinkItem[] }) {
  const theme = themes.dark;

  function onLinkElClick(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    const navLink = event.target as HTMLAnchorElement;
    dispatch("nav-link:click", navLink, {});
  }

  const linkEls = props.linkItems.map((li, index) => {
    return (
      <NavLink
        key={index}
        href={li.url}
        text={li.text}
        color={theme.fgSecondary}
        active={false}
        activeBg={theme.bgPrimary}
        onClick={onLinkElClick}
        customStyles={{ textAlign: "center" }}
      />
    );
  });

  return (
    <footer
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "1em",
        color: theme.fgSecondary,
      }}
    >
      <nav style={{display: "flex", flexDirection: "column"}}>{linkEls}</nav>
      <p>&copy; Robbie Neville 2022</p>
    </footer>
  );
}

export default Footer;
