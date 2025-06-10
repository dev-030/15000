import React from 'react';

export default function Loading(){

  return (   
      <>
      <div className="loader-wrapper">
        <svg viewBox="25 25 50 50" className="loader-svg">
          <circle r={20} cy={50} cx={50} className="loader-circle" />
        </svg>
      </div>

      <style>
        {`
          .loader-wrapper {
            display: flex;
            align-items: center;
            justify-content: center;
            height: calc(100vh - 10vh);
            margin-left: -50px;
          }

          .loader-wrapper svg {
            width: 5em;
            height: 5em;
            transform-origin: center;
            animation: rotate4 2s linear infinite;
          }

          .loader-circle {
            fill: none;
            stroke: hsl(214, 97%, 59%);
            stroke-width: 2;
            stroke-dasharray: 1, 200;
            stroke-dashoffset: 0;
            stroke-linecap: round;
            animation: dash4 1.5s ease-in-out infinite;
          }

          @keyframes rotate4 {
            100% {
              transform: rotate(360deg);
            }
          }

          @keyframes dash4 {
            0% {
              stroke-dasharray: 1, 200;
              stroke-dashoffset: 0;
            }

            50% {
              stroke-dasharray: 90, 200;
              stroke-dashoffset: -35px;
            }

            100% {
              stroke-dashoffset: -125px;
            }
          }
        `}
      </style>
    </>
  );
};

