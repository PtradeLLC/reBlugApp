app.use((req, res, next) => {
    if (!req.user) {
        return next();
    }

    const paragonToken = res.locals.paragonToken;
    // Use the paragonToken as needed (e.g., pass it to the client, include it in headers, etc.)

    next();
});
