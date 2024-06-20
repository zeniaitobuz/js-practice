import express from "express";
import mongoose from "mongoose";
import config from "./config/config.js";
import bodyParser from "body-parser";
import router from "./routes/routes.js";

const app = express();
const port = 4000;

const { user, password } = config;
const url = `mongodb+srv://${user}:${password}@cluster0.kovemww.mongodb.net/`;

mongoose.connect(url);

const database = mongoose.connection;

database.on("error", async (error) => {
  console.log("Error in MongoDb connection : " + error.message);
  await mongoose.disconnect();
  throw new Error(error);
});

database.once("open", () => {
  console.log("Database Connected successfully ✅");
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(port, () => {
  console.log("Server is listening on port 4000");
});

app.use("/", router);
