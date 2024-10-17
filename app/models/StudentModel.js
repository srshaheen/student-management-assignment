import mongoose from "mongoose";


const StudentSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    otp:{
        type: Number,
        default: 0
    }
},{
    timestamps: true,
    versionKey: false
})

const Student = mongoose.model('students', StudentSchema);
export default Student;