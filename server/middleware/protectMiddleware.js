import jwt from 'jsonwebtoken'

export const protect = (req, res, next)=>{
    try {
        const token = req.cookies.token

        if(!token){
            return res.json({
                success: false,
                message: "Invalid token"
            })
        }

        const decode = jwt.verify(token, process.env.JWT_SECRET_KEY)

        if(!decode){
        return res.json({
                success: false,
                message: "unauthorised Access"
            }) 
        }

        req.userId = decoded.id
        next()
    } catch (error) {
        next(error)
    }
}