import { wifi } from "@prisma/client";

export type IWifiData = Omit<wifi, 'id' | 'userId' >;