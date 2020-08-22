import * as React from 'react';
import { useQuery } from '@apollo/client';
import { styled } from 'baseui';
import { Tab, StatefulTabs, FILL, StyledTabList } from 'baseui/tabs-motion';
import { Row, Col, BackTop, Button } from 'antd';
import { UpOutlined } from '@ant-design/icons';
import { GET_PAGES_NAV } from './gql/Page';
import { GET_CONFIGURATION } from './gql/Configuration';
import Page from './Page'
import Loading from './Loading';

export default () => {
	const { loading, error, data } = useQuery(GET_PAGES_NAV);

	if (loading) return (<Centered><Loading /></Centered>);
	if (error) return (<span>Error! {error.message}</span>);

	return (
		<StatefulTabs
			renderAll
			fill={FILL.fixed}
			overrides={TabsOverrides}
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

/* Get the site's configuration for the logo HTML and parse it */
export function _renderLogo() {
	const { loading, error, data } = useQuery(GET_CONFIGURATION);

	if (loading) return (<></>);
	if (error) return (<span>Error! {error.message}</span>);

	// If the logo HTML is an <svg> use dangerouslySetInnerHtml to avoid React parsing issues
	return <span className='tabs-logo-wrap' dangerouslySetInnerHTML={{__html: data.configurations[0].logoHtml}} />;
}

/* Centered <div> */
const Centered = styled('div', {
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	height: '100%'
});

/* Boundary and centering */
const Boundary = styled('div', {
	maxWidth: '1376px', 
	width: '100%', 
	justifyContent: 'center',
    marginLeft: '-16px',
    marginRight: '-16px'
});

/* The 'TOP' button at the bottom of each page */
const BackTopInner = styled('span', {
	textAlign: 'center',
	fontSize: 14,
	fontWeight: 'bold'
});
  
/* Override the default baseui tabs to include the logo */
const TabsOverrides = {
	TabList: {
	  component: function TabsListOverride(props: any) {
		return (
			<Centered>
				<Boundary>
					<Row>
						<Col span={8}>
							{_renderLogo()}
						</Col>
						<Col span={16}>
							<StyledTabList {...props} />
						</Col>
					</Row>
				</Boundary>
			</Centered>
		);
	  },
	},
};