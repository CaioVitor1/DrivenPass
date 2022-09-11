import { Request, Response } from "express";
import * as cardServices from "../services/cardsService"
import { ICardData } from "../types/cardType";

export async function createCard(req: Request, res: Response){
    const card: ICardData = req.body
    const userId = res.locals.session
    await cardServices.creatingCard(card, Number(userId))
   return res.status(201).send("Card create with successfull")
}

export async function oneCard(req: Request, res: Response){
    const userId = res.locals.session
    const {id: cardId} = req.params
    if(!cardId) {
        return res.status(422).send("card Id is not provide")
    }
    const card = await cardServices.getOneCard(Number(userId), Number(cardId))
    return res.status(200).send(card)

}

export async function everyCard(req: Request, res: Response){
    const userId = res.locals.session
    const cards = await cardServices.getEveryCard(userId)
    return res.status(200).send(cards)
}

export async function deleteCard(req: Request, res: Response){
    const userId = res.locals.session
    const {id: cardId} = req.params
    if(!cardId) {
        return res.status(422).send("card Id is not provide")
    }
    await cardServices.deletingCard(Number(userId), Number(cardId))
    return res.status(204).send("card delete with successful")
}