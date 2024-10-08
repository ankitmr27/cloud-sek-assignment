// create a new file, for example, extended-request.interface.ts
// Add the following code:

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Request } from 'express';

// Extend the Request interface
declare module 'express' {
  interface Request {
    user?: { userId: string; createdAt: Date }; // You can define the type of the user object as per your requirement
  }
}

// extended-request.d.ts
// import { Request } from 'express';

// declare global {
//   // eslint-disable-next-line @typescript-eslint/no-namespace
//   namespace Express {
//     interface Request {
//       user?: { userId: string; createdAt: Date };
//     }
//   }
// }
