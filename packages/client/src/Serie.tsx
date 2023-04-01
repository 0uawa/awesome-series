import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { SerieType } from "./App";
import HearthIcon from "~icons/carbon/favorite";
import HearthIconFilled from "~icons/carbon/favorite-filled";

export type SerieProps = {
  serie: SerieType;
  onClick?: () => void;
};

export function Serie({ serie, onClick }: SerieProps) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (serie: SerieType) => {
      return fetch(`http://localhost:3000/series/${serie.id}/fav`, {
        method: "POST",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["series"] });
    },
  });
  const clickFav = (serie: SerieType) => {
    mutation.mutate(serie);
  };

  return (
    <div
      onClick={onClick}
      className="flex flex-col justify-center items-center h-40 border-2 border-slate-200 rounded-lg "
    >
      <p>{serie.title}</p>
      <p>{serie.annee}</p>
      {serie.isFav ? (
        <div
          onClick={() => clickFav(serie)}
          className="rounded-full transition-all border border-slate-200 p-2 mt-2"
        >
          <HearthIcon className="w-4 h-4" />
        </div>
      ) : (
        <div
          onClick={() => clickFav(serie)}
          className="rounded-full transition-all border border-red-500 p-2 mt-2"
        >
          <HearthIconFilled className="w-4 h-4 text-red-500" />
        </div>
      )}
    </div>
  );
}
