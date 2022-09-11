import React from "react";

function PaletteIcon(props: { color: string; width: number; height: number }) {
  return (
    <svg
      width={`${props.width}px`}
      height={`${props.height}px`}
      version="1.1"
      viewBox="0 0 54.665 53.721"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g transform="translate(-75.319 -19.119)">
        <g id="brush" transform="translate(-12.63 -6.866)">
          <g>
            <path
              id="palette"
              fill={props.color}
              transform="translate(12.63 6.866)"
              d="m93.557 19.683c-11.205 0.03106-17.15 10.384-18.042 18.812-1.4219 5.9257 4.7907 34.953 22.604 33.357 2.718-0.25009 4.5589-0.42394 3.1021-3.438-2.573-9.4188 4.3532-12.354 4.3532-12.354s37.187-2.1369 11.356-24.956c-9.414-8.3163-17.193-11.439-23.373-11.422zm-0.66869 8.2636a2.3065 2.3065 0 0 1 2.3063 2.3063 2.3065 2.3065 0 0 1-2.3063 2.3068 2.3065 2.3065 0 0 1-2.3068-2.3068 2.3065 2.3065 0 0 1 2.3068-2.3063zm13.331 2.7099a2.3065 2.3065 0 0 1 2.3068 2.3063 2.3065 2.3065 0 0 1-2.3068 2.3063 2.3065 2.3065 0 0 1-2.3063-2.3063 2.3065 2.3065 0 0 1 2.3063-2.3063zm-23.674 4.6126a2.3065 2.3065 0 0 1 2.3063 2.3068 2.3065 2.3065 0 0 1-2.3063 2.3063 2.3065 2.3065 0 0 1-2.3068-2.3063 2.3065 2.3065 0 0 1 2.3068-2.3068zm27.512 8.2238a2.3065 2.3065 0 0 1 2.3068 2.3063 2.3065 2.3065 0 0 1-2.3068 2.3068 2.3065 2.3065 0 0 1-2.3063-2.3068 2.3065 2.3065 0 0 1 2.3063-2.3063zm-16.771 5.7743c3.0595-1e-6 3.8887 4.0152 3.8887 6.7758 1e-6 2.7606-2.922 2.9564-5.9815 2.9564-3.0595 0-5.0984-0.19583-5.0984-2.9564 0-2.7606 4.1318-6.7758 7.1913-6.7758z"
            />
            <path
              id="handle"
              fill={props.color}
              d="m135.58 38.309-6.5112 31.79c-1.4998 12.215-2.0004 13.246 2.4745 0.40672l7.6809-31.681z"
            />
            <path
              id="tip"
              fill={props.color}
              d="m139.84 37.119-3.6156-0.43322s-0.59848-1.8091 2.3486-5.4357c2.9471-3.6266 3.0642-5.2649 3.0642-5.2649s3.1246 6.2779-1.7973 11.134z"
            />
          </g>
        </g>
      </g>
    </svg>
  );
}

export default PaletteIcon;