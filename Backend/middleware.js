const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    try {
        if (!authHeader || authHeader.startsWith("bearer")) {
            return res.status(404).json({
                message: "Invalid token"
            })
        }
        const token = authHeader.split(' ')[1];

        const decoded = jwt.verify(token, JWT_SECRET);

        req.userId = decoded.userId;

        next();

    } catch (error) {
        res.status(403).json({
            message: "Something went wrong"
        });
    }
}

module.exports = authMiddleware;