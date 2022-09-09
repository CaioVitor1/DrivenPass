import { Request, Response } from "express";
import * as credentialService from "../services/credentialsService"

export async function createCredentials(req: Request, res: Response){
    const { title, url,nameUser,passwordUser} = req.body
    const userId = res.locals.session
    console.log(title, url,nameUser,passwordUser, userId)
    await credentialService.creatingCredentials(title, url,nameUser,passwordUser, userId)
    return res.status(201).send("Credential create with successful")
   
}

export async function oneCredential(req: Request, res: Response){
    const userId = res.locals.session
    const {id: credentialsId} = req.params
    if(!credentialsId) {
        return res.status(422).send("credential Id is not provide")
    }
    const credential = await credentialService.lookingOneCredential(Number(userId), Number(credentialsId))
    return res.status(200).send(credential)
}

export async function everyCredential(req: Request, res: Response){
    const userId = res.locals.session
    const credentials = await credentialService.lookingEveryCredentials(Number(userId))
    return res.status(200).send(credentials)
}

export async function deleteCredential(req: Request, res: Response){
    const userId = res.locals.session
    const {id: credentialsId} = req.params
    if(!credentialsId) {
        return res.status(422).send("credential Id is not provide")
    }
    await credentialService.deletingCredential(Number(credentialsId), Number(userId))
    return res.status(200).send("Credential delete")
}