const express = require("express");
const { User, Account } = require("../db");
const authMiddleware = require("../middleware");
const { default: mongoose } = require("mongoose");

const router = express.Router();

router.get("/balance", authMiddleware, async (req, res) => {
    try {
        const account = await Account.findOne({
            userId: req.userId
        })

        res.status(200).json({
            balance: account.balance
        })
    } catch (error) {
        return res.status(405).json({
            message: "Something went wrong"
        })
    }
})


router.post("/transfer", authMiddleware, async (req, res) => {
    const session = await mongoose.startSession();

    try {
        session.startTransaction();
        const { amount, to } = req.body;
        const account = await Account.findOne({ userId: req.userId }).session(session);

        if (!account || account.balance < amount) {
            await session.abortTransaction();

            return res.status(400).json({
                message: "Insufficient balance"
            });
        }
        const toAccount = await Account.findOne({ userId: to }).session(session);

        if (!toAccount) {
            await session.abortTransaction();

            return res.status(400).json({
                message: "Invalid Account"
            });
        }

        //performing transaction
        await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } }).session(session);
        await Account.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);

        await session.commitTransaction();

        res.json({
            message: "Transfer successful"
        })

    } catch (error) {
        await session.abortTransaction();
        return res.status(405).json({
            message: "Something went wrong"
        })
    }
})

module.exports = router;