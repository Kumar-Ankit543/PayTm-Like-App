const express = require("express");
const zod = require("zod");
const jwt = require("jsonwebtoken");
const { User, Account } = require("../db");
const JWT_SECRET = require("../config");
const { authMiddleware } = require("../middleware");

const userRouter = express.Router();

const userSignUp = zod.object({
  firstName: zod.string(),
  lastName: zod.string(),
  username: zod.string().email(),
  password: zod.string(),
});

userRouter.post("/signup", async (req, res) => {
  const { success } = userSignUp.safeParse(req.body);
  if (!success) {
    return res.status(411).json({
      msg: "Invalid inputs",
    });
  }

  const existingUser = await User.findOne({ username: req.body.username });
  if (existingUser) {
    return res.status(411).json({
      msg: "Username already exists",
    });
  }

  const user = await User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    username: req.body.username,
    password: req.body.password,
  });

  const userID = user._id;

  await Account.create({
    userID,
    balance: 1 + Math.random() * 10000,
  });

  const token = jwt.sign(
    {
      userID,
    },
    JWT_SECRET
  );

  res.status(200).json({
    token: token,
    msg: "User Created Successfully",
  });
});

const userSignIn = zod.object({
  username: zod.string().email(),
  password: zod.string().min(6),
});

userRouter.post("/signin", async (req, res) => {
  const { success } = userSignIn.safeParse(req.body);
  if (!success) {
    return res.status(411).json({
      msg: "Invalid inputs",
    });
  }

  const user = await User.findOne({
    username: req.body.username,
    password: req.body.password,
  });

  if (!user) {
    return res.status(411).json({
      msg: "username does not exist",
    });
  }

  const userID = user._id;
  req.user = userID;

  const token = jwt.sign(
    {
      userID,
    },
    JWT_SECRET
  );

  res.json({
    token: token,
  });
});

const userUpdate = zod.object({
  firstName: zod.string().optional(),
  lastName: zod.string().optional(),
  password: zod.string().optional(),
});

userRouter.put("/", authMiddleware, async (req, res) => {
  const { success } = userUpdate.safeParse(req.body);

  if (!success) {
    return res.status(411).json({
      msg: "Invalid inputs for update",
    });
  }

  const userId = req.userID;
  const updatedUser = await User.findByIdAndUpdate(userId, {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: req.body.password,
  });

  if (!updatedUser) {
    return res.status(404).json({
      msg: "User not found",
    });
  }

  res.status(200).json({
    msg: "User updated successfully",
  });
});

userRouter.get("/bulk", async (req, res) => {
  const filter = req.query.filter || "";
  const users = await User.find({
    $or: [{ firstName: { $regex: filter } }, { lastName: { $regex: filter } }],
  });

  res.status(200).json({
    user: users.map((user) => ({
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      _id: user._id,
    })),
  });
});

module.exports = userRouter;
