import Theme from "../Theme";

function Section(props: {
  theme: Theme,
  id: string;
  heading: string;
  children?: JSX.Element | JSX.Element[];
}) {
  const theme = props.theme;
  return (
    <section
      id={props.id}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "1em",
        width: "100%",
        minHeight: "100vh",
        margin: "0 auto",
        marginBottom: "1em",
        backgroundColor: theme.fgPrimary,
      }}
    >
      <div
        style={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          height: "100%",
          maxWidth: "650px",
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
