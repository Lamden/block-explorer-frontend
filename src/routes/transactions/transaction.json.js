export async function get(req, res, next) {
    let body = {hash: req.query.hash};
    const api_res = await global.fetch(`http://127.0.0.1:1337/transactions/get/${body.hash}`)
    if (api_res.status === 200) body.tx = await api_res.json()

    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(body))
}