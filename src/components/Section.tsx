import themes from "../themes";

const HEADER_HEIGHT = 75;

function Section(props: {
  id: string;
  heading: string;
  children?: JSX.Element | JSX.Element[];
}) {
  const theme = themes.dark;

  return (
    <section
      id={props.id}
      style={{
        padding: "1em",
        paddingTop: HEADER_HEIGHT + "px",
        width: "100%",
        height: "100vh",
        margin: "0 auto",
        marginBottom: "1em",
        backgroundColor: theme.fgPrimary,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          maxWidth: "650px",
          margin: "0 auto",
        }}
      >
        <h2
          style={{
            width: "100%",
            borderBottom: `2px solid ${theme.bgPrimary}`,
            color: theme.bgPrimary,
          }}
        >
          {props.heading}
        </h2>
        {props.children}
      </div>
    </section>
  );
}

export default Section;
