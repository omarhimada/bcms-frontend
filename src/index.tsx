import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Client as Styletron } from 'styletron-engine-atomic';
import { Provider as StyletronProvider } from 'styletron-react';
import { BaseProvider, LightTheme } from 'baseui';
import * as serviceWorker from './serviceWorker';

import {
	ApolloClient,
	ApolloProvider,
	InMemoryCache,
	NormalizedCacheObject
} from '@apollo/client';

// dotenv for environment variables
require('dotenv').config();

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
	uri: process.env.REACT_APP_GRAPHQL_ENDPOINT,
	cache: new InMemoryCache()
});

// Styletron for baseui
const engine = new Styletron();

ReactDOM.render(
	// Apollo for GraphQL
	<ApolloProvider client={client}>
		<StyletronProvider value={engine}>
			<BaseProvider theme={LightTheme}>
				<App />
			</BaseProvider>
		</StyletronProvider>
	</ApolloProvider>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
