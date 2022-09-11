import { Request, Response } from "express";
import { IWifiData } from "../types/wifiType";
import * as wifiService from "../services/wifiService"
import { number } from "joi";

export async function createWifi(req: Request, res: Response){
    const userId = res.locals.session
    const wifi: IWifiData = req.body
    await wifiService.creatingWifi(Number(userId), wifi)
    return res.status(200).send("wifi create with successfull")
}

export async function oneWifi(req: Request, res: Response){
    const userId = res.locals.session
    const {id: wifiId} = req.params
    const wifi = await wifiService.getOneWifi(Number(userId), Number(wifiId))
    return res.status(200).send(wifi)
}

export async function everyWifi(req: Request, res: Response){
    const userId = res.locals.session
   const wifi = await wifiService.getEveryWifi(userId)
   return res.status(200). send(wifi)
    
}

export async function deleteWifi(req: Request, res: Response){
    console.log("tá aqui")
    const userId = res.locals.session
    const {id: wifiId} = req.params
    if(!wifiId) {
        return res.status(422).send("wifi Id is not provide")
    }
    await wifiService.deletewifi(Number(userId), Number(wifiId))
    return res.status(200).send("wifi delete")
}