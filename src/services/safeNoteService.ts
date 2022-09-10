import { ISafeNoteData } from "../types/safeNoteType";
import * as credentialRepository from "../repositories/credentialsRepository"
import * as safeNoteRepository from "../repositories/safeNoteRepository"

export async function creatingSafeNote(safeNote: ISafeNoteData, userId: number){
// Role of business: verify if title already exist
const {title} = safeNote
const searchTitle = await safeNoteRepository.findTitle(safeNote, userId)
console.log(searchTitle)
if(searchTitle.length !== 0) {
    throw { code: "conflict", message: "this title is already use" };
}
// Role of business: verify if length of title and description
if(safeNote.title.length > 50 && safeNote.description.length > 1000) {
    throw { code: "Unprocessable_Entity", message: "Title or description have pass the limit of characters" };
}

await safeNoteRepository.insertSafeNote(safeNote, userId)
}

export async function getOneNote(userId: number,safeNoteId: number){
//Role of business: verify if note exist
const note = await safeNoteRepository.findNote(safeNoteId)
if(note === null) {
    throw { code: "notFound", message: "this note is not found" };
}
if(note.userId !== userId) {
    throw { code: "Unauthorized", message: "this note belongs to other user" };
}
return note
}

export async function getEveryNote(userId: number) {
//Role of business: verify is exist any note
const note = await safeNoteRepository.findManyNotes(userId)
if(note.length === 0) {
    throw { code: "notFound", message: "this user no have notes" };
}
return note
}

export async function deleteNote(safeNoteId: number, userId: number) {
//Role of business: verify if note exist
const note = await safeNoteRepository.findNote(safeNoteId)
if(note === null) {
    throw { code: "notFound", message: "this note is not found" };
}
if(note.userId !== userId) {
    throw { code: "Unauthorized", message: "this note belongs to other user" };
}
await safeNoteRepository.deleteNote(safeNoteId)
}