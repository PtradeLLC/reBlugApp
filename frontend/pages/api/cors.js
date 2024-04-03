// cors.js
export function corsMiddleware(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'https://www.reblug.com');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
    } else {
        next(); // Call the next middleware function or route handler
    }
}
