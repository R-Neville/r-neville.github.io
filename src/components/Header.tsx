import { LinkItem } from "../App";
import NavLink from "./NavLink";
import themes from "../themes";
import Hamburger from "./Hamburger";
import Menu from "./Menu";

function Header(props: { title: string; linkItems: LinkItem[] }) {
  const linkEls = props.linkItems.map((li, index) => {
    return (
      <NavLink key={index} href={li.url} text={li.text} active={li.active} />
    );
  });
  return (
    <header
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "1em",
        backgroundColor: themes.dark.bgPrimary,
        boxShadow: "0px 5px 5px darkgray",
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
        <h1 style={{ margin: 0, color: themes.dark.fgPrimary }}>
          {props.title}
        </h1>
        <nav style={{ display: "none" }}>{linkEls}</nav>
        <Hamburger />
      </div>
      <Menu id={"menu"} linkItems={props.linkItems} />
    </header>
  );
}

export default Header;
