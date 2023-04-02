import { fastify } from "fastify";
import cors from "@fastify/cors";
const server = fastify({
  logger: true,
});
// register plugin below:
await server.register(cors, {
  // put your options here
});
type SerieType = {
  id: number;
  title: string;
  year: number;
  isFav: boolean;
  actors: string[];
};

export type SerieWithoutIdType = Omit<SerieType, "id">;

let series: SerieType[] = [
  {
    id: 0,
    title: "onePiece",
    year: 2000,
    isFav: true,
    actors: ["aaev", "bveava", "cveav"],
  },
  {
    id: 1,
    title: "breaking Bad",
    year: 2001,
    isFav: false,
    actors: ["aveav", "dvav", "reav"],
  },
  {
    id: 2,
    title: "the Walking Dead",
    year: 2002,
    isFav: false,
    actors: ["baba", "cvcav", "zvaev"],
  },
  {
    id: 3,
    title: "Casa de Papel",
    year: 2003,
    isFav: false,
    actors: ["bveav", "cvaev", "veavz"],
  },
  {
    id: 4,
    title: "Suits",
    year: 2004,
    isFav: false,
    actors: ["eez", "cre", "ztet"],
  },
  {
    id: 5,
    title: "Brooklyn 99",
    year: 2005,
    isFav: false,
    actors: ["taev", "pveav", "zavev"],
  },
];

server.get("/series", async (request, reply) => {
  console.log("debut");
  return series.map((serie) => {
    const { actors, ...rest } = serie;
    return rest;
  });
});
server.get("/series/fav", async (request, reply) => {
  return series.filter((serie) => serie.isFav);
});
server.get<{ Params: { id: string } }>(
  "/series/:id",
  async (request, reply) => {
    console.log(request.params);
    const s = series.find((serie) => serie.id === Number(request.params.id));
    console.log(s);
    return s;
  }
);

server.post<{
  Body: string;
}>("/series/add", async (request, reply) => {
  const serie = JSON.parse(request.body) as SerieType;

  if (series.find((s) => s.title === serie.title)) {
    console.log("test");
    return;
  }
  series.push({ ...serie, id: series.length });
  return series;
});

server.post<{
  Params: { id: string };
}>("/series/:id/fav", async (request, reply) => {
  series.map((serie) =>
    serie.id === Number(request.params.id)
      ? (serie.isFav = !serie.isFav)
      : serie
  );
  console.log(Number(request.params.id));
  return series;
});

const start = async () => {
  try {
    await server.listen({ port: 3000 });
    console.log("Server started successfully");
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};
start();
