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