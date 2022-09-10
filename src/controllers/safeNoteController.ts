import { Request, Response } from "express";
import { ISafeNoteData } from "../types/safeNoteType";
import * as safeNoteServices from "../services/safeNoteService"

export async function createSafeNotes(req: Request, res: Response){
    const safeNote: ISafeNoteData = req.body
    const userId = res.locals.session
    await safeNoteServices.creatingSafeNote(safeNote, Number(userId))
   return res.status(200).send("Safe Note create with successfull")
}

export async function oneSafeNote(req: Request, res: Response){
    const userId = res.locals.session
    const {id: safeNoteId} = req.params
    const safeNote = await safeNoteServices.getOneNote(userId, Number(safeNoteId))
    return res.status(200).send(safeNote)
}

export async function everySafeNote(req: Request, res: Response){
    const userId = res.locals.session
    const safeNotes = await safeNoteServices.getEveryNote(Number(userId))
    return res.status(200).send(safeNotes)
}

export async function deleteSafeNote(req: Request, res: Response){
    const userId = res.locals.session
    const {id: safeNoteId} = req.params
    if(!safeNoteId) {
        return res.status(422).send("note Id is not provide")
    }
    await safeNoteServices.deleteNote(Number(safeNoteId), Number(userId))
    return res.status(200).send("Note delete")
}