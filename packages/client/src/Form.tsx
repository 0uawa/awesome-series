import { useState } from "react";
import { SerieType } from "./App";
import { SerieWithActors } from "./Serie";

export type FormProps = {
  onclick: (serie: CreateSerie) => void;
};
export type SerieWithoutIdType = Omit<SerieWithActors, "id">;

export type CreateSerie = {
  title: string | null;
  year: number | null;
  actors: string[];
  isFav: boolean;
};

export function Form({ onclick }: FormProps) {
  const [serieWithoutId, setSerieWithoutId] = useState<CreateSerie>({
    title: null,
    year: null,
    actors: ["", "", ""],
    isFav: false,
  });
  return (
    <div>
      <h1 className="text-3xl mb-3">Add series</h1>
      <div className="flex flex-wrap gap-3 text-slate-800">
        <input
          onChange={(e) =>
            setSerieWithoutId({ ...serieWithoutId, title: e.target.value })
          }
          type="text"
          placeholder="Title"
          className="rounded-lg p-2 bg-slate-200"
        />
        <input
          onChange={(e) =>
            setSerieWithoutId({
              ...serieWithoutId,
              year: Number(e.target.value),
            })
          }
          type="text"
          placeholder="Year"
          className="rounded-lg p-2 bg-slate-200"
        />
        <input
          onChange={(e) => {
            serieWithoutId.actors[0] = e.target.value;
            setSerieWithoutId(serieWithoutId);
          }}
          type="text"
          placeholder="Actor"
          className="rounded-lg bg-slate-200 p-2"
        />
        <input
          onChange={(e) => {
            serieWithoutId.actors[1] = e.target.value;
            setSerieWithoutId(serieWithoutId);
          }}
          type="text"
          placeholder="Actor"
          className="rounded-lg bg-slate-200 p-2"
        />
        <input
          onChange={(e) => {
            serieWithoutId.actors[2] = e.target.value;
            setSerieWithoutId(serieWithoutId);
          }}
          type="text"
          placeholder="Actor"
          className="bg-slate-200 rounded-lg p-2"
        />
        <button className="text-white" onClick={() => onclick(serieWithoutId)}>
          add
        </button>
      </div>
    </div>
  );
}
