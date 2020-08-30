import * as React from 'react';
import { useQuery } from '@apollo/client';
import ReactHtmlParser from 'react-html-parser';
import Loading from '../Loading';
import { GET_PAGE } from './queries';
import DynamicContent from '../DynamicContent';
import { ContentPage } from './types';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Slider from "react-slick";
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Divider from '@material-ui/core/Divider';

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
		<div id={`page-${data.page.id}`}>
      {_renderHeading(data.page)}
      <div className="site-layout-content">
        {_renderCarousel(data.page)}
        {_renderPageContent(data.page)}
        {/* Dynamic content (e.g.: services, FAQ, etc.) */}
        <DynamicContent type={data.page.dynamicContent} />
      </div>
		</div>
	);
};

/* Render the hero/heading text if no carousel data was setup for this page (optional) */
export function _renderHeading(page: ContentPage) {
	return page.heading !== null && !page.carouselImages.length
		? (
      <Typography variant="h1" gutterBottom>
        {page.heading}
      </Typography>
		)
		: '';
}

/* Render the carousel with the hero/heading and CTA (optional) */
export function _renderCarousel(page: ContentPage) {
  if (page.carouselImages === null || !page.carouselImages.length) return "";

  /* Get the maximum height of the carousel images to set as the minimum height of the column
   * (this is prevents flickering when fading baseui tab panels) */
  const maximumHeightOfCarouselImage = Math.max.apply(
    Math,
    page.carouselImages.map((o) => o.height)
  );

	return (
		<Grid container spacing={0}>
      <Grid item 
        xs={12}
				style={{
					minHeight: `${maximumHeightOfCarouselImage + 48}px`,
				}}
			>
				<Slider
          fade={true}
          arrows={false}
          dots={true}
          infinite={true}
					autoplay
					autoplaySpeed={2250}
          slidesToScroll={1}
          slidesToShow={1}
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
                  <Typography 
                    variant="h1" 
                    gutterBottom
                    className="page-carousel-heading"
									>{page.heading}
									</Typography>
								)
								: ''}
							{/* CTA button on the carousel */}
							{page.carouselCtaText !== null && page.carouselCtaLink !== null
								? (
                  <Button 
                    color="primary" 
                    variant="contained"
                    style={{
                      margin: "auto",
                      position: "absolute",
                      left: "33%",
                      width: "33%",
                      height: "3.3rem",
                      fontSize: "1.4rem",
                      fontWeight: 300,
                      bottom: "7.2rem",
                      backgroundColor: "rgba(0, 0, 0, 1)",
                      filter: "opacity(0.67)",
                    }}
                    onClick={() => { window.open(page.carouselCtaLink) }}
                    href={page.carouselCtaLink}
                    target="_blank"
                    disableElevation>
                    {page.carouselCtaText}
                  </Button>
								)
								: ''}
						</div>
					))}
				</Slider>
				<Divider />
			</Grid>
		</Grid>
	);
}

/* Render the main WYSIWYG content of the page */
export function _renderPageContent(page: ContentPage) {
  if (page.content === null) return "";

	return (
		<Grid container spacing={0}>
			<Grid item xs={12}>
				{/* Page content */}
				{ReactHtmlParser(page.content.html)}
			</Grid>
		</Grid>
	);
}
