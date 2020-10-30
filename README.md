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


# Whitelabel Configuration
- create `./whitelabel.json`
- change options in `/whitelabel.json` to enable or disable UI elements

``` json
{
    "companyName": "Lamden", //company name to use in interface
    "networkSymbol": "TAU", // Token symbol to preceed balances 
    "balancePrefix": "", // Symbol to be prexied to balances where specified, (ie. "$")
    "nav":{ // Targets the main top nav bar
        "showStampRatio" : true, // Show the stamp ratio under the logo in the top left-hand corner
        "blocks": true, // Show the blocks menu item
        "transactions":true, //Show the transactions menu item
        "wallets": true, //Show the wallets menu item
        "searchBoxPlaceholder": "Block # / Tx Hash / Address", // Default message in an empty search box
        "searchBoxLabel": "Search Lamden Blockchain" // Search box top label
    },
    "mainpage": { // Main Homepage config items
        "title": "Block Explorer", // Main title
        "subtitle": { // words under the main title 
            "show": true, // enable or disable showing this component
            "message": "lamden_default" // lamden_default displays the "lamden subtitle verbiage", but you can enter whatever subtitle you want displaed here.
        },
        "detailsBox": { // Show or hide the big purple box that shows updated stats
            "show": true, // show or hide the component
            "items":{ 
                "showPriceInfo": true, // show or hide the pricing component
                "showSmartContractCount": true, //show or hide the smart contract count component
                "showTransactionCount": true // show or hide the transaction count component
            }
        },
        "buttonText":"VIEW MORE", // What the buttons should say
        "blocks": { // Shows the "latest blocks" component
            "show": true, // show or hide the component
            "rows": 10 // number of rows to display in the table
        },
        "latestTransactions": { // Shows the "latest transactions" component
            "show": true, // show or hide the component
            "rows": 10 // number of rows to display in the table
        },
        "topWallets": { // Shows the "top wallets" component
            "show": true, // show or hide the component
            "title": "Top Wallets",
            "rows" : 20, // number of rows to display in the table
            "columns": { // show or hide spcific columns in the table
                "address": { // show the "wallet address"
                    "show": true, // show or hide the column
                    "title":"Address" // Change the name of the column
                },
                "amount": { // show the "wallet balance"
                    "show": true,  // show or hide the column
                    "title": "Amount", // Change the name of the column
                    "toFixed": 8, // Change the displayed decimal points
                    "prefix": true // Display the prefix on this amount
                }
            }
        }
    },
    "transactions": { // This allows changing what is shown on the transactions page "url/transactions" and specific transaction info page "url/transactions/<tx_hash>"
        "table": { // Configure the table shown at "url/transactions"
            "title": "Latest Transactions", // Table Title
            "rows" : 20, // Rows to display per page
            "columns": { // Turn on and off and rename columns
                "contract": {
                    "show": true,
                    "title":"Contract"
                },
                "function": {
                    "show": true,
                    "title":"Function"
                },
                "stampsUsed": {
                    "show": true,
                    "title":"Stamps Used"
                },
                "hash": {
                    "show": true,
                    "title":"Hash"
                }
            }
        },
        // Configuration items for page when vieing a SPECIFIC transaction "url/transactions/<tx_hash>"
        "title": "Transaction:", // The main title on this page
        "showTransactionHash": true, // Show the hash beside the above title
        "mainInfo":{ // Show or hide the rows in the main details section
            "status": true,
            "timestamp": true,
            "result": true,
            "blockNum": true,
            "subBlockNum": true,
            "sender": true,
            "nonce": true,
            "processor": true,
            "stampsUsed": true,
            "contractName": true,
            "functionName": true,
            "signature": true
        },
        "kwargInfo": { // Show, hide and rename the "Kwargs" section
            "show":true,
            "title": "Kwargs"
        },
        "stateChanges":{ // Show, hide and rename the "State Changes" section
            "show":true,
            "title": "State Changes",
            "showAdvanced": true // Show or hide the "Contract and Variable" rows from this section
        }
    },
    "blocks": { // This allows changing what is shown on the transactions page "url/blocks" and specific transaction info page "url/blocks/<block_num>"
        "table": { // Configure table shown on "url/blocks"
            "title": "Latest Blocks", // Change Table Title
            "rows" : 20, // Change how many rows are shown per page
            "columns": { // Show, hide or rename columns
                "block": {
                    "show": true,
                    "title":"Block"
                },
                "subBlocks": {
                    "show": true,
                    "title":"SubBlocks"
                },
                "transactions": {
                    "show": true,
                    "title":"Transactions"
                },
                "hash": {
                    "show": true,
                    "title":"Hash"
                }
            }
        },
        // Configure display items on "url/blocks/<block_num>"
        "title": "Block:", // Main title of page
        "showBlockNum": true, // Show or hide the block number next to the title above
        "mainInfo": { // Show or hide rows in the main detail of the page
            "hash": true,
            "previousHash": true,
            "numOfSubBlocks": true,
            "numOfTransactions": true,
            "transactions": true
        }
    },
    "addresses": { // This allows changing what is shown on the transactions page "url/addresses" and specific transaction info page "url/addresses/<address>"
        "table": { // Configure table shown on "url/addresses"
            "title": "Top Wallets", // Change the title of the table
            "rows" : 20, // Change how many rows are shown per page
            "columns": { // Show, Hide or Change the name of columns 
                "address": {
                    "show": true,
                    "title":"Address" 
                },
                "amount": {
                    "show": true,
                    "title": "Amount",
                    "toFixed": 8, // Change the decimal places of the amount
                    "prefix": true // Add the prefix to this amount
                }
            }
        },
        // Configure display items on "url/addresses/<address>"
        "mainInfo":{
            "title": "Address:", // Change the title of this page
            "showAddress": true, // Show or hide the address next to the title
            "balance":{ // Show or Hide the current wallet balance
                "show": true,
                "toFixed": 8, // change decimal places shown on the balance
                "prefix": true // Show the prefix next to this balance
            },
            "numOfTransactions": true // Show or hide the number of transactions
        },
        "txInfo": {  // Configure the transaction history
            "show" : true, // Show or hide the transactions history
            "title" : "Transactions", // Change the title of this section
            "items": { // Show or hide items in this section
                "hash": true,
                "blockNum": true,
                "nonce": true,
                "status":true,
                "result":true,
                "contractName": true,
                "functionName": true,
                "amount": {
                    "show": true,
                    "toFixed": 8,  // change the amount of decimal places shown on the amount
                    "prefix":true // show or hide the prefix on this amount
                },
                "to": true,
                "numOfStateChanges": true
            },
            "buttonText": "MORE"  // The text shown on the "get more transactions" button
        }
    }
}
```

