import * as we from '../errorhandling/writeError';

export async function randdog() {
    const url = 'https://dog.ceo/api/breeds/image/random';

    try {
        const response = await fetch(url, {
            method: "GET",
        });
        if (!response.ok) {
            we.passToHTTPLog(`Response status: ${response.status}`);
            throw new Error(`Response status: ${response.status}`);
        }
        
        const result = await response.json().then(data => {return data});
        return result['message'];
    } catch (error: any) {
        console.error(error.message);
        we.writeError(`${error.name}: ${error.message}`);
    }
}

(async () => {
    console.log(await randdog());
})();