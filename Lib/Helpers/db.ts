import { MongoClient } from "https://deno.land/x/mongo@v0.8.0/mod.ts";

class Database {
  public client: MongoClient;
  constructor(public dbName: string, public url: string) {
    this.dbName = dbName;
    this.url = url;
    this.client = {} as MongoClient;
  }
  connect() {
    if (this.client.hasOwnProperty("database")) return this.client;
    const client = new MongoClient();
    client.connectWithUri(this.url);
    this.client = client;
  }

  get getDatabase() {
    return this.client.database(this.dbName);
  }

  getModel(name: string) {
    return this.getDatabase.collection(name)
  }
}

const dbName = Deno.env.get("MONGO_DB_NAME") || "denotorious";
const dbHostUrl = Deno.env.get("MONGO_DB_URL") || "mongodb://localhost:27017";
const db = new Database(dbName, dbHostUrl);
db.connect();

export default db