import React from "react";

const Index = () => {
  return <div>Index</div>;
};

export default Index;

// import { Webhook } from "svix";
// import { buffer } from "micro";

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// const secret = "whsec_MfKQ9r8GKYqrTwjUPD8ILPZIo2LaLaSw";

// export default async function handler(req, res) {
//   const payload = (await buffer(req)).toString();
//   const headers = req.headers;

//   const wh = new Webhook(secret);
//   let msg;
//   try {
//     msg = wh.verify(payload, headers);
//   } catch (err) {
//     res.status(400).json({});
//   }

//   // Do something with the message...

//   res.json({});
// }
