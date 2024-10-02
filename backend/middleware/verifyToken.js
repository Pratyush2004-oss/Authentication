import jwt from 'jsonwebtoken'

export const verifyToken = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(400).json({
            message: "Unauthorized - No Token provided",
            success: false
        })
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(400).json({
                message: "Unauthorized - Invalid Token",
                success: false
            })
        }
        req.userId = decoded.userId;
        next();
    } catch (error) {
        console.log('Error in verify-Token Controller : ' + error.message)
        return res.status(500).json({
            message: "Internal server Error",
            success: false
        })
    }

}