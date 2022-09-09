import * as usersRepository from "../repositories/usersRepository"
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { IUserData } from "../types/usersType";

export async function creatingUser(user: IUserData) {
    //Regra de negócio: verificando se email já foi preenchido
    const emailUser = await usersRepository.findEmail(user)
    console.log(emailUser)
    if(emailUser !== null) {
        throw { code: "conflict", message: "this account is already use" };
    }
    //Regra de negócio: senha com no mínimo 10 caracteres
    if(user.password.length < 10) {
        throw { code: "Unauthorized", message: "password length have less of 10 characters" };
    }
    //Regra de negócio: criptografando senha
    const encryptedPassword = bcrypt.hashSync(user.password, 10);
    //Regra de negócio: salvando novo usuário no banco de dados
    const newUser = await usersRepository.insertUser(user, encryptedPassword)
    console.log("user inserido")
}

export async function createLogin(user: IUserData){
    // Regra de negócio: Verificando email e senha
    console.log("tá aqui")
    console.log(user)
    const emailUser = await usersRepository.findEmail(user)
    console.log(emailUser)
    if(emailUser === null) {
        throw { code: "Unauthorized", message: "this email is not register" };
    }
    console.log(emailUser)
    if(bcrypt.compareSync(user.password, emailUser.password)) {                             
        const chave:any = process.env.JWT_SECRET;
        const configuracoes = { expiresIn: 60*60*24*30 }
        const token = jwt.sign({ userId: emailUser.id }, chave, configuracoes); 
        return token
    }else{
        throw { code: "Unauthorized", message: "password incorrect" };
    }
}