import { MouseEvent } from "react";

function NavLink(props: {
  href: string;
  text: string;
  color: string;
  active: boolean;
  activeBg: string,
  customStyles?: { [prop: string]: string };
  onClick: (event: MouseEvent<HTMLAnchorElement>) => void;
}) {
  let backgroundColor = "inherit";
  if (props.active) {
    backgroundColor = props.activeBg;
  }

  function onMouseEnter(event: MouseEvent<HTMLAnchorElement>) {
    const navLink = event.target as HTMLElement;
    if (!props.active) {
      navLink.style.backgroundColor = props.activeBg;
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
        color: props.color,
        ...(props.customStyles && props.customStyles)
      }}
      href={props.href}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={props.onClick}
    >
      {props.text}
    </a>
  );
}

export default NavLink;
