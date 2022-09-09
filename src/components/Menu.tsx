import themes from "../themes";
import { LinkItem } from "../App";
import NavLink from "./NavLink";

function Menu(props: { id: string; linkItems: LinkItem[] }) {
  const linkEls = props.linkItems.map((li, index) => {
    return (
      <NavLink
        key={index}
        href={li.url}
        text={li.text}
        active={li.active}
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
        backgroundColor: themes.dark.bgPrimary,
      }}
    >
      <nav style={{ display: "flex", flexDirection: "column" }}>{linkEls}</nav>
    </div>
  );
}

export default Menu;
