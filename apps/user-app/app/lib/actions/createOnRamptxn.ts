'use server';

import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";

export async function createOnRampTxn(amount: number, provider: string) {
    const session = await getServerSession(authOptions);
    const token = Math.random().toString() // simulating a bank token received from their api here
    const userId = session.user.id;
    if(!userId){
        return{
            message: "Not logged in."
        }
    }

    await prisma.onRampTransaction.create({
        data: {
            userId: Number(userId),
            amount: amount,
            status: "Processing",
            provider,
            token: token,
            startTime: new Date()
        }
    })
}