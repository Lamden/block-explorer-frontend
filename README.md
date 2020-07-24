# Running the Lamden Block Explorer Frontent Locally

## Dependancies
Install [MongoDB](https://www.mongodb.com/)


## Install Block-Explorer-API
``` bash
git clone https://github.com/Lamden/block-explorer-frontend.git
cd block-explorer-frontend
npm install

```

### Edit API Server config
```bash
nano src/js/utils.js

>> const ApiURL = 'http://localhost:1337'

```

## Run
```
npm run dev
```

## Launch Block Explorer Frontend
[Lamden block explorer](http://localhost:3000)

