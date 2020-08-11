export async function get(req, res, next) {
    let hash = req.query.hash;
    const api_res = await global.fetch(`http://127.0.0.1:1337/blocks/hash/${hash}`).then(res => res.json()).then(json => json[0])

    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(await api_res))
}