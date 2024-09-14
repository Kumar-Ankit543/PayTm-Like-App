const express = require("express");
const zod = require("zod");
const jwt = require("jsonwebtoken");
const { User } = require("../db");
const JWT_SECRET = require("../config");

const userRouter = express.Router();

const userSignUp = zod.object({
  firstName: zod.string().max(50),
  lastName: zod.string().max(50),
  username: zod.string().email(),
  password: zod.string().min(6),
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

module.exports = userRouter;
