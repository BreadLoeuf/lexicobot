export async function genWikilink(): Promise<string> {
    const link = await fetch('https://en.wikipedia.org/wiki/Special:Random').then(res => res.url);
    return link;
}

(async() => {
    console.log(await genWikilink())
})()