import { ClientBase } from "pg"
import client from "../databases/postgres"
import { ICredentialsData } from "../types/credentialTypes"

export async function findTitle(credential: ICredentialsData, userId: number){
    return await client.credentials.findMany({ 
        where:{
            title: credential.title,
            userId: userId
        }
})
}

export async function insertCredential(credential: ICredentialsData, userId: number){
    return await client.credentials.create({
        data: {
            title: credential.title,
            url: credential.url,
            nameUser: credential.nameUser,
            passwordUser: credential.passwordUser,
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

