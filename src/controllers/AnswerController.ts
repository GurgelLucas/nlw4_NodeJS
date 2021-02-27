import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { AppError } from "../errors/AppError";
import { SurveysUserRepository } from "../repositories/SurveysUsersRepository";

class AnswerController {
    async execute(req: Request, res: Response) {
        const { value } = req.params;
        const { u } = req.query;

        const surveyUserRepository = getCustomRepository(SurveysUserRepository);
        
        const surveyUser = await surveyUserRepository.findOne({
            id: String(u),
        });

        if(!surveyUser) {
            throw new AppError("Survey User does not exists!", 400);
        }

        surveyUser.value = Number(value);

        await surveyUserRepository.save(surveyUser);

        return res.json({message: "Obrigado pela sua opinião!", surveyUser});
    }
}

export {AnswerController}