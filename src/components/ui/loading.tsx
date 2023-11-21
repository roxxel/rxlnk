import React, { FC } from "react";

interface IProps {
    className: string
}

const Loading: FC<IProps> = (props) => {
  return (
    <span className="inline">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={props.className}
        style={{margin: 'auto', background: 'rgba(255, 255, 255,0)', display: 'block', shapeRendering: 'auto'}}
        width="200px"
        height="200px"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid"
      >
        <circle
          cx="50"
          cy="50"
          fill="none"
          stroke="#ffffff"
          stroke-width="10"
          r="35"
          stroke-dasharray="164.93361431346415 56.97787143782138"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            repeatCount="indefinite"
            dur="1s"
            values="0 50 50;360 50 50"
            keyTimes="0;1"
          ></animateTransform>
        </circle>
      </svg>
    </span>
  );
};

export default Loading;
