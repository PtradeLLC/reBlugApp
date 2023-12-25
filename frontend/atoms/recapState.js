import { atom } from "recoil";

const recapEventState = atom({
    key: "recapEventState",
    default: []
});

export { recapEventState };
