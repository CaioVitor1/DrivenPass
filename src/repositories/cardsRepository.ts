import client from "../databases/postgres";
import { ICardData } from "../types/cardType";

export async function findTitle(card: ICardData, userId: number){
return await client.cards.findMany({
    where: {
        title: card.title,
        userId: userId
    }
})
}
export async function insertCard(card: ICardData, userId: number){
    return await client.cards.create({
        data: {
            nameCard: card.nameCard,      
            numberCard: card.numberCard,     
            expirationDate: card.expirationDate,
            cvc: card.cvc,        
            password: card.password,   
            title: card.title,          
            isVirtual: card.isVirtual,      
            type: card.type,           
            userId: userId         
        }
    })
}
export async function findCard(cardId: number){
    return await client.cards.findFirst({
        where: {
            id: cardId
        }
    })
}
export async function findEveryCard(userId: number){
    return await client.cards.findMany({
        where: {
            userId: userId
        }
    })
}
export async function deleteCard(cardId: number){
    return await client.cards.delete({
        where: {
            id: cardId
        }
    })
}