import client from "../databases/postgres"
import { ISafeNoteData } from "../types/safeNoteType"


export async function findTitle(safeNote: ISafeNoteData, userId: number){
    return await client.safenote.findMany({ 
        where:{
            title: safeNote.title,
            userId: userId
        }
})
}
export async function insertSafeNote(safeNote: ISafeNoteData, userId: number) {
    return await client.safenote.create({
        data: {
            title: safeNote.title,
            description: safeNote.description,
            userId: userId
        }
    })
}
export async function findNote(safeNoteId: number) {
return await client.safenote.findFirst({
    where: {
        id: safeNoteId
    }
})
}
export async function findManyNotes(userId: number){
    return await client.safenote.findMany({
        where: {
            userId: userId
        }
    })
}
export async function deleteNote(safeNoteId: number){
    return await client.safenote.delete({
        where: {
            id: safeNoteId
        }
    })
}