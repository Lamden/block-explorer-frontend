import sirv from 'sirv';
import polka from 'polka';
import compression from 'compression';
import * as sapper from '@sapper/server';
import whitelabel from '../whitelabel.json'

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

global.fetch = require('node-fetch')

polka() // You can also use Express
	.use(
		compression({ threshold: 0 }),
		sirv('static', { dev }),
		sapper.middleware({
			session: () => ({
				whitelabel
			})
		})
	)
	.listen(PORT, err => {
		if (err) console.log('error', err);
	});
