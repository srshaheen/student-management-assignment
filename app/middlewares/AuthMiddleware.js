import { TokenDecode } from "../utility/tokenUtility.js";

export  default (req, res, next) => {

    let token = req.headers['token'];

    let decodedToken = TokenDecode(token)

    if(decodedToken === null){
        res.status(401).json({status: 'fail', message: 'Unauthorized token'})
    }
    else{
        let email = decodedToken.email;
        let student_id = decodedToken.student_id;
        req.headers.email = email;
        req.headers.student_id = student_id;
        next();
    }
    
}