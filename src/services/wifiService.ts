
import { IWifiData } from "../types/wifiType";
import * as wifiRepository from "../repositories/wifiRepository"
import Cryptr from "cryptr";

export async function creatingWifi(userId: number, wifi: IWifiData){
// Role of business: cript password
const cryptr = new Cryptr('myTotallySecretKey');
const encryptedPassword = cryptr.encrypt(wifi.passwordWifi);
wifi.passwordWifi = encryptedPassword;
await wifiRepository.insertWifi(wifi, userId)


}

export async function getOneWifi(userId: number,wifiId: number){
//Role of business: verify if wifi exist
const wifi = await wifiRepository.findOneWifi(wifiId)
console.log(wifi)
if(wifi === null) {
    throw { code: "notFound", message: "this wifi is not found" };
}
if(wifi.userId !== userId) {
    throw { code: "Unauthorized", message: "this wifi belongs to other user" };
}
console.log(wifi)
return wifi
}

export async function getEveryWifi(userId: number) {
//Role of business: verify is exist any wifi
const wifi = await wifiRepository.findEverywifi(userId)
if(wifi.length === 0) {
    throw { code: "notFound", message: "this user no have wifi register" };
}
//Role of business: decripty password
const cryptr = new Cryptr('myTotallySecretKey');
for(let i = 0; i < wifi.length; i++){
    const decryptedPassword = cryptr.decrypt(wifi[i].passwordWifi);
    wifi[i].passwordWifi = decryptedPassword
}

return wifi
}

export async function deletewifi(userId: number, wifiId: number) {
//Role of business: verify if wifi exist
console.log("wifiId: " + wifiId)
console.log("userId: " + wifiId)
const wifi = await wifiRepository.findOneWifi(wifiId)
console.log(wifi)
if(wifi === null) {
    throw { code: "notFound", message: "this wifi is not found" };
}
if(wifi.userId !== userId) {
    throw { code: "Unauthorized", message: "this wifi belongs to other user" };
}
await wifiRepository.deleteWifi(wifiId)
}
