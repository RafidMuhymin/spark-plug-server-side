import cors from "cors";
import express from "express";
import { MongoClient, ObjectId } from "mongodb";

const app = express(),
  port = process.env.PORT || 8080,
  uri =
    "mongodb+srv://admin_soft_hard_system:yHb8P1bSRzhLgghx@cluster0.avzmu.mongodb.net/spark-plug?retryWrites=true&w=majority",
  client = new MongoClient(uri);

app.use(cors());

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

app.get("/cars/:id", async function (req, res, next) {
  try {
    await client.connect();

    const cursor = { _id: ObjectId(req.params.id) },
      collection = client.db("spark-plug").collection("cars")

    const [carDetails] = await collection.find(cursor).toArray();

    res.send(carDetails);
  } catch (error) {
    res.status(500);

    res.send("Connection could not be established");
  } finally {
    await client.close();
  }
});

app.post("/cars/:id", async function (req, res, next) {
  try {
    await client.connect();

    const cursor = { _id: ObjectId(req.params.id) },
      collection = client.db("spark-plug").collection("cars")

    const [carDetails] = await collection.find(cursor).toArray();

    res.send(carDetails);
  } catch (error) {
    res.status(500);

    res.send("Connection could not be established");
  } finally {
    await client.close();
  }
});

app.put("/cars/:id", async function (req, res, next) {
  try {
    await client.connect();

    const cursor = { _id: ObjectId(req.params.id) },
      collection = client.db("spark-plug").collection("cars")

    const [carDetails] = await collection.find(cursor).toArray();

    res.send(carDetails);
  } catch (error) {
    res.status(500);

    res.send("Connection could not be established");
  } finally {
    await client.close();
  }
});

app.delete("/cars/:id", async function (req, res, next) {
  try {
    await client.connect();

    const cursor = { _id: ObjectId(req.params.id) },
      collection = client.db("spark-plug").collection("cars")

    const [carDetails] = await collection.find(cursor).toArray();

    res.send(carDetails);
  } catch (error) {
    res.status(500);

    res.send("Connection could not be established");
  } finally {
    await client.close();
  }
});

app.listen(port);
