import * as React from 'react';
import { useQuery } from '@apollo/client';
import ReactHtmlParser from 'react-html-parser';
import Loading from './Loading';
import { Block } from 'baseui/block';
import { Heading, HeadingLevel } from 'baseui/heading';
import { Layout, Row, Col, Carousel, Divider, Typography } from 'antd';
import { GET_PAGE } from './gql/Page';
import DynamicContent from './dynamic_content/DynamicContent';

const { Content } = Layout;

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
			<HeadingLevel>
				<Block maxWidth={'1376px'} width={'100%'}>
					<Layout className="layout">
						{data.page.heading !== null && !data.page.carouselImages.length ? 
							/* Hero/heading text of the page with no carousel (optional) */
							<Heading>{data.page.heading}</Heading>
						: ''}
						<Content>
							<div className="site-layout-content">
								<Row gutter={[16, 16]}>
									<Col xs={{ span: 24 }} style={{ paddingTop: 0 }}>
										{/* Carousel images (optional) */}
										{data.page.carouselImages !== null && data.page.carouselImages.length ?
											<React.Fragment> 
												<Carousel effect='fade' autoplay autoplaySpeed={5000}>
													{data.page.carouselImages.map(carouselImage => 
														<div key={`carousel-${carouselImage.url}`}>
															<img src={carouselImage.url} />

															{/* Carousel with hero/heading text inside */}
															{/* data.page.heading !== null ?
																<Heading>{data.page.heading}</Heading>
															: '' */}
														</div>
													)}
												</Carousel>
												<Divider />
											</React.Fragment>
										: ''}
									</Col>
									<Col xs={{ span: 24 }}>
										<Typography>
											{/* Page content */}
											{ReactHtmlParser(data.page.content.html)}
										</Typography>
									</Col>
									<Col xs={{ span: 24 }}>
										{/* Dynamic content (e.g.: services, FAQ, etc.) */}
										<DynamicContent type={data.page.dynamicContent} />
									</Col>
								</Row>
							</div>
						</Content>
						{/* <Footer>Footer</Footer> */}
					</Layout>
				</Block>
			</HeadingLevel>
		</React.Fragment>
	);
};