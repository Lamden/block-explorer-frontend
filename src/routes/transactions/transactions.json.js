export async function get(req, res, next) {
    const limit = 20 || req.query.limit;
    const offset = 0 || req.query.offset;
    const api_res = await global.fetch(`http://localhost:1337/transactions?limit=${limit}&offset=${offset}`)
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(await api_res.json()))
}