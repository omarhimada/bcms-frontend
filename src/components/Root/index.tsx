import * as React from 'react';
import { useQuery } from '@apollo/client';
import { styled } from 'baseui';
import { BackTop, Button, Layout } from 'antd';
import { UpOutlined } from '@ant-design/icons';
import { GET_INIT } from './queries';
import Nav from '../Nav';
import Loading from '../Loading';
import Footing from '../Footing';
import { Configuration } from './types';
import { ContentPage } from '../Page/types';

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
	const pages: ContentPage[] = data.pages;

	return (
		<>
			<Centered>
				{/* Nav component for the header and content */}
				<Nav 
					pages={pages} 
					configuration={configuration} />
			</Centered>
			<Footer>
				{/* Footing component for the footer */}
				<Footing 
					configuration={configuration} />
			</Footer>
			<BackTop>
				<Button size='large'>
					<UpOutlined />
					<BackTopInner>
						TOP
					</BackTopInner>
				</Button>
			</BackTop>
		</>
	);
};

/* Get the site's configuration for the logo HTML and parse it */
export function _renderLogo(logoHtml: string) {
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