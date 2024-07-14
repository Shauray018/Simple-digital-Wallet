"use server";
// import prisma from "../../../../../packages/db";
import prisma from "@repo/db/client";
import { AddMoney } from "../../../components/Addmoneycard";
import { BalanceCard } from "../../../components/BalanceCard";
import { OnRampTransactions } from "../../../components/OnRampTransaction";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";

async function getBalance() {
    const session = await getServerSession(authOptions);
    const balance = await prisma.balance.findFirst({
        where: {
            userId: Number(session?.user?.id)
        }
    });
    return {
        amount: balance?.amount || 0,
        locked: balance?.locked || 0
    }
}


async function getOnRampTransactions() {
    const session = await getServerSession(authOptions);
    const txns = await prisma.onRampTransaction.findMany({
        where: {
            userId: Number(session?.user?.id)
        }
    });
    return txns.map(t => ({
        time: t.startTime,
        amount: t.amount,
        status: t.status,
        provider: t.provider
    }))
}

export default async function() {
    const balance = await getBalance();
    const transactions = await getOnRampTransactions();

    return <div className="w-screen">
        <div className="text-4xl text-[#0ea5e9] pt-8 mb-8 font-bold">
            Transfer
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4">
            <div>
                <AddMoney />
            </div>
            <div>
                <BalanceCard amount={balance.amount} locked={balance.locked} />
                <div className="pt-4">
                    <OnRampTransactions transactions={transactions} />
                </div>
            </div>
        </div>
    </div>
}


// import React, { useState, ChangeEvent } from "react";
// import { Balance } from "@prisma/client";
// import { Button } from "@repo/ui/button";
// import prisma from "../../../../../packages/db";
// import { getServerSession } from "next-auth";
// import { authOptions } from "../../lib/auth";

// // Fetch balance data on the server side
// async function getBalance() {
//   const session = await getServerSession(authOptions);
//   const balance = await prisma.balance.findFirst({
//     where: {
//       userId: Number(session?.user?.id),
//     },
//   });
//   return {
//     amount: balance?.amount || 0,
//     locked: balance?.locked || 0,
//   };
// }

// const onChangeHandler = (e: ChangeEvent<HTMLInputElement>, setValue: React.Dispatch<React.SetStateAction<string>>) => {
//   const val = e.target.value;
//   setValue(val);
// };

// function LabelPlusInput({ onChange, label, ph }: { onChange: (e: ChangeEvent<HTMLInputElement>) => void; label: string; ph: string }) {
//   return (
//     <div className="flex flex-col mx-auto">
//       <div className="text-l pt-3">{label}</div>
//       <div className="pt-3 pl-2">
//         <input className="w-96 rounded border p-2" placeholder={ph} onChange={onChange}></input>
//       </div>
//     </div>
//   );
// }

// function Transfer() {
//   const [amount, setAmount] = useState("");
//   const [bank, setBank] = useState("");
//   const [balance, setBalance] = useState<{ amount: number; locked: number }>({ amount: 0, locked: 0 });

//   // Fetch balance data when component mounts
//   React.useEffect(() => {
//     async function fetchBalance() {
//       const balance = await getBalance();
//       setBalance(balance);
//     }
//     fetchBalance();
//   }, []);

//   const onClickHandler = () => {
//     console.log("Add money clicked", { amount, bank });
//     // Implement the functionality to add money here
//   };

//   return (
//     <div className="flex justify-start flex-col">
//       <div className="text-4xl text-violet-500 font-bold p-6">Transfer</div>
//       <div className="flex justify-start gap-10">
//         <div className="flex flex-col bg-slate-100 px-6 py-4 rounded mx-auto border border-slate-300">
//           <div className="text-2xl font-semibold border-b border-slate-300 pb-2">Add Money</div>
//           <LabelPlusInput onChange={(e) => onChangeHandler(e, setAmount)} label="Amount" ph="Amount" />
//           <LabelPlusInput onChange={(e) => onChangeHandler(e, setBank)} label="Bank" ph="HDFC" />
//           <div className="flex justify-center pt-5">
//             <Button onClick={onClickHandler}>Add money</Button>
//           </div>
//         </div>
//         <div className="flex flex-col justify-start">
//           <div className="flex flex-col bg-slate-100 px-6 py-4 rounded mx-auto w-96">
//             <div className="text-2xl font-semibold border-b border-slate-300 pb-2">Balance</div>
//             <div className="flex justify-between border-b border-slate-300">
//               <div className="text-xl font-semibold pb-2">Unlocked balance</div>
//               <div>{balance.amount / 100} INR</div>
//             </div>
//             <div className="flex justify-between border-b border-slate-300">
//               <div className="text-xl font-semibold pb-2">Total Locked Balance</div>
//               <div>{balance.locked / 100} INR</div>
//             </div>
//             <div className="flex justify-between border-b border-slate-300">
//               <div className="text-xl font-semibold pb-2">Total Balance</div>
//               <div>{(balance.locked + balance.amount) / 100} INR</div>
//             </div>
//           </div>
//           <div className="flex flex-col bg-slate-100 px-6 py-4 rounded mx-auto">
//             <div className="text-2xl font-semibold border-b border-slate-300 pb-2">Recent Transactions</div>
//             <div className="flex justify-center pt-5">
//               <Button onClick={onClickHandler}>Add money</Button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Transfer;
// import prisma from "@repo/db/client";

// async function getBalance(): Promise<Balance | null> {
//     const session = await getServerSession(authOptions);
    
//     if (!session?.user?.id) {
//         throw new Error("User ID not found in session");
//     }
    
//     const userId = parseInt(session.user.id);
    
//     if (isNaN(userId)) {
//         throw new Error("Invalid user ID");
//     }
    
//     const balance = await prisma.balance.findUnique({
//         where: {
//             userId: userId
//         }
//     });

//     return balance; // This can be null if no balance is found
// }
// const balance = await getBalance();

// if (balance === null) {
//     console.log("No balance found for this user");
//     // Handle the case where no balance exists
// } else {
//     console.log(`User balance: ${balance.amount}`);
//     // Use balance.amount, balance.locked, etc.
// }
