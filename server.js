import express from "express";
import { MongoClient } from "mongodb";

const uri =
  "mongodb+srv://admin_soft_hard_system:yHb8P1bSRzhLgghx@cluster0.avzmu.mongodb.net/spark-plug?retryWrites=true&w=majority";

const client = new MongoClient(uri);

const app = express(),
  port = process.env.PORT || 8080;

app.get("/cars", async function (req, res, next) {
  try {
    await client.connect();

    const cursor = {},
      collection = client.db("spark-plug").collection("cars");

    const result = await collection.find(cursor).toArray();

    res.send(result);
  } catch {
    res.status(500);

    res.send("Connection could not be established");
  } finally {
    await client.close();
  }
});

app.listen(port);
