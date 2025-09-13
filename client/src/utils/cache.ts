export function setLocalStorage(key: string, data: any, ttlMinutes: number) {
    const record = {
        data,
        timestamp: Date.now(),
        ttl: ttlMinutes * 60 * 1000
    }
    localStorage.setItem(key, JSON.stringify(record))
}

export function getLocalStorage(key: string) {
    const item = localStorage.getItem(key)
    if(!item){
        return null
    }

    const record = JSON.parse(item)
    const now = Date.now()

    if(now - record.timestamp > record.ttl) {
        localStorage.removeItem(key)
        return null
    }

    return record.data
}