- edit `\static\global.css` to change brand colors
``` css
body{
	/* UI */
	--primary-color: #461BC2;
	--secondary-color: #818cab;

	--font-primary: #e8e8e8; 
	--font-secondary: #9a9a9a; 

	--bg-color: #151515; 

	--divider-color: #E0E0E02E;

	--accent-color: #4FB8FF;

	/* Buttons */
	--button-primary-bg-color: #461BC2;
	--button-primary-text-color: #FFF;
	--button-secondary-bg-color: #461BC2;
	--button-secondary-text-color: #FFF;  
    
}
```

- change logos files: 
    - `/static/logo_full.svg`: logo in top left of interface, should be "full brand logo" which is logo + name
    - `/static/logo-192.png`: a 192x192px PNG of the logo, used for web app icon
    - `/static/logo-512.png`: a 512x512px PNG of the logo, used for web app icon on larger displays
    - `/static/favicon.png`: a 34x34px PNG of the logo, displayed on broswer tabs and favorites

- change fonts:
    - repace font files in `\static\fonts`
    - change import statements at the top of `\static\global.css`

- edit manifest.json
    - background_color: change to value of `--bg-color` in `\static\global.css`
	- theme_color": change to value of `--primary-color` in `\static\global.css`
	- name: "Name of App",
	- short_name: "Name of App",

