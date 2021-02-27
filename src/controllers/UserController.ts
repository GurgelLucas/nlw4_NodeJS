import {request, Request, Response} from "express";
import { getCustomRepository } from "typeorm";
import UserRepository from "../repositories/UserRepository";

import * as Yup from 'yup';
import { validate } from "uuid";

class UserController {
    async create(req: Request,res: Response) {
        const { name, email } = req.body;
        
        const schema = Yup.object().shape({
            name: Yup.string().required() ,
            email: Yup.string().email().required()
        });

        try{
            await schema.validate(req.body, );
        }catch(err) {
            return res.status(400).json(err);
        }

        const userRepository = getCustomRepository(UserRepository);

        const userAlreadyExists = await userRepository.findOne({
            email
        });

        if (userAlreadyExists) {
            return res.status(400).json({
                error: "User already exists!"
            });
        }

        const user = userRepository.create({
            name, email
        });

        await userRepository.save(user);

        return res.status(201).json(user);
    }

    async list(req: Request,res: Response) {
        return null;
    }

    async update(req: Request,res: Response) {
        return null;
    }

    async delete(req: Request,res: Response) {
        return null;
    }
}

export default UserController;