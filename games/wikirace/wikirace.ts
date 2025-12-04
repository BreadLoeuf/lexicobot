import * as we from '../../errorhandling/writeError';

export async function genWikilink(): Promise<string> {
    try {
        const response = await fetch('https://en.wikipedia.org/wiki/Special:Random')

        if (!response.ok) {
            console.error(`Response: ${response.status}`)
            we.passToHTTPLog(`${response.status} from generating wikilink...`)
        }

        return response.url;
    } catch (err: any) {
        console.error(`${err.name}: ${err.message}`);
        we.writeError(`${err.name}: ${err.message}`);
    }
    return 'https://en.wikipedia.org/wiki/Special:Random';
}

(async() => {
    console.log(await genWikilink())
})();