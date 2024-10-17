import express from "express";
import cors from "cors";
import router from './routes/api.js';
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import hpp from "hpp";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";
import { DATABASE, MAX_JSON_SIZE, PORT, REQUEST_NUMBER, REQUEST_TIME, URL_ENCODE, WEB_CACHE } from "./app/config/config.js";


const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);




const app = express();




// App use default middleware
app.use(cors());
app.use(express.json({limit: MAX_JSON_SIZE}));
app.use(express.urlencoded({extended: URL_ENCODE}));
app.use(helmet());
app.use(hpp());

// Rate limiter middleware
const limiter = rateLimit({windowMs: REQUEST_TIME, max: REQUEST_NUMBER})
app.use(limiter);

//caching middleware
app.set('etag', WEB_CACHE);



//Database Connection
mongoose.connect(DATABASE, {autoIndex:true}).then(()=> {
    console.log('Connected to the database');
}).catch(() =>{
    console.log('Error connecting to the database');
})


app.use("/api", router);


app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});



