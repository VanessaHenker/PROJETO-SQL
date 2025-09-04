import { Router } from "express";
import { getUsers } from "../conexaoSQL.js";

const router = Router();

router.get("/", getUsers);

export default router;
