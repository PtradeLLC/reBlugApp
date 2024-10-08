var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function () { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function (v) { resolve({ value: v, done: d }); }, reject); }
};
import { createParser, } from "eventsource-parser";
export function OpenAIStream(payload) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var encoder, decoder, counter, requestHeaders, res, stream;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    encoder = new TextEncoder();
                    decoder = new TextDecoder();
                    counter = 0;
                    requestHeaders = {
                        "Content-Type": "application/json",
                        Authorization: "Bearer ".concat((_a = process.env.OPENAI_API_KEY) !== null && _a !== void 0 ? _a : ""),
                    };
                    if (process.env.OPENAI_API_ORG) {
                        requestHeaders["OpenAI-Organization"] = process.env.OPENAI_API_ORG;
                    }
                    return [4 /*yield*/, fetch("https://api.openai.com/v1/chat/completions", {
                        headers: requestHeaders,
                        method: "POST",
                        body: JSON.stringify(payload),
                    })];
                case 1:
                    res = _b.sent();
                    stream = new ReadableStream({
                        start: function (controller) {
                            var _a, e_1, _b, _c;
                            return __awaiter(this, void 0, void 0, function () {
                                // callback
                                function onParse(event) {
                                    var _a;
                                    if (event.type === "event") {
                                        var data = event.data;
                                        // https://beta.openai.com/docs/api-reference/completions/create#completions/create-stream
                                        if (data === "[DONE]") {
                                            controller.close();
                                            return;
                                        }
                                        try {
                                            var json = JSON.parse(data);
                                            var text = ((_a = json.choices[0].delta) === null || _a === void 0 ? void 0 : _a.content) || "";
                                            if (counter < 2 && (text.match(/\n/) || []).length) {
                                                // this is a prefix character (i.e., "\n\n"), do nothing
                                                return;
                                            }
                                            var queue = encoder.encode(text);
                                            controller.enqueue(queue);
                                            counter++;
                                        }
                                        catch (e) {
                                            // maybe parse error
                                            controller.error(e);
                                        }
                                    }
                                }
                                var parser, _d, _e, _f, chunk, e_1_1;
                                return __generator(this, function (_g) {
                                    switch (_g.label) {
                                        case 0:
                                            parser = createParser(onParse);
                                            _g.label = 1;
                                        case 1:
                                            _g.trys.push([1, 6, 7, 12]);
                                            _d = true, _e = __asyncValues(res.body);
                                            _g.label = 2;
                                        case 2: return [4 /*yield*/, _e.next()];
                                        case 3:
                                            if (!(_f = _g.sent(), _a = _f.done, !_a)) return [3 /*break*/, 5];
                                            _c = _f.value;
                                            _d = false;
                                            chunk = _c;
                                            parser.feed(decoder.decode(chunk));
                                            _g.label = 4;
                                        case 4:
                                            _d = true;
                                            return [3 /*break*/, 2];
                                        case 5: return [3 /*break*/, 12];
                                        case 6:
                                            e_1_1 = _g.sent();
                                            e_1 = { error: e_1_1 };
                                            return [3 /*break*/, 12];
                                        case 7:
                                            _g.trys.push([7, , 10, 11]);
                                            if (!(!_d && !_a && (_b = _e.return))) return [3 /*break*/, 9];
                                            return [4 /*yield*/, _b.call(_e)];
                                        case 8:
                                            _g.sent();
                                            _g.label = 9;
                                        case 9: return [3 /*break*/, 11];
                                        case 10:
                                            if (e_1) throw e_1.error;
                                            return [7 /*endfinally*/];
                                        case 11: return [7 /*endfinally*/];
                                        case 12: return [2 /*return*/];
                                    }
                                });
                            });
                        },
                    });
                    return [2 /*return*/, stream];
            }
        });
    });
}
