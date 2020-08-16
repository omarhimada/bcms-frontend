import * as React from 'react';
import { gql, useQuery } from '@apollo/client';
import ReactHtmlParser from 'react-html-parser';
import Loading from './Loading';
import DynamicContent from './DynamicContent';
import { Grid, Cell, BEHAVIOR } from 'baseui/layout-grid';
import { Card } from 'baseui/card';
import { Heading, HeadingLevel } from 'baseui/heading';
import { Block } from 'baseui/block';

// Get page content using the ID provided
const GET_PAGE = gql`
	query Page($pageId: ID!) {
		page(where: {id: $pageId}) {
			id,
			heading,
			content {
				html
			},
			dynamicContent,
			image {
				url
			}
		}
	}
`;

export default (params) => {
	const { loading, error, data } =
		useQuery(GET_PAGE, {
			variables: {
				pageId: params.pageId
			}
		});

	if (loading) return (<Loading />);
	if (error) return (<span>Error! {error.message}</span>);

	return (
		<React.Fragment>
			<Block maxWidth={'1440px'}>
				<Grid behavior={BEHAVIOR.fluid}>
					{/* Hero/heading text of the page (optional) */}
					{data.page.heading !== null
						? <Cell span={12}>
							<HeadingLevel>
								<Heading>
									{data.page.heading}
								</Heading>
							</HeadingLevel>
							</Cell>
						: <></>}
					{/* Hero/header image of page (optional) */}
					{data.page.image !== null
						? <Cell span={12}>
							<Card
								overrides={{ 
									Root: { 
										style: { 
											width: '100%', border: 0 
										} 
									},
									HeaderImage: {
										style: {
											width: '100%'
										}
									}
								}}
								headerImage={data.page.image.url}>
								{/* <StyledBody>
									Proin ut dui sed metus pharetra hend rerit vel non mi. Nulla
									ornare faucibus ex, non facilisis nisl.
									</StyledBody> */}
								{/* <StyledAction>
									<Button overrides={{BaseButton: {style: {width: '100%'}}}}>
										Button Label
									</Button>
									</StyledAction> */}
							</Card>
						</Cell>
						: <></>}
					<Cell span={12}>
						{/* WYSIWYG body/content of page */}
						{ReactHtmlParser(data.page.content.html)}
					</Cell>
					<Cell span={12}>
						{/* Dynamic content (e.g.: services, FAQ, etc.) */}
						<DynamicContent type={data.page.dynamicContent} />
					</Cell>
				</Grid>
			</Block>
		</React.Fragment>
	);
};