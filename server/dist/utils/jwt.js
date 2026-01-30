import jwt from "jsonwebtoken";
export const generateToken = (payload) => {
    const signInOptions = {
        expiresIn: (process.env.JWT_EXPIRE || "7d"),
    };
    return jwt.sign(payload, process.env.JWT_SECRET, signInOptions);
};
export const verifyToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
};
