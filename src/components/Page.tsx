import * as React from 'react';
import { useQuery } from '@apollo/client';
import ReactHtmlParser from 'react-html-parser';
import Loading from './Loading';
import { Button, SIZE } from 'baseui/button';
import { ArrowRight } from 'baseui/icon';
import { Layout, Row, Col, Carousel, Divider, Typography } from 'antd';
import { GET_PAGE } from './gql/Page';
import DynamicContent from './dynamic_content/DynamicContent';

/* This component renders the header and content of the layout */
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
		<>
			<Content>
				<Typography>
					{_renderHeading(data.page)}
					<div className="site-layout-content">
						<Row gutter={[16, 16]} style={{ margin: '0' }}>
							{_renderCarousel(data.page)}
						</Row>
						<Row gutter={[16, 16]} style={{ margin: '0', padding: '8px' }}>
							{_renderPageContent(data.page)}
						</Row>
						<Row gutter={[16, 16]} style={{ margin: '0' }}>
							{/* Dynamic content (e.g.: services, FAQ, etc.) */}
							<DynamicContent type={data.page.dynamicContent} />
						</Row>
					</div>
				</Typography>
			</Content>
		</>
		
	);
};

/* Render the hero/heading text if no carousel data was setup for this page (optional) */
export function _renderHeading(page) {
	return page.heading !== null && !page.carouselImages.length ? 
		<Title level={1}>
			{page.heading}
		</Title>
	: '';
}

/* Render the carousel with the hero/heading and CTA (optional) */
export function _renderCarousel(page) {
	return page.carouselImages !== null && page.carouselImages.length ?
		<Col xs={{ span: 24 }} style={{ padding: '0', marginTop: '-16px' }}>
			<Carousel 
				effect='fade' 
				autoplay 
				autoplaySpeed={2250}
				slidesToScroll={1}
				adaptiveHeight={true}>
				{page.carouselImages.map(carouselImage => 
					<div 
						className='page-carousel-item'
						key={`carousel-${carouselImage.url}`}>
							<img alt={carouselImage.id} src={carouselImage.url} />
							{/* Carousel with hero/heading text inside */}
							{page.heading !== null ?
								<Title 
									className='page-carousel-heading' 
									level={1}>{page.heading}
								</Title>
							: ''}
							{/* CTA button on the carousel */}
							{page.carouselCtaText !== null && page.carouselCtaLink !== null ?
								<Button
									onClick={() => window.open(page.carouselCtaLink)}
									startEnhancer={() => <ArrowRight size={24} />}
									size={SIZE.large}>
									{page.carouselCtaText}
								</Button>
							: ''}
					</div>
				)}
			</Carousel>
			<Divider />
		</Col>
	: '';
}

/* Render the main WYSIWYG content of the page */
export function _renderPageContent(page) {
	return (
		<Col xs={{ span: 24 }} style={{ padding: '0' }}>
			{/* Page content */}
			{ReactHtmlParser(page.content.html)}
		</Col>
	);
}