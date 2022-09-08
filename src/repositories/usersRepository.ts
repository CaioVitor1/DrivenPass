import client from "../databases/postgres"

export async function findEmail(email:string) {
return await client.user.findMany({where: {
    email: email
}})
}

export async function insertUser(email: string, encryptedPassword: string){
    return await client.user.create({
        data: {
            email: email,
            password: encryptedPassword
        }
    })
}