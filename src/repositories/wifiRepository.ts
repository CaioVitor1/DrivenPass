import client from "../databases/postgres";
import { IWifiData } from "../types/wifiType";

export async function findTitle(wifi: IWifiData, userId: number){
    return await client.wifi.findFirst({
        where: {
            userId: userId,
            title: wifi.title
        }
    })
}

export async function insertWifi(wifi: IWifiData, userId: number){
    return await client.wifi.create({
        data: {
            title: wifi.title,
            nameWifi: wifi.nameWifi,
            passwordWifi: wifi.passwordWifi,
            userId: userId
        }
    })
}

export async function findOneWifi(wifiId: number){
    console.log(wifiId)
    return await client.wifi.findFirst({
        where: {
            id: wifiId
        }
    })
}

export async function findEverywifi(userId: number){
    return await client.wifi.findMany({
        where: {
            userId: userId
        }
    })
}
export async function deleteWifi(wifiId: number){
    return await client.wifi.delete({
        where: {
            id: wifiId
        }
    })
}