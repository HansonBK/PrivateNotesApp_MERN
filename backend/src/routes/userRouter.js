import express from "express";

import {creatUser, deleteUserById, deleteUserByUsername, getUser, getUserById, login, register, updateUser, me} from "../controller/userController.js"
import { requireAuth } from "../middleware/auth.js";

const router = express.Router();



router.post("/register", register);

router.post("/login", login);

router.get("/me", requireAuth , me)

router.get("/user", getUser);



//======================================================
//old Routes
//======================================================
/*
    

    router.get("/user/:userId", getUserById);

    router.post("/user", creatUser);

    router.put("/user/:userId", updateUser);

    router.delete("/user/:userId", deleteUserById);

    router.delete("/user/by-username/:username", deleteUserByUsername);

*/


export default router;