

export async function get(req, res, next) {
    console.log("HERE")
    const topWallets = await global.fetch(`http://127.0.0.1:1337/states/topWallets?limit=20`).then(resp => resp.json()).then(json => json.data)
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(await topWallets))
}