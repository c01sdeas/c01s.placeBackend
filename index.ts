import app from './server.js';
import dotenv from 'dotenv';
dotenv.config();

app.listen(process.env.PORT, (e)=>{
    if (e) {
        console.log(e);
    } else {
        console.log('server success. port:'+process.env.PORT);
    }
});