export async function get(req, res, next) {
    const limit = req.query.limit || 20;
    const offset = req.query.offset || 0;
    const api_res = await global.fetch(`http://127.0.0.1:1337/states/topWallets?limit=${limit}&offset=${offset}`)
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(await api_res.json()))
}