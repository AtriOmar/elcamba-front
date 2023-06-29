import React from "react";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const SCALE = 1.7;
const BOX30 = SCALE * 30,
  BOX100 = SCALE * 100,
  BOX37 = SCALE * 37;

const RATIO = {
  1: "2/1",
  2: "1/1",
  3: "2/1",
};

function PosterCard({ order }) {
  return (
    <section>
      <p className="mt-4 font-medium text-sky-700">Cadre:</p>
      <div className="flex justify-center gap-8 mb-2">
        <div className={`${order.type === 4 ? "text-slate-400" : "border-b-2 border-blue-500"} font-medium text-lg`}>Page d'acceuil</div>
        <div className={`${order.type === 4 ? "border-b-2 border-blue-500" : "text-slate-400"} font-medium text-lg`}>Aléatoire</div>
      </div>
      {order.type === 4 ? (
        <div className={`w-full max-w-[500px] grid place-items-center mx-auto aspect-[2/1] ring-blue-500 border rounded-lg hover:bg-slate-100 ring-2`}>
          <div className="">
            <p>Page d'acceuil</p>
            <p>Page de détails produit</p>
            <p>Page des produits</p>
            <p className="mt-2 text-center font-medium">2:1</p>
          </div>
        </div>
      ) : (
        <div className="flex gap-1 w-full">
          <div className={`w-[15.38%] border rounded-lg bg-slate-500`}></div>
          <div className="flex flex-col gap-1 w-[46.15%]">
            <div className={`w-full grid place-items-center  aspect-[2/1] ring-blue-500 border rounded-lg duration-150 ${order.type === 1 ? "ring-2" : ""}`}>
              2:1
            </div>
            <div className={`grow w-full border rounded-lg bg-slate-500`}></div>
          </div>
          <div className={`grid gap-1 w-[38.46%]`}>
            <div className={`aspect-square grid place-items-center ring-blue-500 border rounded-lg duration-150 ${order.type === 2 ? "ring-2" : ""}`}>1:1</div>
            <div className={`aspect-square grid place-items-center ring-blue-500 border rounded-lg duration-150 ${order.type === 2 ? "ring-2" : ""}`}>1:1</div>
            <div className={`aspect-[2/1] grid place-items-center col-span-2 ring-blue-500 border rounded-lg duration-150 ${order.type === 3 ? "ring-2" : ""}`}>
              2:1
            </div>
          </div>
        </div>
      )}
      <p className="mt-4 font-medium text-sky-700">Affiche:</p>

      <img
        className="mt-2 mx-auto max-w-[500px] max-h-[400px] border rounded-md object-cover"
        src={`${BACKEND_URL}/uploads/ads/${order.photo}`}
        alt=""
        style={{ aspectRatio: RATIO[order.type] }}
      />
    </section>
  );
}

export default PosterCard;
