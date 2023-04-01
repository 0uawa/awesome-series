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
  annee: number;
  isFav: boolean;
  actors: string[];
};
let series: SerieType[] = [
  {
    id: 0,
    title: "onePiece",
    annee: 2000,
    isFav: true,
    actors: ["aaev", "bveava", "cveav"],
  },
  {
    id: 1,
    title: "breaking Bad",
    annee: 2001,
    isFav: false,
    actors: ["aveav", "dvav", "reav"],
  },
  {
    id: 2,
    title: "the Walking Dead",
    annee: 2002,
    isFav: false,
    actors: ["baba", "cvcav", "zvaev"],
  },
  {
    id: 3,
    title: "Casa de Papel",
    annee: 2003,
    isFav: false,
    actors: ["bveav", "cvaev", "veavz"],
  },
  {
    id: 4,
    title: "Suits",
    annee: 2004,
    isFav: false,
    actors: ["eez", "cre", "ztet"],
  },
  {
    id: 5,
    title: "Brooklyn 99",
    annee: 2005,
    isFav: false,
    actors: ["taev", "pveav", "zavev"],
  },
];

server.get("/series", async (request, reply) => {
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
  Body: SerieType;
}>("/series/add", async (request, reply) => {
  series.push({ ...request.body, id: series.length });
  return series;
});

server.post<{
  Body: SerieType;
}>("/series/:id/fav", async (request, reply) => {
  series.map((serie) =>
    serie.id === request.body.id ? (serie.isFav = !serie.isFav) : serie
  );
  console.log(request.body.id);
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
