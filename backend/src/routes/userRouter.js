import express from "express";

import {creatUser, deleteUserById, deleteUserByUsername, getUser, getUserById, updateUser} from "../controller/userController.js"

const router = express.Router();

router.get("/user", getUser);

router.get("/user/:userId", getUserById);

router.post("/user", creatUser);

router.put("/user/:userId", updateUser);

router.delete("/user/:userId", deleteUserById);

router.delete("/user/by-username/:username", deleteUserByUsername);




export default router;