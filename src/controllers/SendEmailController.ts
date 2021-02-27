import { resolve } from "path"
import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import SurveyRepository from "../repositories/SurveyRepository";
import { SurveysUserRepository } from "../repositories/SurveysUsersRepository";
import UserRepository from "../repositories/UserRepository";
import SendMailServices from "../services/SendMailServices";
import { AppError } from "../errors/AppError";

class SendEmailController {

    async execute(req: Request, res: Response) {
        const { email, survey_id } = req.body;

        const userRepository = getCustomRepository(UserRepository);
        const surveyRepository = getCustomRepository(SurveyRepository);
        const surveyUserRepository = getCustomRepository(SurveysUserRepository);

        const user = await userRepository.findOne({ email });

        if(!user) {
            throw new AppError("user does not exists");
        }

        const survey = await surveyRepository.findOne({
            id: survey_id,
        });

        if(!survey) {
            throw new AppError("survey does not exists");
        }

        const surveyUserAlreadyExists = await surveyUserRepository.findOne({
            where: [{user_id: user.id, value: null}]
        })

        const npsPath = resolve(__dirname, "..","views","emails","npsMail.hbs");

        const variables = {
            name: user.name, 
            title: survey.title, 
            description: survey.description,
            id: "",
            link: process.env.URL_MAIL,
        }

        if (surveyUserAlreadyExists) {
            variables.id = surveyUserAlreadyExists.id;
            await SendMailServices.execute(email, variables.title, variables, npsPath);
            return res.json(surveyUserAlreadyExists);
        }

        // Save info in table
        
        const surveyUser = surveyUserRepository.create({
            user_id: user.id,
            survey_id,
        });

        await surveyUserRepository.save(surveyUser);
        variables.id = surveyUser.id;

        // Send e-mail to user

        await SendMailServices.execute(email, variables.title, variables, npsPath);

        return res.json(surveyUser);
    }
}

export {SendEmailController};