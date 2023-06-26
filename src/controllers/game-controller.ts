import gameService from "@/services/gameService";
import { Request, Response } from "express";
import httpStatus from "http-status";

export async function getAllPowerUps(req: Request, res: Response) {
    try{
        const powerUps = await gameService.getAllPowerUps()

        return res.status(httpStatus.OK).send(powerUps)
    }catch(err){
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err.message)
    }

  }
  