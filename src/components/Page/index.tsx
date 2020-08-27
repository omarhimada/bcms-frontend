import * as React from 'react';
import { useQuery } from '@apollo/client';
import ReactHtmlParser from 'react-html-parser';
import { Button, SIZE } from 'baseui/button';
import { ArrowRight } from 'baseui/icon';
import {
	Carousel, Col, Divider, Layout, Row, Typography,
} from 'antd';
import Loading from '../Loading';
import { GET_PAGE } from './queries';
import DynamicContent from '../DynamicContent';
import { ContentPage } from './types';

/* This component renders the header and content of the layout */
const { Content } = Layout;
const { Title } = Typography;

export default (params: any) => {
	const { loading, error, data } = useQuery(GET_PAGE, {
		variables: {
			pageId: params.pageId,
		},
	});

	if (loading) return (<Loading />);
	if (error) {
		return (
			<span>
				Error!
				{error.message}
			</span>
		);
	}

	return (
		<Content id={`page-${data.page.id}`}>
			<Typography>
				{_renderHeading(data.page)}
				<div className="site-layout-content">
					{_renderCarousel(data.page)}
					{_renderPageContent(data.page)}
					{/* Dynamic content (e.g.: services, FAQ, etc.) */}
					<DynamicContent type={data.page.dynamicContent} />
				</div>
			</Typography>
		</Content>
	);
};

/* Render the hero/heading text if no carousel data was setup for this page (optional) */
export function _renderHeading(page: ContentPage) {
	return page.heading !== null && !page.carouselImages.length
		? (
			<Title level={1}>
				{page.heading}
			</Title>
		)
		: '';
}

/* Render the carousel with the hero/heading and CTA (optional) */
export function _renderCarousel(page: ContentPage) {
	if (page.carouselImages === null || !page.carouselImages.length) return '';

	/* Get the maximum height of the carousel images to set as the minimum height of the column
	   * (this is prevents flickering when fading baseui tab panels) */
	const maximumHeightOfCarouselImage =
		Math.max.apply(Math,
			page.carouselImages.map((o) => o.height));

	return (
		<Row gutter={[16, 16]} style={{ margin: '0' }}>
			<Col
				xs={{ span: 24 }}
				style={{
					padding: '0',
					marginTop: '-16px',
					minHeight: `${maximumHeightOfCarouselImage + 48}px`,
				}}
			>
				<Carousel
					effect="fade"
					autoplay
					autoplaySpeed={2250}
					slidesToScroll={1}
					adaptiveHeight
				>
					{page.carouselImages.map((carouselImage) => (
						<div
							className="page-carousel-item"
							key={`carousel-${carouselImage.url}`}
						>
							<img alt={carouselImage.id} src={carouselImage.url} />
							{/* Carousel with hero/heading text inside */}
							{page.heading !== null
								? (
									<Title
										className="page-carousel-heading"
										level={1}
									>{page.heading}
									</Title>
								)
								: ''}
							{/* CTA button on the carousel */}
							{page.carouselCtaText !== null && page.carouselCtaLink !== null
								? (
									<Button
										onClick={() => window.open(page.carouselCtaLink)}
										startEnhancer={() => <ArrowRight size={24} />}
										size={SIZE.large}
									>
										{page.carouselCtaText}
									</Button>
								)
								: ''}
						</div>
					))}
				</Carousel>
				<Divider />
			</Col>
		</Row>
	);
}

/* Render the main WYSIWYG content of the page */
export function _renderPageContent(page: ContentPage) {
	if (page.content === null) return '';

	return (
		<Row gutter={[16, 16]} style={{ margin: '0', padding: '8px' }}>
			<Col xs={{ span: 24 }} style={{ padding: '0' }}>
				{/* Page content */}
				{ReactHtmlParser(page.content.html)}
			</Col>
		</Row>
	);
}
