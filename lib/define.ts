export async function define(word: string, page: number) {
    const url = 'https://api.dictionaryapi.dev/api/v2/entries/en/';
    
    try {
        const res = await fetch(url + word).then(response => response.json());

        if (!res.ok) {
            console.log(`Error: ${res.error}`);
        }

        return res[0];
    } catch (err: any) {
        return(`${err.name}: ${err.message}`);
    }
}

(async() => {
    console.log(await define('notaword', 1));
})();