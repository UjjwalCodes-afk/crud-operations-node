import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';
export const create = async(req,res) => {
    try {
        const userData = new User(req.body);
        const {email} = userData;
        const userExist = await User.findOne({email});
        if(userExist){
            res.status(400).send({
                success : false,
                message : 'User exist',
            })
        }
        const savedUser = await userData.save();
        res.status(200).send({
            success : true,
            savedUser,
        })
    } catch (error) {
        res.status(500).send({
            success : false,
            message : 'Internal server error'
        })
    }
}


export const fetch = async(req,res) => {
    try {
        const users = await User.find();
        if(users.length === 0){
            return res.status(400).send({
                success : false,
                message : 'Not found',
            })
        }
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({
            error : 'Internal server error'
        })
    }
}
export const update = async(req,res) => {
    try {
        const id = req.params.id;
        const userExist = await User.findOne({_id : id});
        if(!userExist){
            return res.status(400).send({
                succes : false,
                message : 'User not found',
            })
        }
        const updatedUser = await User.findByIdAndUpdate(id,req.body, {new : true});
        res.status(200).send({
            success : true,
            message : 'User updated successfully',
            updatedUser
        })
    } catch (error) {
        res.status(500).json({
            error : 'Internal server error'
        })
    }
}

export const deleteUser = async(req,res) => {
    try {
        const id = req.params.id;
        const userExist = await User.findById({_id : id});
        if(!userExist){
            return res.status(400).send({
                success : false,
                message : 'User not found'
            })
        }
        await User.findByIdAndDelete(id);
        res.status(200).send({
            success : true,
            message : 'User deleted successfully',
        })
    } catch (error) {
        res.status(500).send({
            success : false,
            message : 'Internal server error'
        })
    }
}