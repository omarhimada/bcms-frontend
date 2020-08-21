import * as React from 'react';
import { Tab, StatefulTabs, FILL } from 'baseui/tabs-motion';
import { useQuery } from '@apollo/client';
import { styled } from 'baseui';
import Page from './Page'
import Loading from './Loading';
import { GET_PAGES_NAV } from './gql/Page';
import { BackTop, Button } from 'antd';
import { UpOutlined } from '@ant-design/icons';

const Centered = styled('div', {
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	height: '100%'
});

const BackTopInner = styled('span', {
	textAlign: 'center',
	fontSize: 14,
	fontWeight: 'bold'
});
  
export default () => {
	const { loading, error, data } = useQuery(GET_PAGES_NAV);

	if (loading) return (<Centered><Loading /></Centered>);
	if (error) return (<span>Error! {error.message}</span>);

	return (
		<StatefulTabs
			renderAll
			fill={FILL.fixed}
			activateOnFocus>
			{data.pages.map(page => (
				<Tab key={page.id} title={page.title}>
					<Centered>
						<Page pageId={page.id} />
					</Centered>
					<BackTop>
						<Button
							size='large'>
							<UpOutlined />
							<BackTopInner>
								TOP
							</BackTopInner>
						</Button>
					</BackTop>
				</Tab>
			))}
		</StatefulTabs>
	);
};