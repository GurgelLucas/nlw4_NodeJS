import {Request, Response} from "express";
import { getCustomRepository } from "typeorm";
import UserRepository from "../repositories/UserRepository";

import * as Yup from 'yup';

import { AppError } from "../errors/AppError";

class UserController {
    async create(req: Request,res: Response) {
        const { name, email } = req.body;
        
        const schema = Yup.object().shape({
            name: Yup.string().required() ,
            email: Yup.string().email().required()
        });

        try{
            await schema.validate(req.body);
        }catch(err) {
            return res.status(400).json(err);
        }

        const userRepository = getCustomRepository(UserRepository);

        const userAlreadyExists = await userRepository.findOne({
            email
        });

        if (userAlreadyExists) {
            throw new AppError("User already exists!");
        }

        const user = userRepository.create({
            name, email
        });

        await userRepository.save(user);

        return res.status(201).json(user);
    }
}

export default UserController;