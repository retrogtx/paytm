"use client"; 

import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Center } from "@repo/ui/center";
import { TextInput } from "@repo/ui/textinput";
import { useState, useEffect } from "react";
import prisma from "@repo/db/client"; 

interface Transaction {
    id: number;
    amount: number;
    timestamp: Date;
    fromUserId: number;
    toUserId: number;
}

export function History() {
    const [number, setNumber] = useState("");
    const [amount, setAmount] = useState("");
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    useEffect(() => {
        const fetchTransactions = async () => {
            const response = await prisma.p2pTransfer.findMany({
                where: { /* Add your user filter here */ },
                orderBy: { timestamp: 'desc' },
            });
            setTransactions(response);
        };
        fetchTransactions();
    }, []);

    return (
        <div className="h-[90vh]">
            <Center>
                <Card title="Recent Transactions">
                    <div className="min-w-72 pt-2">
                        {transactions.map((txn) => (
                            <div key={txn.id} className="flex justify-between">
                                <div>
                                    <div className="text-sm">
                                        {txn.fromUserId} sent {txn.amount / 100} INR
                                    </div>
                                    <div className="text-slate-600 text-xs">
                                        {new Date(txn.timestamp).toLocaleString()}
                                    </div>
                                </div>
                            </div>
                        ))}
                        <TextInput placeholder={"Number"} label="Number" onChange={(value) => {
                            setNumber(value);
                        }} />
                        <TextInput placeholder={"Amount"} label="Amount" onChange={(value) => {
                            setAmount(value);
                        }} />
                        <div className="pt-4 flex justify-center">
                            <Button onClick={() => {
                                // Handle send action
                            }}>Send</Button>
                        </div>
                    </div>
                </Card>
            </Center>
        </div>
    );
}