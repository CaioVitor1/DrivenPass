import * as credentialRepository from "../repositories/credentialsRepository"
import Cryptr from "cryptr";

export async function creatingCredentials(title: string, url: string,nameUser: string,passwordUser: string, userId: string){
// Rule of business: verify if title is already use 
const searchTitle = await credentialRepository.findTitle(title)
console.log(searchTitle)
if(searchTitle !== null) {
    throw { code: "conflict", message: "this title is already use" };
}
// Rule of business: cript password with cryptr
const cryptr = new Cryptr('myTotallySecretKey');
const passwordCript = cryptr.encrypt(passwordUser);
console.log(passwordCript)

await credentialRepository.insertCredential(title, url,nameUser,passwordCript, Number(userId))
}

export async function lookingOneCredential(userId: number, credentialsId: number){
const searchCredential = await credentialRepository.findCredential(credentialsId)
console.log(searchCredential)
//Rule of business: verify if credential exist
if(searchCredential === null) {
    throw { code: "notFound", message: "this credentials is not found" };
}
//Rule of business: verify if credential belongs to user
if(searchCredential.userId !== userId) {
    throw { code: "Unauthorized", message: "this credential belongs to other user" };
}
//Rule of business: decrypting password
const cryptr = new Cryptr('myTotallySecretKey');
const decryptPassword = cryptr.decrypt(searchCredential.passwordUser)
searchCredential.passwordUser = decryptPassword

return searchCredential
}

export async function lookingEveryCredentials(userId:number){
    const credentialsUser = await credentialRepository.findCredentialsUser(userId)
    console.log(credentialsUser)
    //Rule of business: verify if exist any credential
    if(credentialsUser === null) {
        throw { code: "notFound", message: "this user not have credentials register" };
    }
    //Rule of business: decrypting password
    const cryptr = new Cryptr('myTotallySecretKey');
    for(let i = 0; i < credentialsUser.length; i++){
        const decryptPassword = cryptr.decrypt(credentialsUser[i].passwordUser)
        credentialsUser[i].passwordUser = decryptPassword
    }
    return credentialsUser
}

export async function deletingCredential(credentialsId: number, userId: number){
     //Rule of business: verify if credential exist
    const searchCredential = await credentialRepository.findCredential(credentialsId)
    console.log(searchCredential)
    if(searchCredential === null) {
        throw { code: "notFound", message: "this credentials is not found" };
    }
    //Rule of business: verify if credential belongs to user
    if(searchCredential.userId !== userId) {
    throw { code: "Unauthorized", message: "this credential belongs to other user" };
}
    await credentialRepository.deleteCredential(credentialsId)
}