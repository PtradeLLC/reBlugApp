import { Apideck } from '@apideck/node';

const apideck = new Apideck({
    apiKey: process.env.AP_DECK_API_KEY,
    appId: process.env.AP_DECK_APP_ID,
    consumerId: process.env.AP_DECK_CONSUMER_ID
});

try {
    const { data } = await apideck.vault.connectionsAll({});
} catch (error) {
    console.error(error)
    return error.json()
}

