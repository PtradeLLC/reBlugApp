import { UnstructuredClient } from "unstructured-client";
import { PartitionResponse } from "unstructured-client/dist/sdk/models/operations";
import * as fs from "fs";

const key = "YOUR-API-KEY";

const client = new UnstructuredClient({
    security: {
        apiKeyAuth: key,
    },
});

const filename = "sample-docs/layout-parser-paper.pdf";
const data = fs.readFileSync(filename);

client.general.partition({
    // Note that this currently only supports a single file
    files: {
        content: data,
        fileName: filename,
    },
    // Other partition params
    strategy: "fast",
}).then((res) => {
    if (res.statusCode == 200) {
        console.log(res.elements);
    }
}).catch((e) => {
    console.log(e.statusCode);
    console.log(e.body);
});