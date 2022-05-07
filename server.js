import express from "express";
import { MongoClient } from "mongodb";

const uri =
  "mongodb+srv://admin_soft_hard_system:yHb8P1bSRzhLgghx@cluster0.avzmu.mongodb.net/spark-plug?retryWrites=true&w=majority";

const client = new MongoClient(uri);

const app = express();
const port = process.env.PORT || 8080;

app.get("/cars", async function (req, res, next) {
  try {
    await client.connect();
  } finally {
    await client.close();
  }

  res.send("Hello World!");
});

app.listen(port);
