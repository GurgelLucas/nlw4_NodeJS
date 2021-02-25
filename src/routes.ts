import {Router} from "express";
import { SurveyController } from "./controllers/SurveyController";
import UserController from "./controllers/UserController";

const router = Router();

const userController = new UserController();
const surveyController = new SurveyController();

// Routes of creation 
router.post("/users", userController.create);
router.post("/surveys", surveyController.create);

// Routes of lists
router.get("/users", userController.list);
router.get("/surveys", surveyController.show);

router.put("/users/:id", userController.update);

router.delete("users/:id", userController.delete);



export default router;