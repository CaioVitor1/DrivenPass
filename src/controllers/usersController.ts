import { Request, Response } from "express";
import * as usersService from "../services/usersService"
import { IUserData } from "../types/usersType";

export async function createUser(req: Request, res: Response) {
 const user: IUserData = req.body
 await usersService.creatingUser(user)
 return res.status(201).send("new user create")
}

export async function login(req: Request, res: Response) {
    const user: IUserData = req.body = req.body
   const token = await usersService.createLogin(user)
    return res.status(201).send(token)
}