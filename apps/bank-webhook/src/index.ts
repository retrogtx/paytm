import express from "express";
import db from "@repo/db/client";

const app = express();

app.post('/', async (req, res) => {
    const paymentInformation = {
        amount: req.body.amount,
        token: req.body.token,
        userId: req.body.userId
    }

    await db.balance.update({
        where: {
            userId: paymentInformation.userId
        },
        data: {
            amount: {
                increment: paymentInformation.amount 
            }
        }
    })

    res.status(200).json({
        message: "Success"
    })

    await db.onRampTransaction.update({
        where: {
            token: paymentInformation.token
        },
        data: {
            status: "Success"
        }
    })
})
