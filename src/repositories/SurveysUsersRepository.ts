import { EntityRepository, Repository } from "typeorm";
import { SurveyUser } from "../models/Survey_User";

@EntityRepository(SurveyUser)
class SurveysUserRepository extends Repository<SurveyUser> {

}

export { SurveysUserRepository };