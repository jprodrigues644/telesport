/** Interface representing a country's participation in a specific Olympic event */
export interface Participation {
    id: number,
    year: number,
    city: string,
    medalsCount: number,
    athleteCount: number
}
