import { Webhook } from "svix";
import { buffer } from "micro";

export const config = {
  api: {
    bodyParser: false,
  },
};

// const secret = "whsec_MfKQ9r8GKYqrTwjUPD8ILPZIo2LaLaSw";
const webhookSecret = process.env.WEBHOOK_SECRET || "";

export default async function handler(req, res) {
  const payload = (await buffer(req)).toString();
  const headers = req.headers;

  const wh = new Webhook(webhookSecret);
  let msg;
  const heads = {
    "svix-id": "msg_p5jXN8AQM9LWM0D4loKWxJek",
    "svix-timestamp": "1614265330",
    "svix-signature": "v1,g0hM9SsE+OTPJTGt/tmIKtSyZlE3uFJELVlNIOLJ1OE=",
  };

  try {
    msg = wh.verify(payload, heads);

    console.log(msg);
  } catch (err) {
    res.status(400).json({});
  }

  // Do something with the message...

  res.json({});
}
