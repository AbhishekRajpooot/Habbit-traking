import express from "express";
import routerHabbit from "./features/habbit/habbit.router.js";
const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use("/", routerHabbit);

export default app;
