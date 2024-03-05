require("dotenv").config();
const jwt = require("jsonwebtoken");

const ResponseData = (success, message, error, data) => ({
    success,
    message: error ? error.message : message,
    errors: error || null,
    data,
});

const GenerateToken = (data) => {
    const token = jwt.sign(data, process.env.APP_SECRET, { expiresIn: "1h" });

    return token;
};

const ExtractToken = (token) => {
    try {
        const decodedToken = jwt.verify(token, process.env.APP_SECRET);
        return decodedToken;
    } catch (error) {
        console.error("Token verification failed:", error.message);
        return null;
    }
};

export default { ResponseData, ExtractToken, GenerateToken };
