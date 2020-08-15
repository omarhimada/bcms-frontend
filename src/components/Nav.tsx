import * as React from 'react';
import { Tab, StatefulTabs } from 'baseui/tabs-motion';
import { gql, useQuery } from '@apollo/client';
import { styled } from 'baseui';
import Page from './Page'
import Loading from './Loading';

// Get page titles and IDs for navigation
const GET_PAGES_NAV = gql`
	query PagesNav {
		pages {
			title
			id
		}
	}
`;

const Centered = styled('div', {
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	height: '100%'
});
  
export default () => {
	const { loading, error, data } = useQuery(GET_PAGES_NAV);

	if (loading) return (<Loading />);
	if (error) return (<span>Error! {error.message}</span>);

	return (
		<StatefulTabs
			activateOnFocus>
			{data.pages.map(page => (
				<Tab key={page.id} title={page.title}>
					<Centered>
						<Page pageId={page.id} />
					</Centered>
				</Tab>
			))}
		</StatefulTabs>
	);
};