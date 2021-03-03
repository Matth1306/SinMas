const express = require("express");
const router = express.Router();
const { findUser } = require("../library/dbApi");

const userDb = require("../model/User");
const loggerDb = require("../model/Logger");

// POST new users
router.post("/register", async (req, res) => {
  if (findUser(req.body.email).length > 0)
    return res.status(400).send("User already exist!");
  const userNew = new userDb(req.body);
  try {
    const userSave = await userNew.save();
    res.send(`User ${userSave.email} registered!`);
  } catch (error) {
    res.status(400).send(error);
  }
});

// POST login
router.post("/login", async (req, res) => {
  const uu = await userDb.find();
  console.log(uu);
  const user = await findUser(req.body.email);
  if (!user) return res.status(400).send("User not found!");
  if (req.body.password !== user.password)
    return res.status(400).send("Invalid Password!");
  delete user.password;
  delete user.associateLogger;
  res.send(user);
});

// PUT update user
router.put("/:id", async (req, res) => {
  if (!findUser(req.body.email)) return res.status(400).send("User not found!");
  try {
    const userUpdate = await userDb.updateOne({ _id: req.params.id }, req.body);
    res.send(userUpdate);
  } catch (error) {
    res.status(400).send(error);
  }
});

// DELETE user
router.delete("/:id", async (req, res) => {
  if (!findUser(req.body.email)) return res.status(400).send("User not found!");
  try {
    const userDelete = await userDb.deleteOne({ _id: req.params.id });
    res.send(userDelete);
  } catch (error) {
    res.status(400).send(error);
  }
});

// GET list user
router.get("/list/:id", async (req, res) => {
  let data = [];
  const user = await userDb.findOne({ _id: req.params.id });
  const logger = await loggerDb.find();
  if (user.role !== "admin") return res.status(400).send("Not authorized");
  try {
    let userList = await userDb.find();
    for (let i = 0; i < userList.length; i++) {
      const name = logger.find(
        (e) => String(e._id) === userList[i].associateLogger
      );
      let namee = "";
      if (name) namee = name.milsName;
      data.push({
        _id: userList[i]._id,
        email: userList[i].email,
        name: userList[i].name,
        password: userList[i].password,
        role: userList[i].role,
        associateLogger: userList[i].associateLogger,
        nameMils: namee,
      });
    }
    res.send(data);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

module.exports = router;
