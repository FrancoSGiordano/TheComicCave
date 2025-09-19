export type Comic = {
    id: number
    name: string
    image: string
    publisher: string
}


export type FavoriteState = {
    favorite: ComicCardType[]
    quantity: number
}

export type ComicCardType = {
    id: number;
    title: string;
    imageUrl: string;
}

export type Character = {
    id: number
    name: string
}

export type Creator = {
  name: string
  role: string
}
export type CreatorSearch = {
  id: number
  name: string
}
export type ComicDetails = {
  id: number
  title: string
  imageUrl: string
  description: string
  creators: Creator[]
  date?: string
}