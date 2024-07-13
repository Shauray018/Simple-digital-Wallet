"use server";
import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";

export async function createOnRampTransaction(provider: string, amount: number) {
    // Ideally the token should come from the banking provider (hdfc/axis)
    const session = await getServerSession(authOptions);
    if (!session?.user || !session.user?.id) {
        return {
            message: "Unauthenticated request"
        }
    }
    const token = (Math.random() * 1000).toString();
    await prisma.onRampTransaction.create({
        data: {
            provider,
            status: "Processing",
            startTime: new Date(),
            token: token,
            userId: Number(session?.user?.id),
            amount: amount * 100
        }
    });
    console.log("done")
    return {
        message: "Done"
    }
    
}


// const bob = await prisma.user.upsert({
//     where: { number: '2222222222' },
//     update: {},
//     create: {
//       number: '2222222222',
//       password: await bcrypt.hash('bob', 10),
//       name: 'bob',
//        //@ts-ignore
//       Balance: {
//         create: {
//             amount: 2000,
//             locked: 0
//         }
//       },
//       onRampTransaction: {
//         create: {
//           startTime: new Date(),
//           status: "Failure",
//           amount: 2000,
//           token: "token__2",
//           provider: "HDFC Bank",
//         },
//       },
//     },
//   })
