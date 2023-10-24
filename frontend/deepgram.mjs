// deepgram.mjs
import { Deepgram } from "@deepgram/sdk";

import { deepgramApiKey } from "./config.mjs";

const deepgram = new Deepgram(deepgramApiKey);

const deepgramLive = deepgram.transcription.live({
    smart_format: true,
    interim_results: false,
    language: "en-US",
    model: "nova",
});

export { deepgramLive };
