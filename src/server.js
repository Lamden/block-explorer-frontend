import sirv from 'sirv';
import polka from 'polka';
import compression from 'compression';
import * as sapper from '@sapper/server';

const { PORT, NODE_ENV, SYMBOL } = process.env;
const dev = NODE_ENV === 'development';

global.fetch = require('node-fetch')

polka() // You can also use Express
	.use(
		compression({ threshold: 0 }),
		sirv('static', { dev }),
		sapper.middleware({
			session: () => ({
				networkSymbol: SYMBOL || 'TAU'
			})
		})
	)
	.listen(PORT, err => {
		if (err) console.log('error', err);
	});
