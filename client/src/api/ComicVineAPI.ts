const baseURL = 'http://localhost:4001/api'


export async function fetchComicsByPublisher(publisherId : string, limit : number) {
    
    try {
        
        const url = `${baseURL}/issues/publisher/${publisherId}/featured?limit=${limit.toString()}`;

        const response = await fetch(url)

        if(!response.ok){
            throw new Error(`ComicVine API error: ${response.status} - ${response.text}`);
        }

        const data = await response.json();

        return data.results

    } catch (error) {
        console.error('Error fetching issues by publisher');
        throw error;
    }
    
}