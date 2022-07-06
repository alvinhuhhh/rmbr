import { Router } from "express";

import UserController from "../controllers/user.controller";

const router = Router();

// GET
router.get("/user/:id", UserController.GetUserById);

export default router;
