import path from 'path';
import fs from 'fs';
import { __dirname } from "../../app.js";

export const FileUpload = (req, res) => {
    if(!req.file){
        return res.status(400).json({ message: 'No file uploaded' });
    }

    res.send({
        message: 'File uploaded successfully',
        fileName: req.file.originalname,
        path: req.file.path,
    })
}



export const FileRead = async (req, res) => {
    const filePath = path.join(__dirname, 'uploads', req.params.filename);
    
    if(fs.existsSync(filePath)){
        res.sendFile(filePath);
    } else{
        return res.status(404).json({ message: 'File not found' });
    }

}


export const FileDelete = async (req, res) => {
    const filePath = path.join(__dirname, 'uploads', req.params.filename);

    if(fs.existsSync(filePath)){
        fs.unlink(filePath, (err) => {
            if(err) {
                return res.status(500).json({ message: 'Error deleting file' });
            }

            res.send({ message: 'File deleted successfully' });
        })
    } else{
        return res.status(404).json({ message: 'File not found' });
    }
}