import md5 from "md5"
import type { Character, ComicCardType, Creator, ComicDetails } from "../types"


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

        const comics: ComicCardType[] = data.data.results.map((c:any) => ({
            id: c.id,
            title: c.title,
            imageUrl: `${c.thumbnail.path}/portrait_uncanny.${c.thumbnail.extension}`,
            description: c.description
        }))

        const total: number = data.data.total
        console.log("Llamada a la api")
        return {
          comics,
          total
        }
    } catch (error) {
        console.error("Error fetching comics:", error);
        return {
          comics: [],
          total: 0
        }
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


export async function fetchComicById(id: number | string): Promise<ComicDetails | null> {
  if (!id) return null

  const ts = new Date().getTime().toString()
  const hash = md5(ts + privateKey + publicKey)

  const params = new URLSearchParams({
    ts,
    apikey: publicKey,
    hash,
  })

  const url = `${baseURL}/comics/${id}?${params.toString()}`

  try {
    const res = await fetch(url)
    if (!res.ok) {
      console.error("Marvel API error:", res.status, await res.text())
      return null
    }

    const json = await res.json()
    const result = json?.data?.results?.[0]
    if (!result) return null

    const thumb = result.thumbnail
    const imageUrl =
      thumb && thumb.path && thumb.extension && !thumb.path.includes("image_not_available")
        ? `${thumb.path}/portrait_uncanny.${thumb.extension}`
        : "/placeholder.svg"


    const rawDate =
    Array.isArray(result.dates) && result.dates.length > 0
        ?  result.dates[0].date :  null;

    const date = rawDate ? new Date(rawDate).toISOString() : null;

    const creators: Creator[] = Array.isArray(result.creators?.items)
      ? result.creators.items.map((c: any) => ({
          name: c.name ?? "",
          role: c.role ?? "",
        }))
      : []

    const comic: ComicDetails = {
      id: result.id,
      title: result.title ?? "",
      imageUrl,
      description: result.description ?? "",
      creators,
      date: date?? ""
    }

    return comic
  } catch (error) {
    console.error("Error en fetchComicById:", error)
    return null
  }
}