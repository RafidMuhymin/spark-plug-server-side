import "dotenv/config";
import cors from "cors";
import express from "express";
import { MongoClient, ObjectId } from "mongodb";

const app = express(),
  port = process.env.PORT || 8080,
  uri = process.env.MONGODB_CONNECTION_URI,
  client = new MongoClient(uri);

app.use(cors(), express.json());

app.get("/cars", async function (req, res, next) {
  try {
    await client.connect();

    const limit = parseInt(req.query.limit || 0),
      userId = req.query.userId;

    const cursor = {},
      collection = client.db("spark-plug").collection("cars");

    if (userId) cursor.userId = userId;

    const result = await collection.find(cursor).limit(limit).toArray();

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
      collection = client.db("spark-plug").collection("cars");

    const [carDetails] = await collection.find(cursor).toArray();

    res.send(carDetails);
  } catch (error) {
    res.status(500);

    res.send("Connection could not be established");
  } finally {
    await client.close();
  }
});

app.post("/cars", async function (req, res, next) {
  try {
    await client.connect();

    const collection = client.db("spark-plug").collection("cars");

    const carDetails = req.body;

    const insertDetails = await collection.insertOne(carDetails);

    res.send(insertDetails);
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

    const cursor = { _id: ObjectId(req.body._id) },
      collection = client.db("spark-plug").collection("cars");

    delete req.body._id;

    const updateDetails = await collection.updateOne(cursor, {
      $set: req.body,
    });

    res.send(updateDetails);
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
      collection = client.db("spark-plug").collection("cars");

    const [carDetails] = await collection.find(cursor).toArray();

    const deleteDetails = await collection.updateOne(cursor);

    res.send(deleteDetails);

    res.send(carDetails);
  } catch (error) {
    res.status(500);

    res.send("Connection could not be established");
  } finally {
    await client.close();
  }
});

app.listen(port);
