import { Request, Response } from "express";
import * as usersService from "../services/usersService"

export async function createUser(req: Request, res: Response) {
 const {email, password} = req.body
 await usersService.creatingUser(email, password)
 return res.status(201).send("new user create")
}

export async function login(req: Request, res: Response) {
    const {email, password} = req.body
   const token = await usersService.createLogin(email, password)
    return res.status(200).send(token)
}