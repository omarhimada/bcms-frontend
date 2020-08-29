import * as React from "react";
import { HeadingLevel } from "baseui/heading";
import { Col, Row } from "antd";
import Gallery from "./Gallery";
import Services from "./Services";
import FAQs from "./FAQs";
import TeamMembers from "./TeamMembers";
import { InstagramFeed } from "./InstagramFeed";

export default (params) => {
  if (params.type === null || params.type === "None") return <></>;

  return (
    <Row gutter={[16, 16]} style={{ margin: 0 }}>
      <Col xs={{ span: 24 }} style={{ padding: 0 }}>
        <HeadingLevel>
          <Row
            className="dynamic-content-wrap"
            style={{ padding: 0, margin: 0 }}
            gutter={[16, 16]}
          >
            {
              {
                FAQs: <FAQs />,
                Gallery: <Gallery />,
                InstagramFeed: (
                  <InstagramFeed
                    instagramLink={params.configuration.instagramLink}
                  />
                ),
                Services: <Services />,
                TeamMembers: <TeamMembers />,
              }[params.type]
            }
          </Row>
        </HeadingLevel>
      </Col>
    </Row>
  );
};
