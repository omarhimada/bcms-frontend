import * as React from 'react';
import { useQuery } from '@apollo/client';
import { styled } from 'baseui';
import { Grid, Cell, BEHAVIOR } from 'baseui/layout-grid';
import { Tab, StatefulTabs, FILL, StyledTabList } from 'baseui/tabs-motion';
import { BackTop, Button } from 'antd';
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
			{data.pages.map((page, index) => (
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
	return (
		<div 
			className='tabs-logo-wrap' 
			dangerouslySetInnerHTML={{__html: data.configurations[0].logoHtml}} 
			onClick={() => {
				// If the user clicks the logo navigate to the first tab (assume 'Home')
				let homeTab = document.querySelector<HTMLButtonElement>('button[data-baseweb=tab]:first-child');
				homeTab!.click();
				homeTab!.focus();
			}}
		/>
	);
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

/* Logo cell overrides */
const LogoCellOverrides = {
	Cell: {
		style: {
			paddingLeft: '0 !important'
		}
	}
};

/* Tabs cell overrides */
const TabsCellOverrides = {
	Cell: {
		style: {
			paddingRight: '0 !important'
		}
	}
};

/* Override the default baseui tabs to include the logo and tabsRef */
const TabsOverrides = {
	TabList: {
		component: function TabsListOverride(props: any) {
			return (
				<Centered>
					<Boundary>
						<Grid behavior={BEHAVIOR.fluid}>
							<Cell span={[4,3,4]} overrides={LogoCellOverrides}>
								{_renderLogo()}
							</Cell>
							<Cell span={[4,5,8]} overrides={TabsCellOverrides}>
								<StyledTabList {...props} />
							</Cell>
						</Grid>
					</Boundary>
				</Centered>
			);
		},
	}
};