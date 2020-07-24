# Running the Lamden Block Explorer Frontend Locally

## Install Block-Explorer-API
``` bash
git clone https://github.com/Lamden/block-explorer-frontend.git
cd block-explorer-frontend
npm install

```

### Edit API Server config
Change what Block Explorer API the data is pulled from
```bash
nano src/js/utils.js

>> const ApiURL = 'http://localhost:1337'

```
### Edit currency tag
Change what the currency Symbol is displayed as (ex. TAU or dTAU)
```bash
nano src/js/utils.js

>> const networkSymbol = 'TAU'

```

## Run Webserver
```
npm run dev
```

### Launch Block Explorer Frontend
[Lamden block explorer](http://localhost:3000)

