import { JWT_EXPIRE_TIME, JWT_KEY } from "../config/config.js"
import jwt from 'jsonwebtoken'

export const TokenEncode = (email, student_id) => {
    const KEY = JWT_KEY
    const EXPIRE = {expiresIn: JWT_EXPIRE_TIME}
    const PAYLOAD = {email: email, student_id: student_id}
    
    return jwt.sign(PAYLOAD, KEY, EXPIRE)

}




export const TokenDecode = (token) => {
    try {
        return jwt.decode(token)
    } catch (error) {
        return null;
    }
}