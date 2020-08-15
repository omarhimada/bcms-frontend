import * as React from 'react';
import { gql, useQuery } from '@apollo/client';
import ReactHtmlParser from 'react-html-parser';
import Loading from './Loading';
import { Block } from 'baseui/block';
import DynamicContent from './DynamicContent';
import { Grid, Cell, BEHAVIOR } from 'baseui/layout-grid';

// Get page content using the ID provided
const GET_PAGE = gql`
	query Page($pageId: ID!) {
		page(where: {id: $pageId}) {
			id
			content {
				html
			},
			dynamicContent
		}
	}
`;  
export default (params) => {
	console.debug("Page.tsx", params);
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
			<Grid behavior={BEHAVIOR.fluid}>
				<Cell span={12}>
					<Block>
						{ReactHtmlParser(data.page.content.html)}
					</Block>
				</Cell>
				<Cell span={12}>
				<Block>
						<DynamicContent type={data.page.dynamicContent} />
					</Block>
				</Cell>
			</Grid>
		</React.Fragment>
	);
};