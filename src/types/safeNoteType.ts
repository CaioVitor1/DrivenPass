import { safenote } from "@prisma/client";

export type ISafeNoteData = Omit<safenote, 'id' | 'userId'>;