import React from "react";
import PosterSelect from "./PosterSelect";

export default function EditAd() {
  return (
    <div>
      <div className="flex items-center gap-4" id="edit-product">
        <h3 className="text-lg font-medium">Modifier publicité:</h3>
      </div>
      <section className="flex gap-10 mt-10">
        <article className="grow">
          <p className="mt-4 mb-1 font-medium text-lg text-sky-900">Affiche:</p>
          <PosterSelect input={input} setInput={setInput} />
        </article>
        <article className="flex items-center justify-center shrink-0 flex-col w-full max-w-[200px] h-auto mt-8 border-2 border-slate-300 rounded-lg font-bold text-gray-800">
          <p>Prix:</p>
          <p>{amount} DT</p>
        </article>
      </section>
    </div>
  );
}
