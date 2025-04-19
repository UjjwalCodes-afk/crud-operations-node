import express from 'express';
import { deleteUser, fetch, update } from '../controller/userController.js';
import { create } from '../controller/userController.js';
import authMiddleware from '../middleware/authMiddleware.js';


const route = express.Router();

route.get('/getAllUsers', fetch);


//create a new user
route.post('/create',authMiddleware,create)


//update a user
route.put("/update/:id", update);

//delete a user
route.delete("/delete/:id", deleteUser)


export default route;