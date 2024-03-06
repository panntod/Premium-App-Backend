require("dotenv").config();
const jwt = require("jsonwebtoken");

exports.ResponseData = (success, message, error, data) => ({
  success,
  message: error ? error.message : message,
  errors: error || null,
  data,
});

exports.GenerateToken = (data) => {
  const token = jwt.sign(data, process.env.APP_SECRET, { expiresIn: "1h" });

  return token;
};

exports.ExtractToken = (token) => {
  try {
    const decodedToken = jwt.verify(token, process.env.APP_SECRET);
    return decodedToken;
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return { error: 'Token sudah expired, Harap perbarui token' };
    } else {
      console.error('Token verification failed:', error.message);
      return null;
    }
  }
};
