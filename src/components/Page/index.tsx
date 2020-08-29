import * as React from "react";
import { useQuery } from "@apollo/client";
import ReactHtmlParser from "react-html-parser";
import { Button as BaseButton, SIZE } from "baseui/button";
import { ArrowRight } from "baseui/icon";
import { Carousel, Col, Divider, Layout, Row, Typography } from "antd";
import Loading from "../Loading";
import { GET_PAGE } from "./queries";
import DynamicContent from "../DynamicContent";
import { ContentPage } from "./types";
import { SiteContext, Configuration, Color } from "../Root/types";
import { Block } from "baseui/block";

/* This component renders the header and content of the layout */
const { Content } = Layout;
const { Title } = Typography;

export default (params: any) => {
  const { loading, error, data } = useQuery(GET_PAGE, {
    variables: {
      pageId: params.pageId,
    },
  });

  if (loading) return <Loading />;
  if (error) {
    return (
      <span>
        Error!
        {error.message}
      </span>
    );
  }
  return (
    <SiteContext.Consumer>
      {(configuration: Configuration | undefined) => (
        <Content id={`page-${data.page.id}`}>
          {_renderHeading(data.page, configuration?.primaryColor)}
          <Typography>
            <div className="site-layout-content">
              {_renderCarousel(data.page)}
              {_renderPageContent(data.page)}
              {/* Dynamic content (e.g.: services, FAQ, etc.) */}
              <DynamicContent type={data.page.dynamicContent} configuration={configuration} />
            </div>
          </Typography>
        </Content>
      )}
    </SiteContext.Consumer>
  );
};

/* Render the hero/heading text if no carousel data was setup for this page (optional) */
export function _renderHeading(page: ContentPage, primaryColor: Color | undefined) {
  return page.heading !== null && !page.carouselImages.length ? (
    /* If headerActions was included use the value to
     * generate a button group next to the heading */
    page.headerActions !== null && page.carouselCtaLink == null ? (
      <Row>
        <Block $style={{ float: "left", flex: "auto" }}>
          <Title level={1}>{page.heading}</Title>
        </Block>
        <Block $style={{ float: "right" }}>
          {/* Render a button for each header action */}
          <div className="header-action-btns-wrap">
            {page.headerActions.split("\n").map((headerAction) => {
              let sp = headerAction.split(","),
                text = sp[0],
                url = sp[1];

              return (
                <BaseButton
                  key={`header-action-${url}`}
                  overrides={{
                    Root: {
                      style: {
                        backgroundColor: primaryColor?.hex
                      },
                    }
                  }}
                  shape="square"
                  size="compact"
                  $as="a"
                  href={url}
                  target="_blank">
                  {text}
                </BaseButton>
              );
            })}
          </div>
        </Block>
      </Row>
    ) : (
      /* Otherwise return only the heading */
      <Title level={1}>{page.heading}</Title>
    )
  ) : (
    ""
  );
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
    <Row gutter={[16, 16]} style={{ margin: "0" }}>
      <Col
        xs={{ span: 24 }}
        style={{
          padding: "0",
          marginTop: "-16px",
          minHeight: `${maximumHeightOfCarouselImage + 48}px`,
        }}
      >
        <Carousel
          infinite
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
              {page.heading !== null ? (
                <Title className="page-carousel-heading" level={1}>
                  {page.heading}
                </Title>
              ) : (
                ""
              )}
              {/* CTA button on the carousel */}
              {page.carouselCtaText !== null &&
              page.carouselCtaLink !== null ? (
                <BaseButton
                  $as="a"
                  href={page.carouselCtaLink}
                  target="_blank"
                  startEnhancer={() => <ArrowRight size={24} />}
                  size={SIZE.large}
                >
                  {page.carouselCtaText}
                </BaseButton>
              ) : (
                ""
              )}
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
  if (page.content === null) return "";

  return (
    <Row gutter={[16, 16]} style={{ margin: "0", padding: "8px" }}>
      <Col xs={{ span: 24 }} style={{ padding: "0" }}>
        {/* Page content */}
        {ReactHtmlParser(page.content.html)}
      </Col>
    </Row>
  );
}
