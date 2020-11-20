import { MongoClient } from "https://deno.land/x/mongo/mod.ts";

const client = new MongoClient();

const url = "mongodb://127.0.0.1:27017"
const dbName = "cliente"
client.connectWithUri(url);
export const db = client.database(dbName);

console.log("Connected Successfully")
