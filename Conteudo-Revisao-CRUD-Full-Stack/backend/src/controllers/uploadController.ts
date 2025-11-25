import { Request, Response } from "express";
import { cleanOrphanImages } from "../utils/cleanOrphanImages.js";

export const limparImagensOrfas = async (req: Request, res: Response) => {
  try {
    const removidas = await cleanOrphanImages();

    return res.json({
      mensagem: "Limpeza concluída.",
      removidas,
      total_removidas: removidas.length
    });
  } catch (error) {
    console.error("Erro ao limpar imagens órfãs:", error);
    return res.status(500).json({ erro: "Erro ao limpar imagens órfãs." });
  }
};
