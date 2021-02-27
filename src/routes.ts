import {Router} from "express";
import { AnswerController } from "./controllers/AnswerController";
import { NpsController } from "./controllers/NPSController";
import { SendEmailController } from "./controllers/SendEmailController";
import { SurveyController } from "./controllers/SurveyController";
import UserController from "./controllers/UserController";

const router = Router();

const userController = new UserController();
const surveyController = new SurveyController();
const sendMailController = new SendEmailController();
const answerController = new AnswerController();
const npsController = new NpsController();

// Routes of creation 
router.post("/users", userController.create);
router.post("/surveys", surveyController.create);

router.post("/sendEmail", sendMailController.execute);

// Routes of lists
router.get("/surveys", surveyController.show);

router.get("/answers/:value", answerController.execute)
router.get("/nps/:survey_id", npsController.execute)





export default router;