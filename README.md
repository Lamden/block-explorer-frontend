# Running the Lamden Block Explorer Frontend Locally

## Install Block-Explorer-API
``` bash
git clone https://github.com/Lamden/block-explorer-frontend.git
cd block-explorer-frontend
npm install

```

## Run Webserver
```bash
npm run dev
```

or with different network Symbol

```bash
SYMBOL=dTAU npm run dev 
```

or with PM2
1. Download PM2
```bash
npm install pm2 -g
```
2. Run with PM2
```bash
SYMBOL=dTAU pm2 start npm --name "fontend" -- run dev
```

### Launch Block Explorer Frontend
[Lamden block explorer](http://localhost:3000)

