

export async function get(req, res, next) {
    const { txAmount, blocksAmount } = req.query

    if (!txAmount) txAmount = 10
    if (!blocksAmount) blocksAmount = 10

    const fetchAllData = async () => {
        let allInfo = await Promise.all([
            global.fetch(`http://127.0.0.1:1337/blocks?limit=${parseInt(blocksAmount)}`).then(resp => resp.json()).then(json => json.data),
            global.fetch(`http://127.0.0.1:1337/transactions?limit=${parseInt(txAmount)}`).then(resp => resp.json()).then(json => json.data),
            global.fetch(`http://127.0.0.1:1337/states/topWallets?limit=20`).then(resp => resp.json()).then(json => json.data),
            global.fetch(`http://127.0.0.1:1337/states/totalcontracts`).then(resp => resp.json()),
            global.fetch(`http://127.0.0.1:1337/states/totaladdresses`).then(resp => resp.json())
        ])
        return {
            blockList: allInfo[0],
            txList: allInfo[1],
            topWalletsList: allInfo[2],
            totalContracts: allInfo[3],
            totalAddresses: allInfo[4].count
        }
    }
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(await fetchAllData()))
}