import { sign } from 'jsonwebtoken';

export function generateParagonToken(userId) {
    // JWT NumericDates specified in seconds:
    const currentTime = Math.floor(Date.now() / 1000);
    return sign(
        {
            sub: userId,  // Your user's or their company's ID
            iat: currentTime,
            exp: currentTime + (60 * 60), // 1 hour from now
        },
        process.env.PARAGON_SIGNING_KEY,
        {
            algorithm: "RS256",
        }
    );
}


export default {
    generateParagonToken,
};
