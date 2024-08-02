import express from "express";
import {
  addHabbit,
  getAllHabbit,
  getHabbitDetail,
  getNextHabbitDetail,
  getPrevHabbitDetail,
  updateHabbit,
} from "./habbit.controller.js";

const router = express.Router();

router.route("/").get(getAllHabbit);
router.route("/habbits/:id/:date").get(getHabbitDetail);
router.route("/habbits/:id/:date").post(updateHabbit);
router.route("/habbits/prev/:id/:date").get(getPrevHabbitDetail);
router.route("/habbits/next/:id/:date").get(getNextHabbitDetail);

router.route("/add-habbit/").post(addHabbit);

export default router;
