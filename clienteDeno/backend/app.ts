import { oakCors } from "https://deno.land/x/cors/mod.ts";
import { Application } from "https://deno.land/x/oak/mod.ts";
import {routes} from "./routes/cliente.ts";

const app = new Application();

app.use(oakCors({
  origin: 'http://127.0.0.1:3000',
  optionsSuccessStatus: 200,
}));
app.use(routes.routes());
app.use(routes.allowedMethods());

app.listen({port: 3000});
console.log(`Server started on port 3000`)
