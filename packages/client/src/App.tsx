import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Serie } from "./Serie";

export type SerieType = {
  id: number;
  title: string;
  annee: number;
  isFav: boolean;
  actors: string[];
};

function App() {
  const { isLoading, error, data, isSuccess } = useQuery<SerieType[]>({
    queryKey: ["series"],
    queryFn: () => {
      console.log("fetchSeries");
      return fetch("http://localhost:3000/series").then((res) => res.json());
    },
  });

  const [selectdedSerie, setSelectdedSerie] = useState<SerieType | null>(null);

  const { data: serie, isSuccess: isSerieSuccess } = useQuery<SerieType>({
    queryKey: ["series", selectdedSerie?.id],
    queryFn: () => {
      console.log("fetch selected value");
      return fetch(`http://localhost:3000/series/${selectdedSerie?.id}`).then(
        (res) => res.json()
      );
    },
    enabled: !!selectdedSerie,
  });
  console.log(serie);

  const clickSerie = (serie: SerieType) => {
    console.log("click");
    setSelectdedSerie(serie);
  };
  if (error) {
    return <p>Error bro lol</p>;
  }

  if (isLoading) {
    return <p>Chargement ...</p>;
  }
  if (!isSuccess) {
    return <p>pas de success</p>;
  }

  return (
    <div className="App min-h-screen bg-slate-800 text-white ">
      <div className="grid grid-cols-5 gap-4">
        {data.map((serie) => (
          <Serie
            onClick={() => clickSerie(serie)}
            key={serie.id}
            serie={serie}
          ></Serie>
        ))}
      </div>
      {isSerieSuccess && <Serie serie={serie}></Serie>}
    </div>
  );
}

export default App;
