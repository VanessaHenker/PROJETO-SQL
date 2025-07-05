import express from  "express";
import {getUsers} from "../controllers/"

const router = express.Router()

router.get("/", getUsers)

export default router 