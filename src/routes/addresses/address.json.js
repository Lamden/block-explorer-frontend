export async function get(req, res, next) {
    let body = {address: req.query.address};
    const api_res = await global.fetch(`http://localhost:1337/transactions/history/${body.address}`)
    if (api_res.status === 200) body.txs = await api_res.json()

    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(body))
}