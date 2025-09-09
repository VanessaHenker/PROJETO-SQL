import { Router } from "express";

const router = Router();

router.get("/", (_req, res) => {
  res.send("Listagem de usuários");
});

export default router;
