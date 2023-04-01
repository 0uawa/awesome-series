"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = require("fastify");
const cors_1 = __importDefault(require("@fastify/cors"));
const server = (0, fastify_1.fastify)({
    logger: true,
});
// register plugin below:
await server.register(cors_1.default, {
// put your options here
});
let series = [
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
server.get("/series", (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    return series.map((serie) => {
        const { actors } = serie, rest = __rest(serie, ["actors"]);
        return rest;
    });
}));
server.get("/series/fav", (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    return series.filter((serie) => serie.isFav);
}));
server.get("/series/:id", (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(request.params);
    const s = series.find((serie) => serie.id === Number(request.params.id));
    console.log(s);
    return s;
}));
server.post("/series/add", (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    series.push(Object.assign(Object.assign({}, request.body), { id: series.length }));
    return series;
}));
server.post("/series/:id/fav", (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    series.map((serie) => serie.id === request.body.id ? (serie.isFav = !serie.isFav) : serie);
    console.log(request.body.id);
    return series;
}));
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield server.listen({ port: 3000 });
        console.log("Server started successfully");
    }
    catch (err) {
        server.log.error(err);
        process.exit(1);
    }
});
start();
