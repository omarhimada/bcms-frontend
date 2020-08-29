import * as React from "react";
import { DarkTheme, ThemeProvider } from "baseui";
import { StyledLink } from "baseui/link";
import { Col, Descriptions, Row } from "antd";
import { FacebookOutlined, InstagramOutlined } from "@ant-design/icons";

/* Use the retrieved configuration to render the footer,
 * including social links and contact details */
export default (params: any) => {
  const { configuration } = params;
  return (
    <ThemeProvider theme={DarkTheme}>
      <Row
        style={{ maxWidth: "1376px", margin: "0 auto" }}
        justify="center"
        key="footer-row-0"
      >
        <Col xs={24} sm={24} md={12} lg={6} key="contact-col-1">
          <Descriptions
            title="Contact"
            size="small"
            column={{ xxl: 3, xs: 3 }}
            key="descriptions-0"
          >
            <Descriptions.Item span={3} label="Phone" key="descriptions-0-0">
              <StyledLink
                key="footer-link-0"
                href={`tel:${configuration.contactPhoneNumber}`}
              >
                {configuration.contactPhoneNumber}
              </StyledLink>
            </Descriptions.Item>
            <Descriptions.Item span={3} label="Email" key="descriptions-0-1">
              <StyledLink
                key="footer-link-1"
                href={`mailto:${configuration.contactEmail}`}
              >
                {configuration.contactEmail}
              </StyledLink>
            </Descriptions.Item>
          </Descriptions>
        </Col>
        <Col xs={24} sm={24} md={12} lg={6} key="contact-col-2">
          <Descriptions title="Address" size="small" key="descriptions-1">
            <Descriptions.Item
              key="descriptions-1-0"
              className="physical-address-wrap"
            >
              {configuration.physicalAddress !== null
                ? configuration.physicalAddress
                    .split("\n")!
                    .map((line, i) => <p key={`address-${i}`}>{line}</p>)
                : ""}
            </Descriptions.Item>
          </Descriptions>
        </Col>
        <Col xs={24} sm={24} md={12} lg={6} key="contact-col-3">
          <Descriptions title="Facebook" size="small" key="descriptions-2">
            <Descriptions.Item key="descriptions-2-0">
              <StyledLink href={configuration.facebookLink}>
                <FacebookOutlined
                  style={{
                    fontSize: "2rem",
                    color: "rgba(255,255,255,0.85)",
                  }}
                />
              </StyledLink>
            </Descriptions.Item>
          </Descriptions>
        </Col>
        <Col xs={24} sm={24} md={12} lg={6} key="contact-col-4">
          <Descriptions title="Instagram" size="small" key="descriptions-3">
            <Descriptions.Item key="descriptions-3-0">
              <StyledLink href={configuration.instagramLink}>
                <InstagramOutlined
                  style={{
                    fontSize: "2rem",
                    color: "rgba(255,255,255,0.85)",
                  }}
                />
              </StyledLink>
            </Descriptions.Item>
          </Descriptions>
        </Col>
      </Row>
    </ThemeProvider>
  );
};
