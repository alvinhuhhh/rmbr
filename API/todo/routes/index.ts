import { Router } from "express";

import UserController from "../controllers/user.controller";

const router = Router();

router.get("/user/:email", UserController.GetUserByEmail);
router.post("/user/create", UserController.CreateUser);
router.put("/user/:email", UserController.UpdateUser);

export default router;
