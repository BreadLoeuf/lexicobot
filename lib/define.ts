export async function define(word: string, page: number) {
    const url = 'https://api.dictionaryapi.dev/api/v2/entries/en/';
    const response = await fetch(url + word);
    const result = await response.json() as {word: string, phonetic: string, meanings: string, definitions: string[]}[];

    return result[page];
}

(async() => {
    console.log(await define('test', 1));
})();