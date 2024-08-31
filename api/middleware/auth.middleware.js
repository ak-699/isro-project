import jwt from "jsonwebtoken";


const authMiddleware = (req, res, next) => {
    console.log("reached auth middleware")
    const token = req.cookies.token;
    if (!token) {
        console.log("no token")
        return res.status(401).json({message: "Token not provided"})
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        console.log(decoded,"hit auth middleware")
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({message:"Invalid token"});
    }
}

export default authMiddleware;