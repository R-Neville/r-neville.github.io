import { MouseEvent, useCallback, useState } from "react";
import { slideDown, slideUp } from "../helpers";
import themes from "../themes";

const ANIMATION_DURATION_FACTOR = 10;

function Expander(props: { children: JSX.Element | JSX.Element[] }) {
  const theme = themes.dark;

  const btnStyles = {
    padding: "0.5em 1em",
    border: "none",
    backgroundColor: theme.bgPrimary,
    fontSize: "1em",
    color: theme.fgPrimary,
    cursor: "pointer",
  };

  const [childIndex, setChildIndex] = useState(0);

  const onShowMoreButtonClick = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      const button = event.target as HTMLElement;
      const parent = button.closest(".expander");
      const expandables = parent?.querySelector(".expandables")?.children;
      if (parent && expandables) {
        const expandablesArray = Array.from(expandables);
        if (childIndex < expandablesArray.length) {
          setChildIndex(childIndex + 1);
          slideDown(
            expandablesArray[childIndex] as HTMLElement,
            "block",
            ANIMATION_DURATION_FACTOR
          );
          if (childIndex === expandablesArray.length - 1) {
            button.style.display = "none";
            const hideButton = parent.querySelector(".hide") as HTMLElement;
            if (hideButton) {
              hideButton.style.display = "block";
            }
          }
        }
      }
    },
    [childIndex]
  );

  const onHideButtonClick = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      const button = event.target as HTMLElement;
      const parent = button.closest(".expander") as HTMLElement;
      const expandables = parent?.querySelector(".expandables") as HTMLElement;
      if (parent && expandables) {
        setChildIndex(0);
        button.style.display = "none";
        slideUp(expandables, ANIMATION_DURATION_FACTOR, () => {
          Array.from(expandables.children).forEach((e) => {
            (e as HTMLElement).style.display = "none";
          });
          expandables.style.display = "flex";
          const showMoreButton = parent.querySelector(
            ".show-more"
          ) as HTMLElement;
          if (showMoreButton) {
            showMoreButton.style.display = "block";
          }
        });
      }
    },
    []
  );

  function onBtnMouseEnter(event: MouseEvent<HTMLButtonElement>) {
    const button = event.target as HTMLElement;
    button.style.backgroundColor = theme.bgAccent;
  }

  function onBtnMouseLeave(event: MouseEvent<HTMLButtonElement>) {
    const button = event.target as HTMLElement;
    button.style.backgroundColor = theme.bgPrimary;
  }

  return (
    <div
      className="expander"
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <div
        className="expandables"
        style={{ display: "flex", flexDirection: "column" }}
      >
        {props.children}
      </div>
      <button
        className="show-more"
        style={btnStyles}
        onClick={onShowMoreButtonClick}
        onMouseEnter={onBtnMouseEnter}
        onMouseLeave={onBtnMouseLeave}
      >
        Show More
      </button>
      <button
        className="hide"
        style={{ display: "none", ...btnStyles }}
        onClick={onHideButtonClick}
        onMouseEnter={onBtnMouseEnter}
        onMouseLeave={onBtnMouseLeave}
      >
        Hide
      </button>
    </div>
  );
}

export default Expander;
