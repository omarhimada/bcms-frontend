import * as React from 'react';
import { useQuery } from '@apollo/client';
import ReactHtmlParser from 'react-html-parser';
import Loading from './Loading';
import DynamicContent from './DynamicContent';
import { Card } from 'baseui/card';
import { Heading, HeadingLevel } from 'baseui/heading';
import { Block } from 'baseui/block';
import { Row, Col } from 'antd';
import { GET_PAGE } from './gql/Queries';

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
				<HeadingLevel>
					<Row gutter={[16, 16]}>
						{/* Hero/heading text of the page (optional) */}
						{data.page.heading !== null
							? <Col xs={{ span: 24 }}>
									<Heading>
										{data.page.heading}
									</Heading>
								</Col>
							: <></>}
						{/* Hero/header image of page (optional) */}
						{data.page.image !== null
							? <Col xs={{ span: 24 }}>
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
							</Col>
							: <></>}
						<Col xs={{ span: 24 }}>
							{/* WYSIWYG body/content of page */}
							{ReactHtmlParser(data.page.content.html)}
						</Col>
						<Col xs={{ span: 24 }}>
							{/* Dynamic content (e.g.: services, FAQ, etc.) */}
							<DynamicContent type={data.page.dynamicContent} />
						</Col>
					</Row>
				</HeadingLevel>
			</Block>
		</React.Fragment>
	);
};