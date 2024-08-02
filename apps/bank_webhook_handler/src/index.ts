import express from "express";
import db from "../../../packages/db";
import { z } from 'zod';

const app = express();
console.log('Starting webhook handler...');

app.use((req, res, next) => {
  let data = '';
  req.on('data', chunk => {
    data += chunk;
  });
  req.on('end', () => {
    console.log('Raw request body:', data);
    try {
      req.body = JSON.parse(data);
    } catch (e) {
      console.error('Failed to parse JSON:', e);
    }
    next();
  });
});

app.post("/hdfcWebhook", async (req, res) => {
  const paymentInformation: {
    token: string;
    userId: string;
    amount: string
  } = {
    token: req.body.token,
    userId: req.body.user_identifier,
    amount: req.body.amount
  };

  // const paymentInformation = paymentSchema.parse(req.body);

  console.log('Processed payment information:', paymentInformation);

  try {
    await db.$transaction([
      db.balance.updateMany({
        where: {
          userId: Number(paymentInformation.userId)
        },
        data: {
          amount: {
            increment: Number(paymentInformation.amount)
          }
        }
      }),
      db.onRampTransaction.updateMany({
        where: {
          token: paymentInformation.token
        },
        data: {
          status: "Success",
        }
      })
    ]);

    console.log('Transaction completed successfully');

    res.json({
      message: "Captured"
    })
  } catch (e) {
    console.error('Error processing webhook:', e);
    if (e instanceof z.ZodError) {
      res.status(400).json({
        message: "Invalid input data",
        errors: e.errors
      });
    } else {
      res.status(500).json({
        message: "Error while processing webhook"
      });
    }
  }
});

app.listen(3003, () => {
  console.log('Webhook handler listening on port 3003');
});

// Error handling
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

// import express from "express";
// import db from "C:/Users/Asus/Downloads/Paytm CLone/paytmplease/packages/db";

// const app = express();

// // Log raw request body
// app.use((req, res, next) => {
//     let data = '';
//     req.on('data', chunk => {
//         data += chunk;
//     });
//     req.on('end', () => {
//         console.log('Raw request body:', data);
//         try {
//             req.body = JSON.parse(data);
//         } catch (e) {
//             console.error('Failed to parse JSON:', e);
//         }
//         next();
//     });
// });

// // Remove this line as we're manually parsing the body now
// // app.use(express.json());

// app.post("/hdfcWebhook", async (req, res) => {
//     console.log("Headers:", req.headers);
//     console.log("Received webhook payload:", req.body);
//     // Check if the required fields exist in the request body
//     if (!req.body.hasOwnProperty('token') || 
//         !req.body.hasOwnProperty('user_identifier') || 
//         !req.body.hasOwnProperty('amount')) {
//         return res.status(400).json({
//             message: "Missing required fields in the request body",
//             receivedBody: req.body
//         });
//     }

// const paymentInformation = {
//     token: req.body.token,
//     id: req.body.user_identifier,
//     amount: req.body.amount
// };

//     console.log("Parsed payment information:", paymentInformation);

//     try {
//         const id = Number(paymentInformation.id);
//         const amount = parseFloat(paymentInformation.amount);

//         console.log("Parsed id:", id, "Parsed amount:", amount);

//         // Validate parsed values
//         if (isNaN(id)) {
//             throw new Error(`Invalid id: ${paymentInformation.id}`);
//         }
//         if (isNaN(amount)) {
//             throw new Error(`Invalid amount: ${paymentInformation.amount}`);
//         }

//         await db.$transaction([
//             db.balance.updateMany({
//                 where: {
//                     id: id
//                 },
//                 data: {
//                     amount: {
//                         increment: amount
//                     }
//                 }
//             }),
//             db.onRampTransaction.updateMany({
//                 where: {
//                     token: paymentInformation.token
//                 }, 
//                 data: {
//                     status: "Success",
//                 }
//             })
//         ]);

//         res.json({
//             message: "Captured"
//         });
//     } catch(e) {
//         console.error("Error processing webhook:", e);
//         res.status(400).json({
//             message: "Error while processing webhook",
//             //@ts-ignore
//             error: e.message,
//             receivedPayload: paymentInformation
//         });
//     }
// });

// app.listen(3003, () => {
//     console.log("Server is running on port 3003");
// });
