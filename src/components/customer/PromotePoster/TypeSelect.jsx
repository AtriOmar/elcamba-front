import React, { useRef } from "react";
const SCALE = 3;
const BOX30 = SCALE * 30,
  BOX100 = SCALE * 100,
  BOX37 = SCALE * 37;

function TypeSelect({ input, setInput }) {
  return (
    <div className="flex gap-1 [&_*]:box-content box-content w-full">
      <div
        className={`border rounded-lg bg-slate-500`}
        // style={{ width: BOX30 + "px" }}
        style={{ width: "14.6%" }}
      ></div>
      <div className="flex flex-col gap-1" style={{ width: "47.83%" }}>
        <button
          onClick={() => setInput((prev) => ({ ...prev, type: 1 }))}
          className={`w-full grid place-items-center  aspect-[2/1] ring-blue-500 border rounded-lg hover:bg-slate-100 duration-150 ${
            input.type === 1 ? "ring-2" : ""
          }`}
          // style={{ width: BOX100 + "px" }}
        >
          600:300
        </button>
        <div
          className={`w-full aspect-[600/220] border rounded-lg bg-slate-500`}
          // style={{ width: BOX100 + "px" }}
        ></div>
      </div>
      <div
        className={`grid gap-1`}
        // style={{ gridTemplateColumns: `repeat(2,${BOX37}px)` }}
        style={{ gridTemplateColumns: `1fr_1fr`, width: "36.03%" }}
      >
        <button
          onClick={() => setInput((prev) => ({ ...prev, type: 2 }))}
          className={`grid place-items-center ring-blue-500 border rounded-lg hover:bg-slate-100 duration-150 ${input.type === 2 ? "ring-2" : ""}`}
        >
          220:260
        </button>
        <button
          onClick={() => setInput((prev) => ({ ...prev, type: 2 }))}
          className={`grid place-items-center ring-blue-500 border rounded-lg hover:bg-slate-100 duration-150 ${input.type === 2 ? "ring-2" : ""}`}
        >
          220:260
        </button>
        <button
          onClick={() => setInput((prev) => ({ ...prev, type: 3 }))}
          className={`grid place-items-center col-span-2 ring-blue-500 border rounded-lg hover:bg-slate-100 duration-150 ${input.type === 3 ? "ring-2" : ""}`}
        >
          455:260
        </button>
      </div>
    </div>
  );
}

export default TypeSelect;
