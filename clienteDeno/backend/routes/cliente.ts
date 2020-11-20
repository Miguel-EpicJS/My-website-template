import { Router } from "https://deno.land/x/oak/mod.ts";
import { db } from "../mongoDB/db.ts";

export const routes = new Router();

interface ClienteSchema {
  id: any;
  name: string;
  price: string;
  date: string;
  desc: string;
}

const cliente = db.collection<ClienteSchema>("cliente");

routes.get("/cliente", async function (ctx) {
  const all_clients = await cliente.find({ name: { $ne: null } });
  ctx.response.body = all_clients;
})
  .get("/cliente/:id", async function (ctx) {
    const insertId: string = ctx.params.id!;
    const clientes = await cliente.find({ id: insertId });
    ctx.response.body = clientes;
  })
  .post("/cliente", async function (ctx) {
    const value = await ctx.request.body({ type: "json" });
    const json = await value.value;
    if (json.price && json.name && json.date && json.desc) {
      const client = await cliente.insertOne({
        id: mongoObjectId(),
        name: json.name,
        price: json.price,
        date: json.date,
        desc: json.desc,
      });
      ctx.response.body = "Cliente Criado Com sucesso";
    } else {
      ctx.response.body = "Alguma informação está errada";
    }
  })
  .put("/cliente/:id", async function (ctx) {
    const value = await ctx.request.body({ type: "json" });
    const json = await value.value;
    if (json.price && json.name && json.date && json.desc) {
      const client = await cliente.updateOne(
        { id: ctx.params.id },
        {
          $set: {
            name: json.name,
            price: json.price,
            date: json.date,
            desc: json.desc,
          },
        },
      );
      ctx.response.body = "Cliente alterado Com sucesso";
    } else {
      ctx.response.body = "Alguma informação está errada";
    }
  })
  .delete("/cliente/:id", async function (ctx) {
    const client = await cliente.deleteOne({ id: ctx.params.id });
    ctx.response.body = ("Cliente " + ctx.params.id + " deleted");
  });

function mongoObjectId() {
  var timestamp = (new Date().getTime() / 1000 | 0).toString(16);
  return timestamp + "xxxxxxxxxxxxxxxx".replace(/[x]/g, function () {
    return (Math.random() * 16 | 0).toString(16);
  }).toLowerCase();
}
