import { Deepgram } from "@deepgram/sdk";
import fetch from "cross-fetch";
import { deepgramApiKey, url } from "./config.mjs";
import { deepgramLive } from "./deepgram.mjs";

fetch(url)
    .then((r) => r.body)
    .then((res) => {
        res.on("readable", () => {
            if (deepgramLive.getReadyState() === 1) {
                deepgramLive.send(res.read());
            }
        });
    });

deepgramLive.addListener("close", () => {
    console.log("Connection closed.");
});

deepgramLive.addListener("transcriptReceived", (message) => {
    const data = JSON.parse(message);
    console.dir(data.channel, { depth: null });
    // console.dir(data.channel.alternatives[0].transcript, { depth: null });
});
