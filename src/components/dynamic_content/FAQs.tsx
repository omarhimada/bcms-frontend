import * as React from 'react';
import { useQuery } from '@apollo/client';
import ReactHtmlParser from 'react-html-parser';
import { List, Typography } from 'antd';
import { QuestionOutlined } from '@ant-design/icons'
import Loading from '../Loading';
import { GET_FAQS } from '../gql/dynamic_content/FAQ';
import { FAQCategory, FAQ } from '../types/dynamic_content/FAQ';
import { Accordion, Panel } from 'baseui/accordion';

const { Title } = Typography;

export default () => {
	const { loading, error, data } = useQuery(GET_FAQS);

	if (loading) return (<Loading />);
	if (error) return (<span>Error! {error.message}</span>);

	return <React.Fragment>{_renderFAQs(data.faqCategories)}</React.Fragment>;
};

/* Render an Accordion where each Panel is an FAQ category */
export function _renderFAQs(faqCategories: FAQCategory[]) {
	return <Accordion renderAll>{_renderFAQCategories(faqCategories)}</Accordion>
}

/* Render a Panel which holds a List of questions */
export function _renderFAQCategories(faqCategories: FAQCategory[]) {
	return faqCategories.map(faqCategory =>
		<Panel 
			key={`panel-${faqCategory.title}`}
			title={faqCategory.title}>
			<List
				size="large"
				header={
					<Title level={3}>
						{faqCategory.title}
					</Title>}
				bordered
				style={{
					backgroundColor: '#fff'
				}}
				dataSource={faqCategory.questions}
				renderItem={(faq: FAQ) => 
					<List.Item>
						<List.Item.Meta
							avatar={<QuestionOutlined />}
							title={faq.question}
							description={ReactHtmlParser(faq.answer.html)}
						/>
					</List.Item>}
				/>
		</Panel>
	);
}