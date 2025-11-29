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
        
        const result = await response.json();
        const JSONurl = JSON.stringify(result).split(',')[1];
        const JSONurlsing = JSONurl.split(/:(.*)/)
        const justTheBloodyURL = JSONurlsing[1].substring(1, JSONurlsing[1].length - 1);
        return justTheBloodyURL;
    } catch (error: any) {
        console.error(error.message);
    }
}

(async() => {
    console.log(await randcat());
})();





