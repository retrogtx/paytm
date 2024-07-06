import express from "express";
import { Router } from "express";
import { User } from "../db";

const zod = require("zod");
const router = Router();

const signupSchema = zod.object({
    username: zod.string(),
    password: zod.string(),
    firstName: zod.string()
})

router.post("signup", (req, res) => {
    const body = req.body;
    const { success } = signupSchema.safeParse(req.body);

    if (!success) {
        return res.json ({
            message: "Email already taken / Incorrect inputs"
        })
    }

    const user = User.findOne({
        username: body.username
    })
})

module.exports = router;