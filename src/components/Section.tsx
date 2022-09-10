import themes from "../themes";

function Section(props: { id: string; heading: string, children?: JSX.Element | JSX.Element[] }) {
  const theme = themes.dark;

  return (
    <section
      id={props.id}
      style={{
        padding: "1em",
        width: "100%",
        maxWidth: "650px",
        height: "500px",
        margin: "0 auto",
        marginBottom: "1em",
        backgroundColor: theme.fgPrimary
      }}
    >
      <h2
        style={{
          borderBottom: `2px solid ${theme.bgPrimary}`,
          color: theme.bgPrimary,
        }}
      >
        {props.heading}
      </h2>
      {props.children}
    </section>
  );
}

export default Section;
