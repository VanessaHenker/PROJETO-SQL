import { Router, Request, Response } from "express";
import {getUsers} from "../conexaoSQL"; 

const router = Router();

router.get("/", getUsers);

export default router;
