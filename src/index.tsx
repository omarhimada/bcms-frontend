import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BaseProvider, createTheme } from 'baseui';
import { Client as Styletron } from 'styletron-engine-atomic';
import { Provider as StyletronProvider } from 'styletron-react';
import * as serviceWorker from './serviceWorker';

// Roboto font
import 'typeface-roboto';

// Apollo for GraphQL
import {
	ApolloClient,
	ApolloProvider,
	InMemoryCache,
	NormalizedCacheObject
} from '@apollo/client';

// dotenv to load environment variables
require('dotenv').config();

// ApolloClient
const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
	uri: process.env.REACT_APP_GRAPHQL_ENDPOINT,
	cache: new InMemoryCache()
});

// Styletron for baseui
const engine = new Styletron();

// Override baseui defaults
const primitives = {
	primaryFontFamily: 'Roboto'
};

// Custom baseui theme
const _baseWebTheme = createTheme(primitives);

ReactDOM.render(
	// Apollo for GraphQL
	<ApolloProvider client={client}>
		<StyletronProvider value={engine}>
			<BaseProvider theme={_baseWebTheme}>
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
