import { habbitSchema } from "./habbit.schema.js";
import mongoose from "mongoose";

const Habbit = mongoose.model("Habbit", habbitSchema);

export const addHabbitRepo = async (data) => {
  try {
    const newHabbit = new Habbit(data);
    await newHabbit.save();
    return { success: true, msg: newHabbit };
  } catch (error) {
    return { success: false, msg: error };
  }
};

export const getHabbitByIdRepo = async (_id) => {
  const habbit = await Habbit.findOne({ _id });
  try {
    if (habbit) {
      return { success: true, msg: habbit };
    } else {
      return { success: false, msg: "Id not found" };
    }
  } catch (error) {
    return { success: false, msg: error };
  }
};

export const getAllHabbitRepo = async () => {
  try {
    const habbit = await Habbit.find();
    return { success: true, msg: habbit };
  } catch (error) {
    return { success: false, msg: error };
  }
};

export const updateHabbitRepo = async (_id, date) => {
  let state;
  try {
    const habbit = await Habbit.findOne({ _id });
    if (!habbit) {
      return { success: fasle, msg: " Habbit not found with this id" };
    }
    let dayState = habbit.status.find(
      (item) => item.date.toDateString() === date.toDateString()
    );
    if (!dayState) {
      dayState = { date, state: "Done" };
      habbit.status.push(dayState);
    } else {
      switch (dayState.state) {
        case "None":
          state = "Done";
          break;
        case "Done":
          state = "Not Done";
          break;
        default:
          state = "None";
      }
      dayState.state = state;
    }

    if (state === "Done") {
      habbit.streak += 1;
      habbit.daysDone += 1;
      if (habbit.streak > habbit.maxStreak) {
        habbit.maxStreak = habbit.streak;
      }
    } else if (state == "Not done") {
      habbit.streak = 0;
    }
    await habbit.save();
    return { success: true, msg: dayState.state };
  } catch (error) {
    return { success: false, msg: error };
  }
};
