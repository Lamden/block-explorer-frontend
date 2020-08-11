export async function get(req, res, next) {
    let body = {blockNum: req.query.blockNum};
    const api_res = await global.fetch(`http://127.0.0.1:1337/blocks/number/${body.blockNum}`)
    if (api_res.status === 200) body.block = await api_res.json().then(json => json[0])

    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(body))
}