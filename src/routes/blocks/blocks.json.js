export async function get(req, res, next) {
    const limit = 20 || req.query.limit;
    const api_res = await global.fetch(`http://127.0.0.1:1337/blocks?limit=${limit}`)
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(await api_res.json()))
}