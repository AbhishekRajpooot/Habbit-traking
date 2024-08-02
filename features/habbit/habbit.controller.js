import {
  addHabbitRepo,
  getAllHabbitRepo,
  getHabbitByIdRepo,
  updateHabbitRepo,
} from "./habbit.repository.js";

export const getAllHabbit = async (req, res) => {
  const resp = await getAllHabbitRepo();
  if (resp.success) {
    const habbits = resp.msg;
    const todayDate = Date.now();
    res.render("index", { habbits, todayDate });
  } else {
    res.send(resp.msg);
  }
};

export const getHabbitDetail = async (req, res) => {
  const _id = req.params.id;
  const date = new Date(parseInt(req.params.date));
  const resp = await getHabbitByIdRepo(_id);
  if (resp.success) {
    const habit = resp.msg;
    const count = 6;
    const statusArr = generateNDays(date, count, habit);
    res.render("habbit-detail", { habit, statusArr });
  } else {
    res.send(resp.msg);
  }
};

export function generateNDays(startDate, count, habbit) {
  let statusArr = [];
  for (let i = 0; i < count; i++) {
    const newDate = new Date(startDate);
    newDate.setDate(startDate.getDate() - i);
    const day = habbit.status.find(
      (d) => d.date.toDateString() === newDate.toDateString()
    ) || { date: newDate, state: "None" };
    statusArr.push(day);
  }
  return statusArr;
}

export const addHabbit = async (req, res) => {
  const name = req.body.name;
  console.log(name);
  const resp = addHabbitRepo({ name });
  if (resp.success) {
    res.redirect("/");
  }
  res.send(resp.msg);
};
export const updateHabbit = async (req, res) => {
  let { id, date } = req.params;
  date = new Date(date);
  const resp = await updateHabbitRepo(id, date);
  if (resp.success) {
    const state = resp.msg;
    res.json(state);
  } else {
    res.send(resp.msg);
  }
};

export const getPrevHabbitDetail = async (req, res) => {
  let { id, date } = req.params;
  date = new Date(date);
  date.setDate(date.getDate() - 1);
  date = date.getTime();
  res.redirect(`/habbits/${id}/${date}`);
};

export const getNextHabbitDetail = async (req, res) => {
  let { id, date } = req.params;
  date = new Date(date);
  date.setDate(date.getDate() + 6);
  date = date.getTime();
  res.redirect(`/habbits/${id}/${date}`);
};
