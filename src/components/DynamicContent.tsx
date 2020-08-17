import * as React from 'react';
import { useQuery } from '@apollo/client';
import { Card, StyledBody } from 'baseui/card';
import { ListItem, ListItemLabel } from 'baseui/list';
import { Accordion, Panel } from "baseui/accordion";
import ReactHtmlParser from 'react-html-parser';
import Loading from './Loading';
import { Heading, HeadingLevel } from 'baseui/heading';
import { List } from 'antd';
import { FrequentlyAskedQuestionCategory, FrequentlyAskedQuestion } from './types/FAQ';
import { QuestionOutlined } from '@ant-design/icons'
import { Row, Col } from 'antd';
import { GET_SERVICES, GET_TEAM_MEMBERS, GET_FAQS } from './gql/Queries';
import { ServiceCategory } from './types/Service';
import { TeamMember } from './types/TeamMember';

export default (params) => {
	if (params.type === null) return <></>;
	const query = {
		'Services': GET_SERVICES,
		'TeamMembers': GET_TEAM_MEMBERS,
		'FAQs': GET_FAQS
	}[params.type];

	const { loading, error, data } = useQuery(query);

	if (loading) return (<Loading />);
	if (error) return (<span>Error! {error.message}</span>);

	return WrapDynamicContent(data, params.type);
};

export function WrapDynamicContent(data, type) {
	return <HeadingLevel><Row gutter={[16, 16]}>{RenderDynamicContent(data, type)}</Row></HeadingLevel>
}

export function RenderDynamicContent(data, type) {
	switch (type) {
		case 'Services':
			return _renderServices(data.serviceCategories);
		case 'TeamMembers':
			return _renderTeamMembers(data.teamMembers);
		case 'FAQs':
			return _renderFAQs(data.faqCategories);
		default:
			return <></>;
	}
}

export function _renderServices(serviceCategories: ServiceCategory[]) {
	return serviceCategories.map(serviceCategory =>
		<Col xs={{ span: 24 }} lg={{ span: 12 }}>
			<Card
				overrides={{
					Root: {
						style: {
							marginBottom: '1rem'
						}
					}
				}}
				key={serviceCategory.title}
				title={serviceCategory.title}>
				<ul className='services-ul'>
					{serviceCategory.services.map(service =>
						<ListItem
							sublist
							key={`${serviceCategory.title}${service.name}`}
							endEnhancer={() => (
								<ListItemLabel>{service.price}&nbsp;{service.per}</ListItemLabel>
							)}>
							<ListItemLabel sublist>{service.name}</ListItemLabel>
						</ListItem>
					)}
				</ul>
			</Card>
		</Col>
	);
}

export function _renderTeamMembers(teamMembers: TeamMember[]) {
	return teamMembers.map(teamMember =>
		<Col xs={{ span: 24 }} lg={{ span: 8 }}>
			<Card
				overrides={{
					Root: {
						style: {
							marginBottom: '1rem',
							maxWidth: `${teamMember.profileImage.width}px`
						}
					}
				}}
				key={teamMember.name}
				headerImage={teamMember.profileImage.url}
				title={teamMember.name}>
				<StyledBody>
					{teamMember.description}
				</StyledBody>
			</Card>
		</Col>
	);
}

export function _renderFAQs(faqCategories: FrequentlyAskedQuestionCategory[]) {
	return <Accordion renderAll>{_renderFAQCategories(faqCategories)}</Accordion>
}

export function _renderFAQCategories(faqCategories: FrequentlyAskedQuestionCategory[]) {
	return faqCategories.map(faqCategory =>
		<Panel 
			key={`panel-${faqCategory.title}`} 
			title={faqCategory.title}>

			<List
				size="large"
				header={<Heading styleLevel={6}>{faqCategory.title}</Heading>}
				bordered
				dataSource={faqCategory.questions}
				renderItem={(faq: FrequentlyAskedQuestion) => 
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