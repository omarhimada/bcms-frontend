import * as React from "react";
import { useQuery } from "@apollo/client";
import ReactHtmlParser from "react-html-parser";
import { Card, List, Typography, Divider } from "antd";
import { QuestionOutlined } from "@ant-design/icons";
import { Accordion, Panel } from "baseui/accordion";
import Loading from "../../Loading";
import { GET_FAQS } from "./queries";
import { FAQ, FAQCategory } from "./types";

const { Title } = Typography;

export default () => {
  const { loading, error, data } = useQuery(GET_FAQS);

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
    <>
      <Divider />
      <Card 
        style={{ 
          width: "100%", 
        }}>
        {_renderFAQs(data.faqCategories)}
      </Card>
      <Divider />
    </>
  );
};

/* Render an Accordion where each Panel is an FAQ category */
export function _renderFAQs(faqCategories: FAQCategory[]) {
  return <Accordion renderAll>{_renderFAQCategories(faqCategories)}</Accordion>;
}

/* Render a Panel which holds a List of questions */
export function _renderFAQCategories(faqCategories: FAQCategory[]) {
  return faqCategories.map((faqCategory) => (
    <Panel key={`panel-${faqCategory.title}`} title={faqCategory.title}>
      <List
        size="large"
        header={<Title level={3}>{faqCategory.title}</Title>}
        bordered
        style={{
          backgroundColor: "#fff",
        }}
        dataSource={faqCategory.questions}
        renderItem={(faq: FAQ) => (
          <List.Item>
            <List.Item.Meta
              avatar={<QuestionOutlined />}
              title={faq.question}
              description={ReactHtmlParser(faq.answer.html)}
            />
          </List.Item>
        )}
      />
    </Panel>
  ));
}
