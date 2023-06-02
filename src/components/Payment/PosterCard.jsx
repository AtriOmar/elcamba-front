import React from "react";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const SCALE = 1.7;
const BOX30 = SCALE * 30,
  BOX100 = SCALE * 100,
  BOX37 = SCALE * 37;

const RATIO = {
  1: "600/300",
  2: "220/260",
  3: "455/260",
};

function PosterCard({ order }) {
  return (
    <section>
      <p className="mt-4 font-medium text-sky-700">Cadre:</p>
      <div className="flex gap-1 [&_*]:box-content box-content w-fit mx-auto mt-2">
        <div className={`border rounded-lg bg-slate-500`} style={{ width: BOX30 + "px" }}></div>
        <div className="flex flex-col gap-1">
          <div
            className={`grid place-items-center aspect-[2/1] ring-blue-500 border rounded-lg duration-150 ${order.type === 1 ? "ring-2" : ""}`}
            style={{ width: BOX100 + "px" }}
          >
            600:300
          </div>
          <div className={`aspect-[600/220] border rounded-lg bg-slate-500`} style={{ width: BOX100 + "px" }}></div>
        </div>
        <div className={`grid gap-1`} style={{ gridTemplateColumns: `repeat(2,${BOX37}px)` }}>
          <div className={`grid place-items-center ring-blue-500 border rounded-lg duration-150 ${order.type === 2 ? "ring-2" : ""}`}>220:260</div>
          <div className={`grid place-items-center ring-blue-500 border rounded-lg duration-150 ${order.type === 2 ? "ring-2" : ""}`}>220:260</div>
          <div className={`grid place-items-center col-span-2 ring-blue-500 border rounded-lg duration-150 ${order.type === 3 ? "ring-2" : ""}`}>455:260</div>
        </div>
      </div>
      <p className="mt-4 font-medium text-sky-700">Affiche:</p>
      <img
        className="mt-2 w-full max-w-[500px] max-h-[400px] border rounded-md object-cover"
        src={`${BACKEND_URL}/uploads/ads/${order.photo}`}
        alt=""
        style={{ aspectRatio: RATIO[order.type] }}
      />
    </section>
  );
}

export default PosterCard;
