import * as dotenv from 'dotenv';

export async function randcat() {
    const url = 'https://api.thecatapi.com/v1/images/search';

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "x-api-key": process.env.CAPI_KEY!
            }
        });
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        
        const result = await response.json() as { id: string, height: number, width: number, url: string }[];
        return result[0];
    } catch (error: any) {
        console.error(error.message);
    }
}





