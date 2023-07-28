import express from 'express';
import { register,fetchUser, deleteUser, updateUser } from './User_Controller.js';

const mainRouter=express.Router();



mainRouter.post('/createUsers',register);
mainRouter.get('/getUsers',fetchUser);
mainRouter.delete('/deletes/:userid',deleteUser);
mainRouter.put('/update/:userid',updateUser)

export default mainRouter;