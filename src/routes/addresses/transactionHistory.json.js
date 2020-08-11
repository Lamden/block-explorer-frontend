export async function get(req, res, next) {
    const address = req.query.address;
    const offset = 0 || req.query.offset;

    const api_res = await global.fetch(`http://localhost:1337/transactions/history/${address}?offset=${offset}`)
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(await api_res.json()))
} 