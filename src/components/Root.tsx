import * as React from 'react';
import { useQuery } from '@apollo/client';
import { styled } from 'baseui';
import { Grid, Cell, BEHAVIOR } from 'baseui/layout-grid';
import { Tab, StatefulTabs, FILL, StyledTabList } from 'baseui/tabs-motion';
import { BackTop, Button, Typography, Layout, Tabs } from 'antd';
import { UpOutlined } from '@ant-design/icons';
import { GET_INIT } from './gql/Initialization';
import Page from './Page'
import Loading from './Loading';
import Footing from './Footing';
import { Configuration } from './types/Configuration';

/* ant.design's Footer */
const { Footer } = Layout;

export default () => {
	// Init: get navigational information and site configuration
	const { loading, error, data } = useQuery(GET_INIT);

	if (loading) return (<Centered><Loading /></Centered>);
	if (error || !data.configurations.length) {
		return <span>Error during initialization. {error!.message}</span>
	}

	// There should only be one configuration, so get the first 1 
	const configuration: Configuration = data.configurations[0];

	return (
		<>
		<Centered>
			<StatefulTabs
				renderAll
				fill={FILL.fixed}
				overrides={{
					Root: {
						style: { 
							backgroundColor: '#fff',
							width: '100%'
						}
					},
					TabList: {
						/* Override the default baseui tabs to include the logo and tabsRef */
						component: function TabsListOverride(props: any) {
							return (
								<Grid overrides={{ Grid: { style: { paddingLeft: '0 !important', paddingRight: '0 !important' }}}}>
									<Cell span={[4,3,3]} overrides={LogoCellOverrides}>
										{/* Render the logo using the logo HTML */}
										{_renderLogo(configuration.logoHtml)}
									</Cell>
									{/* This cell is also overridden */}
									<Cell span={[4,5,9]} overrides={TabsCellOverrides}>
										<StyledTabList {...props} />
									</Cell>
								</Grid>
							);
						}
					}
				}}
				activateOnFocus>
				{/* Render a tab for each page */}
				{data.pages.map(page => (
					<Tab 
						key={page.id} 
						title={page.title}
						overrides={{
							TabPanel: {
								style: {
									paddingLeft: 0,
									paddingRight: 0,
									paddingBottom: 0,
									maxWidth: '1376px', 
									width: '100%', 
									justifyContent: 'center',
									margin: '0 auto'
								}
							}
						}}>
						<Layout className='layout'>
							{/* Page component renders the header and content of the layout */}
							<Page pageId={page.id} />
						</Layout>
						<BackTop>
							<Button size='large'>
								<UpOutlined />
								<BackTopInner>
									TOP
								</BackTopInner>
							</Button>
						</BackTop>
					</Tab>
				))}
			</StatefulTabs>
		</Centered>
		<Footer>
			{/* Footing component for the footer */}
			<Footing configuration={configuration} />
		</Footer>
		</>
	);
};

/* Get the site's configuration for the logo HTML and parse it */
export function _renderLogo(logoHtml) {
	// If the logo HTML is an <svg> use dangerouslySetInnerHtml to avoid React parsing issues
	return (
		<div 
			className='tabs-logo-wrap' 
			dangerouslySetInnerHTML={{__html: logoHtml}} 
			onClick={() => {
				// If the user clicks the logo navigate to the first tab (assume 'Home')
				let homeTab = document.querySelector<HTMLButtonElement>('button[data-baseweb=tab]:first-child');
				homeTab!.click();
				homeTab!.focus();
			}}
		/>
	);
}

/* Horizontally centered <div> */
const Centered = styled('div', {
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	height: '100%',
	width: '100%'
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
			paddingRight: '0 !important'
		}
	}
};

/* Tabs cell overrides */
const TabsCellOverrides = {
	Cell: {
		style: {
			width: '100%'
		}
	}
};