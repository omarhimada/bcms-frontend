import * as React from 'react';
import { Helmet } from "react-helmet";
import { useQuery } from '@apollo/client';
import { styled } from 'baseui';
import { BaseProvider, createTheme } from 'baseui';
import { Client as Styletron } from 'styletron-engine-atomic';
import { Provider as StyletronProvider } from 'styletron-react';
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

/* Styletron for baseui */
const engine = new Styletron();

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

	// Override baseui defaults
	const primitives = {
		primaryFontFamily: 'Roboto',
		primaryColor: configuration.primaryColor.hex
	};
	const overrides = {
		colors: {
			primaryA: primitives.primaryColor
		}
	};

	// Custom baseui theme
	const _baseWebTheme = createTheme(primitives, overrides);

	// Generate CSS for any additional fonts for injection
	const additionalFontCss = 
		configuration.additionalFonts !== null && configuration.additionalFonts!.length ?
			_injectAdditionalFonts(configuration.additionalFonts) 
		: '';

	return (
		<StyletronProvider value={engine}>
			<BaseProvider theme={_baseWebTheme}>
				{/* Helmet for site-specific meta */}
				<Helmet>
					<link rel="icon" id="favicon" href={configuration.favicon.url} />
					<link rel="apple-touch-icon" href={configuration.appleTouchIcon.url} />
					
					<meta name="theme-color" content={configuration.primaryColor.hex} />
					<meta name="description" content={configuration.siteDescription} />
					<meta name="keywords" content={configuration.siteKeywords} />
					
					{/* Inline the manifest.json */}
					<link rel="manifest" href={`data:application/manifest+json,${configuration.manifestJson.toString()}`} />

					<title>{configuration.siteName}</title>

					<style type="text/css">
						{/* Inject additional font CSS */}
						{additionalFontCss}
					</style>
				</Helmet>
				<Centered id='centered-root'>
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
			</BaseProvider>
		</StyletronProvider>
	);
};

/* Use the site's configuration to inject any additional fonts (optional) */
export function _injectAdditionalFonts(additionalFonts) {
	// Map the partial file names to [file extension, url] tuples to build the correct CSS
	let _fileMap: { [name: string]: [string, string][]; } = {};

	// e.g. fileNames: ["Couture-Bold.woff2", "Couture-Bold.woff", "NEOTERIC-Bold.woff2"]
	for (let font of additionalFonts) {
		// Split the file name
		const splitName = font.fileName.split('.');
		
		// e.g.: 'NEOTERIC-Bold.woff2' -> ['NEOTERIC-Bold', 'woff2']
		const name = splitName[0];
		const extension = splitName[1];
		
		if (_fileMap[name] === undefined) _fileMap[name] = [];
		_fileMap[name].push([extension, font.url]);
	}
	// fileNamesMap: { "Couture-Bold": [ "woff2", "woff" ], "NEOTERIC-Bold": [ "woff2" ] } 

	// i.e.: mapKeys are the file names minus the extensions
	const mapKeys = Object.keys(_fileMap);

	/* Sort the font names so the woff2 is first, then woff, then ttf last
	 * (order of descending file sizes) */
	for (let key of mapKeys)
	{
		_fileMap[key].sort((extensionUrlTuple1, extensionUrlTuple2) => {
			const ext1 = extensionUrlTuple1[0];
			const ext2 = extensionUrlTuple2[0];
			if (ext1 > ext2) return -1;
			else if (ext2 < ext1) return 1;
			else return 0;
		});
	}

	return mapKeys.map(fontName => 
		/* Create a @font-face for each additional font retrieved */
		`@font-face {` +
			`\r\n\tfont-family: '${fontName}';` +
			`\r\n\tsrc: ${
				_fileMap[fontName]
					.map(extensionUrlTuple => `\r\n\t\turl('${extensionUrlTuple[1]}') format('${extensionUrlTuple[0]}')`)
					.join(',')};` +
		`\r\n}`
		// Join to make react-helmet play nice
	).join('\r\n');
}

/* Use the site's configuration for the logo HTML and parse it */
export function _renderLogo(logoHtml: string) {
	// If the logo HTML is an <svg> use dangerouslySetInnerHtml to avoid React parsing issues
	return (
		<div
			className='tabs-logo-wrap'
			dangerouslySetInnerHTML={{ __html: logoHtml }}
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