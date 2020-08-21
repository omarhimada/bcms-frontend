import * as React from 'react';
import { useQuery } from '@apollo/client';
import ReactHtmlParser from 'react-html-parser';
import Loading from './Loading';
import { Block } from 'baseui/block';
import { Layout, Row, Col, Carousel, Divider, Typography } from 'antd';
import { GET_PAGE } from './gql/Page';
import DynamicContent from './dynamic_content/DynamicContent';

const { Content } = Layout;
const { Title } = Typography;

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
			<Block maxWidth={'1376px'} width={'100%'}>
				<Typography>
					<Layout className="layout">
						{data.page.heading !== null && !data.page.carouselImages.length ? 
							/* Hero/heading text of the page with no carousel (optional) */
							<Title level={1}>{data.page.heading}</Title>
						: ''}
						<Content>
							<div className="site-layout-content">
								<Row gutter={[16, 16]} style={{ margin: '-16px -16px 16px' }}>
									<Col xs={{ span: 24 }} style={{ padding: '0px 16px 16px' }}>
										{/* Carousel images (optional) */}
										{data.page.carouselImages !== null && data.page.carouselImages.length ?
											<React.Fragment> 
												<Carousel 
													effect='fade' 
													autoplay 
													autoplaySpeed={2250}
													slidesToScroll={1}
													adaptiveHeight={true}>
													{data.page.carouselImages.map(carouselImage => 
														<div 
															className='page-carousel-item'
															key={`carousel-${carouselImage.url}`}>
															{/* <img alt={carouselImage.url} src={carouselImage.url} /> */}
															{/* <div style={{
																background: `linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5))`
															}}> */}
																<img alt={carouselImage.url} src={carouselImage.url} />
																{/* Carousel with hero/heading text inside */}
																{data.page.heading !== null ?
																	<Title 
																		className='page-carousel-heading' 
																		level={1}>{data.page.heading}
																	</Title>
																: ''}
															{/* </div> */}
														</div>
													)}
												</Carousel>
												<Divider />
											</React.Fragment>
										: ''}
									</Col>
									<Col xs={{ span: 24 }}>
										
											{/* Page content */}
											{ReactHtmlParser(data.page.content.html)}
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
				</Typography>
			</Block>
		</React.Fragment>
	);
};