import * as React from "react";
import usePublicFeedService from "./Service";
import Loading from "../../Loading";
import { Carousel, Card } from "antd";
import { ArrowRight, ArrowLeft } from "baseui/icon";
import { SIZE } from "baseui/button";
import { InstagramOutlined } from "@ant-design/icons";

export const InstagramFeed: React.FC<{ instagramLink: string }> = (props) => {
  const service = usePublicFeedService(props.instagramLink);

  /* Get the maximum height of the carousel images to set as the minimum height of the column
   * (this is prevents flickering when fading baseui tab panels) */
  let minimumHeightOfCarouselImage =
    service.status === "loaded" &&
    Math.min.apply(
      Math,
      service.payload.graphql?.user?.edge_owner_to_timeline_media?.edges?.map(
        (o) => o.node?.thumbnail_resources?.[0].config_height ?? 0
      ) ?? []
    );

  if (!minimumHeightOfCarouselImage) minimumHeightOfCarouselImage = 0;

  return (
      <div className="public-instagram-feed">
        {service.status === "loading" && <Loading size={"small"} />}
        {service.status === "loaded" && (
          <Card 
            title={<a className="instagram" href={props.instagramLink} target="_blank" rel="noopener noreferrer">Instagram Feed (Recent)</a>} 
            extra={<a className="instagram" href={props.instagramLink} target="_blank" rel="noopener noreferrer">
              <InstagramOutlined
                style={{
                  fontSize: "2rem"
                }}
              />
            </a>}>
            <Carousel
              style={{
                height: `${minimumHeightOfCarouselImage + 48 + 68}px`,
              }}
              dotPosition="top"
              infinite
              dots
              autoplay
              autoplaySpeed={1150}
              speed={950}
              lazyLoad="ondemand"
              centerMode
              slidesToShow={4}
              slidesToScroll={1}
              nextArrow={<NEXT_ARROW />}
              prevArrow={<PREV_ARROW />}
              arrows
              responsive={[
                {
                  breakpoint: 1280,
                  settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                  },
                },
                {
                  breakpoint: 768,
                  settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                  },
                },
              ]}
            >
            {service.payload.graphql?.user?.edge_owner_to_timeline_media?.edges?.map(
              (media) => {
                return (
                  <div
                    className="page-carousel-item feed-item"
                    key={`carousel-${media.node?.thumbnail_src}`}
                  >
                    <Card style={{ height: "100%" }}>
                      <img
                        style={{ minHeight: "100%", width: "auto" }}
                        key={media.node?.thumbnail_src}
                        alt={media.node?.accessibility_caption}
                        src={media.node?.thumbnail_src}
                      />
                    </Card>
                  </div>
                );
              }
            )}
          </Carousel>
        </Card>
      )}
      {service.status === "error" &&
        // Considering this is likely to break at some point, if it does, just return an empty string
        ""}
    </div>
    
  );
};

function NEXT_ARROW(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    ><ArrowRight size={SIZE.large} /></div>
  );
}

function PREV_ARROW(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    ><ArrowLeft size={SIZE.large} /></div>
  );
}

export default InstagramFeed;
