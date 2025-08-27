import express from "express";
import { getUsers } from "../controllers/user.js"; // note o .js no final

const router = express.Router();

router.get("/", getUsers);

export default router;
