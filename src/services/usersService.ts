import * as usersRepository from "../repositories/usersRepository"
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function creatingUser(email: string, password:string) {
    //Regra de negócio: verificando se email já foi preenchido
    const emailUser = await usersRepository.findEmail(email)
    console.log(emailUser)
    if(emailUser.length !== 0) {
        throw { code: "conflict", message: "this account is already use" };
    }
    //Regra de negócio: senha com no mínimo 10 caracteres
    if(password.length < 10) {
        throw { code: "Unauthorized", message: "password length have less of 10 characters" };
    }
    //Regra de negócio: criptografando senha
    const encryptedPassword = bcrypt.hashSync(password, 10);
    //Regra de negócio: salvando novo usuário no banco de dados
    const newUser = await usersRepository.insertUser(email, encryptedPassword)
    console.log("user inserido")
}

export async function createLogin(email: string, password:string){
    // Regra de negócio: Verificando email e senha
    const emailUser = await usersRepository.findEmail(email)
    if(bcrypt.compareSync(password, emailUser[0].password)) {                             
        const chave:any = process.env.JWT_SECRET;
        const configuracoes = { expiresIn: 60*60*24*30 }
        const token = jwt.sign({ userId: emailUser[0].id }, chave, configuracoes); 
        return token
    }else{
        throw { code: "Unauthorized", message: "password incorrect" };
    }
}