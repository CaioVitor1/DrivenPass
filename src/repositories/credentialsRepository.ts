import { ClientBase } from "pg"
import client from "../databases/postgres"

export async function findTitle(title: string){
    return await client.credentials.findFirst({ 
        where:{
            title: title
        }
})
}

export async function insertCredential(title: string, url: string,nameUser: string,passwordCript: string, userId: number){
    return await client.credentials.create({
        data: {
            title: title,
            url: url,
            nameUser: nameUser,
            passwordUser: passwordCript,
            userId: userId
        }
    })
}

export async function findCredential(credentialsId: number){
    return await client.credentials.findFirst({
        where: {
            id: credentialsId
        }
    })
}

export async function findCredentialsUser(userId: number){
    return await client.credentials.findMany({
        where: {
            userId: userId
        }
    })
}

export async function deleteCredential(credentialsId: number){
    return await client.credentials.delete({
        where: {
            id: credentialsId
        }
    })

}

