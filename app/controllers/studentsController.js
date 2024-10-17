import Student from "../models/StudentModel.js";
import { TokenEncode } from "../utility/tokenUtility.js";



export const Registration = async (req, res) => {

   try {
        let reqBody = req.body;
        await Student.create(reqBody);
        return res.json({status: 'success', "message": "User created successfully"});
   } catch (error) {
        return res.json(error.message);
   }
}




export const Login = async (req, res) => {

    try {
        let reqBody = req.body;
        let data = await Student.findOne(reqBody);

        if(data==null) {
            return res.json({status: 'fail', "message": "Student not found"});
        }else{
            let token = TokenEncode(data['email'], data['_id']);
            return res.json({status: 'success', "message": "Login successful", data: {token: token}});
        }
    } catch (error) {
        return res.json(error.message);
    }

}

export const ProfileDetails = async (req, res) => {

    try {
        let student_id = req.headers['student_id'];

        let data = await Student.findOne({"_id":student_id})
        return res.json({status: "success", message: "User Profile successfully Showed", data: data});
    } catch (error) {
        return res.json({status: "fail", "message": error.toString()});
    }
   
}



export const  ProfileUpdate = async (req, res) => {
    try {
        let reqBody = req.body;
        let student_id = req.headers['student_id'];
        await Student.updateOne({"_id": student_id}, reqBody);
        return res.json({status: 'success', "message": "User updated successfully"});
   } catch (error) {
        return res.json(error.message);
   }
}

