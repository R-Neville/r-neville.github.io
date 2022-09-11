import { useEffect } from "react";
import themes from "../themes";

export interface SkillInfo {
  name: string;
  competency: number;
}

const COMPETENCY_MAX = 15;

interface CompetencyLevel {
  category: string;
  detail: string;
}

const BEGINNER = "Beginner";
const FAMILIAR = "Familiar";
const PROFICIENT = "Proficient";
const ADVANCED = "ADVANCED";
const EXPERT = "EXPERT";

const COMPETENCIES = [
  {
    category: BEGINNER,
    detail: "1",
  },
  {
    category: BEGINNER,
    detail: "2",
  },
  {
    category: BEGINNER,
    detail: "3",
  },
  {
    category: FAMILIAR,
    detail: "4",
  },
  {
    category: FAMILIAR,
    detail: "5",
  },
  {
    category: FAMILIAR,
    detail: "6",
  },
  {
    category: PROFICIENT,
    detail: "7",
  },
  {
    category: PROFICIENT,
    detail: "8",
  },
  {
    category: PROFICIENT,
    detail: "9",
  },
  {
    category: ADVANCED,
    detail: "10",
  },
  {
    category: ADVANCED,
    detail: "11",
  },
  {
    category: ADVANCED,
    detail: "12",
  },
  {
    category: EXPERT,
    detail: "13",
  },
  {
    category: EXPERT,
    detail: "14",
  },
  {
    category: EXPERT,
    detail: "15",
  },
] as CompetencyLevel[];

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
    const description = document.querySelector(".comp-graph .description");
    const competency = COMPETENCIES[props.skill.competency - 1];
    if (description) {
      setTimeout(() => {
        description.textContent = `${competency.category} - ${competency.detail}`;
      });
    }
  }, [props.skill, theme]);

  const bars = Array(COMPETENCY_MAX)
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
            border: `1px solid ${theme.bgSecondary}`,
            fontSize: "10px",
            color: theme.bgSecondary,
          }}
        >
          {index + 1}
        </div>
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
        >
          {bars}
        </div>
        <p className="description" style={{ color: theme.bgAccent, fontSize: "1em" }}></p>
      </div>
    );
  }
  return null;
}

export default CompetencyGraph;
