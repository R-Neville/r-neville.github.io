import { useEffect } from "react";
import themes from "../themes";

export interface SkillInfo {
  name: string;
  competency: number;
}

const COMPETENCIES = 15;

function CompetencyGraph(props: { skill: SkillInfo }) {
  const theme = themes.dark;

  useEffect(() => {
    const bars = document.querySelectorAll(".comp-graph .bar");
    bars.forEach((bar, index) => {
      const barEl = bar as HTMLElement;
      if (index < props.skill.competency) {
        setTimeout(() => {
          barEl.style.backgroundColor = theme.bgAccent;
        }, (index + 1) * 100);
      }
    });
  }, [props.skill, theme]);

  const bars = Array(COMPETENCIES)
    .fill(0)
    .map((_item, index) => {
      return (
        <div
          key={index}
          className="bar"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "30px",
            width: "100%",
            border: `1px solid ${theme.bgPrimary}`,
            color: theme.bgPrimary,
          }}
        >{index + 1}</div>
      );
    });

  if (props.skill.name && props.skill.competency) {
    return (
      <div
        className="comp-graph"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
        }}
      >
        <h3 style={{ color: theme.bgAccent }}>{props.skill.name}</h3>
        <div
          className="bar-container"
          style={{
            display: "flex",
            width: "100%",
            height: "30px",
            backgroundColor: theme.bgSecondary,
          }}
        >{bars}</div>
      </div>
    );
  }
  return null;
}

export default CompetencyGraph;
