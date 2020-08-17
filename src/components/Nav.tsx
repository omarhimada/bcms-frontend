import * as React from 'react';
import { Tab, StatefulTabs } from 'baseui/tabs-motion';
import { useQuery } from '@apollo/client';
import { styled } from 'baseui';
import Page from './Page'
import Loading from './Loading';
import { GET_PAGES_NAV } from './gql/Page';

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
			renderAll
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