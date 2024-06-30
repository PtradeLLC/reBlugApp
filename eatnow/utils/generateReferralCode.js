// utils/generateReferralCode.js

import crypto from 'crypto';

const generateReferralCode = (email) => {
    return crypto.createHash('md5').update(email + Date.now()).digest('hex').slice(0, 10);
};

export default generateReferralCode;
