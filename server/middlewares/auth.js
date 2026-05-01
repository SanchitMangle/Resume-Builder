import jwt from 'jsonwebtoken'

const protect = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader?.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;
    if (!token) {
        return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decode.userId;
        next()
    } catch (error) {
        return res.status(401).json({ success: false, message: "Unauthorized" });
    }
}

export default protect;