import { MouseEvent } from "react";

function Hamburger(props: { lineColor: string }) {

  const lineStyles = {
    height: "6px",
    width: "30px",
    backgroundColor: props.lineColor,
  };

  function onClick(event: MouseEvent<HTMLDivElement>) {
    const hamburger = event.currentTarget as HTMLElement;
    const customEvent = new CustomEvent("hamburger:click", {
      bubbles: true,
    });
    hamburger.dispatchEvent(customEvent);
  }

  return (
    <div
      className="hamburger"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "5px",
        width: "40px",
        height: "40px",
        borderRadius: "3px",
        backgroundColor: "inherit",
        cursor: "pointer",
      }}
      onClick={onClick}
    >
      <div className="line" style={lineStyles}></div>
      <div className="line" style={lineStyles}></div>
      <div className="line" style={lineStyles}></div>
    </div>
  );
}

export default Hamburger;
