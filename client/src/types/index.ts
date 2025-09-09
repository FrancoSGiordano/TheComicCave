

export type Comic = {
    id: number
    name: string
    image: string
    publisher: string
}



export type FavoriteComic = Pick<Comic, 'id' | 'name' | 'image' | 'publisher'>

export type FavoriteState = {
    favorite: FavoriteComic[]
    quantity: number
}