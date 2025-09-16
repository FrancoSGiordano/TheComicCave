import md5 from "md5"
import type { Character, ComicCardType } from "../types"


export type ComicFilters = {
    title?: string
    dateRange?: string; 
    orderBy?: string;   
    limit?: number;
    offset?: number;
    characterId?: number;
    creatorId?: number;
}


const baseURL = "https://gateway.marvel.com/v1/public"
const publicKey = import.meta.env.VITE_PUBLIC_API_KEY
const privateKey = import.meta.env.VITE_PRIVATE_API_KEY



export default async function fetchComics(filters: ComicFilters) {
    const ts = new Date().getTime().toString();
    const hash = md5(ts + privateKey + publicKey).toString();  

    let url = `${baseURL}/comics?ts=${ts}&apikey=${publicKey}&hash=${hash}`;

    if(filters.title) url += `&titleStartsWith=${filters.title}`
    if(filters.dateRange) url += `&dateRange=${filters.dateRange}`
    if(filters.limit) url += `&limit=${filters.limit}`
    if(filters.offset) url += `&offset=${filters.offset}`
    if(filters.orderBy) url += `&orderBy=${filters.orderBy}`
    if(filters.characterId) url += `&characters=${filters.characterId}`

    try {
        const response = await fetch(url)
        const data = await response.json()

        console.log(data)

        const comics: ComicCardType[] = data.data.results.map((c:any) => ({
            id: c.id,
            title: c.title,
            imageUrl: `${c.thumbnail.path}/portrait_uncanny.${c.thumbnail.extension}`
        }))
        console.log(comics)
        return comics
    } catch (error) {
        console.error("Error fetching comics:", error);
    }
}



export async function getCharacters(query?: string, limit : number = 5){
    
    const ts = new Date().getTime().toString();
    const hash = md5(ts + privateKey + publicKey);

    const params: Record<string, string> = {
        ts,
        apikey: publicKey,
        hash,
        limit: limit.toString(),
    };

    if (query) {
        params.nameStartsWith = query; 
    }

    const url = `${baseURL}/characters?${new URLSearchParams(params).toString()}`;
    const response = await fetch(url)

    
    const data = await response.json()

    const characters: Character[] = data.data.results.map((c:any) => ({
            id: c.id,
            name: c.name,
            
        }))

    return characters

}