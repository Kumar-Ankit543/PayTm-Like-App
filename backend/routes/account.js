const express = require("express");
const mongoose = require("mongoose");
const { authMiddleware } = require("../middleware");
const { Account, User } = require("../db");

const accountRouter = express.Router();

accountRouter.get("/balance", authMiddleware, async (req, res) => {
  const account = await Account.findOne({
    userID: req.userID,
  });

  res.status(200).json({
    balance: account.balance,
  });
});

accountRouter.post("/transfer", authMiddleware, async (req, res) => {
  try {
    const session = await mongoose.startSession();
    session.startTransaction();

    const { amount, toEmail } = req.body;

    const account = await Account.findOne({ userID: req.userID }).session(
      session
    );

    if (!account || account.balance < amount) {
      await session.abortTransaction();
      return res.status(400).json({
        msg: "Insufficient balance",
      });
    }

    const receiver = await User.findOne({ username: toEmail }).session(session);
    const toAccount = await Account.findOne({ userID: receiver._id }).session(
      session
    );

    if (!toAccount) {
      await session.abortTransaction();
      return res.status(404).json({
        msg: "Invalid account",
      });
    }

    await Account.updateOne(
      { userID: req.userID },
      { $inc: { balance: -amount } }
    ).session(session);
    await Account.updateOne(
      { userID: receiver._id },
      { $inc: { balance: amount } }
    ).session(session);

    await session.commitTransaction();

    res.status(200).json({
      msg: "Transaction successful",
    });
  } catch (error) {
    await session.abortTransaction();
    return res.status(404).json({
      msg: "Something went wrong",
    });
  }
});

module.exports = accountRouter;
