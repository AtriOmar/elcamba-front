import React, { useRef } from "react";
const SCALE = 3;
const BOX30 = SCALE * 30,
  BOX100 = SCALE * 100,
  BOX37 = SCALE * 37;

function TypeSelect({ input, setInput }) {
  if (input.type === 4) {
    return (
      <div className={`w-full max-w-[500px] grid place-items-center mx-auto aspect-[2/1] ring-blue-500 border rounded-lg hover:bg-slate-100 ring-2`}>
        <div className="">
          <p>Page d'acceuil</p>
          <p>Page de détails produit</p>
          <p>Page des produits</p>
          <p className="mt-2 text-center font-medium">2:1</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-1 w-full">
      <div className={`w-[15.38%] border rounded-lg bg-slate-500`}></div>
      <div className="flex flex-col gap-1 w-[46.15%]">
        <button
          onClick={() => setInput((prev) => ({ ...prev, type: 1 }))}
          className={`w-full grid place-items-center  aspect-[2/1] ring-blue-500 border rounded-lg hover:bg-slate-100 duration-150 ${
            input.type === 1 ? "ring-2" : ""
          }`}
        >
          2:1
        </button>
        <div className={`grow w-full border rounded-lg bg-slate-500`}></div>
      </div>
      <div className={`grid gap-1 w-[38.46%]`}>
        <button
          onClick={() => setInput((prev) => ({ ...prev, type: 2 }))}
          className={`aspect-square grid place-items-center ring-blue-500 border rounded-lg hover:bg-slate-100 duration-150 ${
            input.type === 2 ? "ring-2" : ""
          }`}
        >
          1:1
        </button>
        <button
          onClick={() => setInput((prev) => ({ ...prev, type: 2 }))}
          className={`aspect-square grid place-items-center ring-blue-500 border rounded-lg hover:bg-slate-100 duration-150 ${
            input.type === 2 ? "ring-2" : ""
          }`}
        >
          1:1
        </button>
        <button
          onClick={() => setInput((prev) => ({ ...prev, type: 3 }))}
          className={`aspect-[2/1] grid place-items-center col-span-2 ring-blue-500 border rounded-lg hover:bg-slate-100 duration-150 ${
            input.type === 3 ? "ring-2" : ""
          }`}
        >
          2:1
        </button>
      </div>
    </div>
  );
}

export default TypeSelect;
