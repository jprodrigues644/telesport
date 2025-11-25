import { Participation } from "./participation";

/** Interface representing Olympic data for a country */

export interface Olympic {
    id: number,
    country: string,
    participations: Participation[]
}
