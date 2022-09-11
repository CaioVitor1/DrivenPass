import { ICardData } from "../types/cardType";
import * as cardRepository from "../repositories/cardsRepository"
import Cryptr from "cryptr";

export async function creatingCard(card: ICardData, userId: number){
// Role of business: verify if title is already use
const searchTitle = await cardRepository.findTitle(card, userId)
console.log(searchTitle)
if(searchTitle.length !== 0) {
    throw { code: "conflict", message: "this title is already use" };
}
// Role of business: cripty cvc and password
const cryptr = new Cryptr('myTotallySecretKey');
const encryptedCvc = cryptr.encrypt(card.cvc);
const encryptedPassword = cryptr.encrypt(card.password)
//const decryptedCvc = cryptr.decrypt(encryptedCvc); (para desencriptar)
card.cvc = encryptedCvc
card.password = encryptedPassword
console.log(card)
await cardRepository.insertCard(card, userId)
}
export async function getOneCard(userId: number, cardId: number){
    const searchCard = await cardRepository.findCard(cardId)
    console.log(searchCard)
    //Rule of business: verify if credential exist
    if(searchCard === null) {
        throw { code: "notFound", message: "this card is not found" };
    }
    //Rule of business: verify if card belongs to user
    if(searchCard.userId !== userId) {
        throw { code: "Unauthorized", message: "this card belongs to other user" };
    }
    //Rule of business: decrypting password and cvc
    const cryptr = new Cryptr('myTotallySecretKey');
    const decryptPassword = cryptr.decrypt(searchCard.password)
    const decryptCvc = cryptr.decrypt(searchCard.cvc)
    searchCard.password = decryptPassword;
    searchCard.cvc = decryptCvc;

    return searchCard
}

export async function getEveryCard(userId: number){
    const cards = await cardRepository.findEveryCard(userId)
    console.log(cards)
    //Rule of business: verify if exist any card
    if(cards.length === 0) {
        throw { code: "notFound", message: "this user not have cards register" };
    }
    //Rule of business: decrypting password
    const cryptr = new Cryptr('myTotallySecretKey');
    for(let i = 0; i < cards.length; i++){
        const decryptPassword = cryptr.decrypt(cards[i].password)
        const decryptCvc = cryptr.decrypt(cards[i].cvc)
        cards[i].password = decryptPassword
        cards[i].cvc = decryptCvc
    }
    return cards
}

export async function deletingCard(userId: number, cardId: number) {
    const searchCard = await cardRepository.findCard(cardId)
    console.log(searchCard)
    //Rule of business: verify if credential exist
    if(searchCard === null) {
        throw { code: "notFound", message: "this card is not found" };
    }
    //Rule of business: verify if credential belongs to user
    if(searchCard.userId !== userId) {
    throw { code: "Unauthorized", message: "this credential belongs to other user" };
}
    await cardRepository.deleteCard(cardId)
}
