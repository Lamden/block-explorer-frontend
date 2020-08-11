export async function get(req, res, next) {
    let address = req.query.address;
    const api_res = await global.fetch(`http://127.0.0.1:1337/states/balances/${address}`)

    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(await api_res.json()))
}