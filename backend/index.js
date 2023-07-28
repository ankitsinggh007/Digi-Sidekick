import express from 'express';
import cors from'cors'
import dotenv from 'dotenv';
import mainRouter from './router.js';
import connectToDB from './ConnectDB.js';

dotenv.config();

const App=express();
App.use(cors())
App.use(express.json());
App.use('/api',mainRouter);







(async()=>{
    try {
        connectToDB(process.env.Mongo_URI);
        App.listen(process.env.PORT,()=>{
            console.log(`server is started on ${process.env.PORT}`);
        })
    } catch (error) {
        console.log(error);
    }
})();