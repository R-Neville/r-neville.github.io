import { MouseEvent } from "react";
import themes from "../themes";

function NavLink(props: {
  href: string;
  text: string;
  active: boolean;
  customStyles?: { [prop: string]: string };
}) {
  let backgroundColor = "inherit";
  if (props.active) {
    backgroundColor = themes.dark.bgAccent;
  }

  function onMouseEnter(event: MouseEvent<HTMLAnchorElement>) {
    const navLink = event.target as HTMLElement;
    if (!props.active) {
      navLink.style.backgroundColor = themes.dark.bgAccent;
    }
  }

  function onMouseLeave(event: MouseEvent<HTMLAnchorElement>) {
    const navLink = event.target as HTMLElement;
    if (!props.active) {
      navLink.style.backgroundColor = "inherit";
    }
  }

  return (
    <a
      style={{
        padding: "0.5em 1em",
        textDecoration: "none",
        backgroundColor,
        color: themes.dark.fgPrimary,
        ...(props.customStyles && props.customStyles)
      }}
      href={props.href}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {props.text}
    </a>
  );
}

export default NavLink;
