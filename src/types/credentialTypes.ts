import { credentials } from "@prisma/client";

export type ICredentialsData = Omit<credentials, 'id' | 'userId'>;

