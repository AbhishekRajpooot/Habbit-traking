import app from "./index.js";
import { connectToDb } from "./config/mongooseConfig.js";
import {
  addHabbitRepo,
  getHabbitByIdRepo,
  updateHabbitRepo,
} from "./features/habbit/habbit.repository.js";

app.listen(3000, async () => {
  await connectToDb();

  console.log("Server is listening at port 3000");
});
