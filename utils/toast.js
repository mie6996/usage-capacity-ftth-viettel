import React from "react";

const Toast = ({ props }) => {
  return (
    <>
      <div className="mx-auto my-6 flex h-20 min-w-[75%] items-center rounded-xl border-l-4 border-green-500 bg-white drop-shadow-2xl ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          fill="currentColor"
          className="bi bi-check-lg ml-5 rounded-full bg-green-500 text-white"
          viewBox="0 0 16 16"
        >
          <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" />
        </svg>
        <div className="flex-grow-1 ml-5">
          <div className="text-base font-bold text-slate-900">Thành công</div>
          <div className="text-sm text-slate-500">{props.message}</div>
        </div>
        <button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            className="bi bi-x m-5"
            viewBox="0 0 16 16"
          >
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
          </svg>
        </button>
      </div>
    </>
  );
};

export default Toast;
