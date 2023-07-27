import express from 'express';
import { register,fetchUser } from './User_Controller.js';

const mainRouter=express.Router();



mainRouter.post('/createUsers',register);
mainRouter.get('/getUsers',fetchUser);

export default mainRouter;