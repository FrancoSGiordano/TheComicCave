

export type Comic = {
    id: number
    name: string
    issue_number?: string
    cover_date?: string
    image?: {
        original_url: string
        medium_url: string
        small_url: string
        thumb_url: string
    }
    volume?: {
        name: string
    }
    publisher?: {
        id: number
        name: string
    }
}