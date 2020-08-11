export async function get(req, res, next) {
    const api_res = await global.fetch(`http://localhost:1337/lamden/stamps`)
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(await api_res.json()))
}