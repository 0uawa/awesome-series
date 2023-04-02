import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Serie } from "./Serie";
import { CreateSerie, Form, SerieWithoutIdType } from "./Form";

export type SerieType = {
  id: number;
  title: string;
  year: number;
  isFav: boolean;
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

  const queryClient = useQueryClient();

  const mutationAdd = useMutation({
    mutationFn: (serie: CreateSerie) => {
      console.log(serie);
      return fetch("http://localhost:3000/series/add", {
        method: "POST",
        body: JSON.stringify(serie),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["series"] });
    },
  });

  const clickAdd = (serie: CreateSerie) => {
    serie.title && mutationAdd.mutate(serie);
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
    <div className="App p-20 min-h-screen bg-slate-800 text-white ">
      <h1 className="text-3xl mb-3">Mes series</h1>
      <input className="rounded-lg p-2 bg-slate-200" placeholder="Rechercher" />
      <div className="p-10 grid grid-cols-5 gap-4">
        {data.map((serie) => (
          <Serie
            onClick={() => clickSerie(serie)}
            key={serie.id}
            serie={serie}
          ></Serie>
        ))}
      </div>
      <div className="flex justify-center">
        {isSerieSuccess && <Serie serie={serie}></Serie>}
      </div>
      <Form onclick={clickAdd} />
    </div>
  );
}

export default App;
